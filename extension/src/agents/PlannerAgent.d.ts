import { CancellationToken } from 'vscode';
import { ContextChunk } from '@rocketship/shared';
import { InferenceService } from '../services/InferenceService.js';
/**
 * PlannerAgentParams:
 * - requirementText: user‐provided spec
 * - contextChunks: retrieval results for enhanced context
 * - sessionId: unique session identifier
 */
export interface PlannerAgentParams {
    requirementText: string;
    contextChunks?: ContextChunk[];
    sessionId: string;
}
export interface PlannerAgentResponse {
    tasks: Array<{
        id: string;
        description: string;
        priority: 'low' | 'medium' | 'high';
    }>;
    metadata?: Record<string, any>;
}
export declare class PlannerAgent {
    private inference;
    constructor(inference: InferenceService);
    execute(params: PlannerAgentParams, token: CancellationToken): Promise<PlannerAgentResponse>;
}
//# sourceMappingURL=PlannerAgent.d.ts.map