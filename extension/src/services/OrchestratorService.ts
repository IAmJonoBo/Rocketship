// OrchestratorService coordinates agent workflows
// See docs/Architectural Documentation.md

import { CancellationToken } from 'vscode';
import { ConfigService } from './ConfigService.js';
import { HybridRetrievalService } from './HybridRetrievalService.js';
import { InferenceService } from './InferenceService.js';
import { MemoryService } from './MemoryService.js';
import { TelemetryService } from './TelemetryService.js';
import { MetaLearningController } from './MetaLearningController.js';
import { PlannerAgent } from '../agents/PlannerAgent.js';
import { CoderAgent } from '../agents/CoderAgent.js';
import { CriticAgent } from '../agents/CriticAgent.js';
import { TesterAgent } from '../agents/TesterAgent.js';

export interface WorkflowDefinition {
  requirementText: string;
  language: string;
  testFramework: 'jest' | 'mocha' | 'pytest';
}

export interface WorkflowResult {
  plan: any;
  code: any;
  critique: any;
  testResults: any;
}

export class OrchestratorService {
  constructor(
    private configService: ConfigService,
    private retrieval: HybridRetrievalService,
    private inference: InferenceService,
    private memory: MemoryService,
    private telemetry: TelemetryService,
    private metaLearning: MetaLearningController,
    private planner: PlannerAgent,
    private coder: CoderAgent,
    private critic: CriticAgent,
    private tester: TesterAgent
  ) {}

  public async runWorkflow(
    def: WorkflowDefinition,
    token: CancellationToken
  ): Promise<WorkflowResult> {
    const startTs = Date.now();
    // 0. Cancellation guard: abort immediately if already cancelled
    if (token.isCancellationRequested) {
      throw new Error('OrchestratorService: Workflow cancelled');
    }
    // 1. Load configuration
    const config = await this.configService.loadConfig();
    this.telemetry.trackEvent('workflow.start', { workflow: 'Plan→Code→Test' });

    // 2. Retrieval: get context snippets
    const contextChunks = await this.retrieval.retrieve(def.requirementText, { token });
    // 2a. Persist retrieval context for long-term memory
    await this.memory.appendMemory({
      type: 'retrievalContext',
      data: contextChunks
    });
    this.telemetry.trackEvent('retrieval.complete', {
      count: contextChunks.length,
      duration: Date.now() - startTs,
    });

    // 3. Planner Agent
    const plan = await this.planner.execute(
      { requirementText: def.requirementText, contextChunks, sessionId: token.isCancellationRequested ? 'cancelled' : 'active' },
      token
    );
    await this.memory.appendMemory({ type: 'plan', data: plan });
    this.telemetry.trackEvent('planner.complete', { taskCount: plan.tasks.length });

    // 4. Coder Agent
    const code = await this.coder.execute(
      { taskId: plan.tasks[0]?.id, codeContext: plan.tasks[0]?.description, language: def.language, contextChunks, sessionId: 'session1' },
      token
    );
    await this.memory.appendMemory({ type: 'code', data: code });
    this.telemetry.trackEvent('coder.complete');

    // 5. Critic Agent
    const critique = await this.critic.execute(
      { code: code.code, tests: [], sessionId: 'session1' },
      token
    );
    await this.memory.appendMemory({ type: 'critique', data: critique });
    this.telemetry.trackEvent('critic.complete', { issues: critique.issues.length });

    // 6. Tester Agent
    const testResults = await this.tester.execute(
      { code: code.code, testFramework: def.testFramework, sessionId: 'session1' },
      token
    );
    await this.memory.appendMemory({ type: 'test', data: testResults });
    this.telemetry.trackEvent('tester.complete', { passed: testResults.testResults.filter(r => r.passed).length });

    // 7. Reflexion / Meta-Learning
    await this.metaLearning.recordFeedback({ plan, code, critique, testResults });
    const reflection = await this.metaLearning.runReflexion({ plan, code, critique, testResults });
    this.telemetry.trackEvent('reflexion.complete', { insights: reflection });

    this.telemetry.trackEvent('workflow.complete', { totalDuration: Date.now() - startTs });
    return { plan, code, critique, testResults };
  }
}