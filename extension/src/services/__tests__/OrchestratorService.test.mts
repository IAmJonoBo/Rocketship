import { describe, it, test, expect, beforeEach, vi } from 'vitest';
import { OrchestratorService } from '../OrchestratorService.js';
import { ConfigService } from '../ConfigService.js';
import { HybridRetrievalService } from '../HybridRetrievalService.js';
import { InferenceService } from '../InferenceService.js';
import { MemoryService } from '../MemoryService.js';
import { TelemetryService } from '../TelemetryService.js';
import { MetaLearningController } from '../MetaLearningController.js';
import { PlannerAgent } from '../../agents/PlannerAgent.js';
import { CoderAgent } from '../../agents/CoderAgent.js';
import { CriticAgent } from '../../agents/CriticAgent.js';
import { TesterAgent } from '../../agents/TesterAgent.js';
import { CancellationToken } from 'vscode';

describe('OrchestratorService (ESM)', () => {
  let orchestrator: OrchestratorService;
  let token: any;

  let config: ConfigService;
  let retrieval: HybridRetrievalService;
  let inference: InferenceService;
  let memory: MemoryService;
  let telemetry: TelemetryService;
  let meta: MetaLearningController;
  let planner: PlannerAgent;
  let coder: CoderAgent;
  let critic: CriticAgent;
  let tester: TesterAgent;

  beforeEach(() => {
    config = new ConfigService();
    retrieval = new HybridRetrievalService({}, { latencyTarget: 1000 }, process.cwd());
    inference = new InferenceService();
    memory = new MemoryService();
    telemetry = new TelemetryService();
    meta = new MetaLearningController();
    planner = new PlannerAgent(inference);
    coder = new CoderAgent(inference);
    critic = new CriticAgent(inference);
    tester = new TesterAgent();
    orchestrator = new OrchestratorService(
      config,
      retrieval,
      inference,
      memory,
      telemetry,
      meta,
      planner,
      coder,
      critic,
      tester
    );
    token = { isCancellationRequested: false, onCancellationRequested: vi.fn() };
  });

  test('should execute the full workflow and return results on happy path', async () => {
    vi.spyOn(config, 'loadConfig').mockResolvedValue({});
    vi.spyOn(retrieval, 'retrieve').mockResolvedValue([
      { id: 'ctx1', sourceFile: 'file.ts', lineRange: { start: 1, end: 2 }, snippet: 'ctx' }
    ]);
    vi.spyOn(planner, 'execute').mockResolvedValue({
      tasks: [{ id: 't1', description: 'desc', priority: 'high' }],
      metadata: {}
    });
    vi.spyOn(coder, 'execute').mockResolvedValue({ code: 'code', diff: '', metadata: {} });
    vi.spyOn(critic, 'execute').mockResolvedValue({ feedback: '', issues: [] });
    vi.spyOn(tester, 'execute').mockResolvedValue({ testResults: [{ testName: 't', passed: true }], coverage: {} });
    vi.spyOn(memory, 'appendMemory').mockResolvedValue(undefined);
    vi.spyOn(telemetry, 'trackEvent').mockImplementation(() => {});
    vi.spyOn(meta, 'recordFeedback').mockImplementation(() => {});
    vi.spyOn(meta, 'runReflexion').mockResolvedValue({ summary: '' } as any);

    const result = await orchestrator.runWorkflow(
      { requirementText: 'req', language: 'ts', testFramework: 'jest' },
      token
    );

    expect(result).toHaveProperty('plan');
    expect(result).toHaveProperty('code');
    expect(telemetry.trackEvent).toHaveBeenCalledWith('workflow.start', expect.any(Object));
    expect(memory.appendMemory).toHaveBeenCalledTimes(5);
  });

  test('should stop execution when cancelled', async () => {
    token.isCancellationRequested = true;
    await expect(
      orchestrator.runWorkflow({ requirementText: '', language: 'ts', testFramework: 'jest' }, token)
    ).rejects.toThrow();
  });
});
