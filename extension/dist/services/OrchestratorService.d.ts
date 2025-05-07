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
export declare class OrchestratorService {
    private configService;
    private retrieval;
    private inference;
    private memory;
    private telemetry;
    private metaLearning;
    private planner;
    private coder;
    private critic;
    private tester;
    constructor(configService: ConfigService, retrieval: HybridRetrievalService, inference: InferenceService, memory: MemoryService, telemetry: TelemetryService, metaLearning: MetaLearningController, planner: PlannerAgent, coder: CoderAgent, critic: CriticAgent, tester: TesterAgent);
    runWorkflow(def: WorkflowDefinition, token: CancellationToken): Promise<WorkflowResult>;
}
//# sourceMappingURL=OrchestratorService.d.ts.map