import { CancellationToken } from 'vscode';
import { ConfigService } from './ConfigService';
import { HybridRetrievalService } from './HybridRetrievalService';
import { InferenceService } from './InferenceService';
import { MemoryService } from './MemoryService';
import { TelemetryService } from './TelemetryService';
import { MetaLearningController } from './MetaLearningController';
import { PlannerAgent } from '../agents/PlannerAgent';
import { CoderAgent } from '../agents/CoderAgent';
import { CriticAgent } from '../agents/CriticAgent';
import { TesterAgent } from '../agents/TesterAgent';
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
