import { CancellationToken } from 'vscode';
import { ContextChunk } from '@rocketship/shared';
import { InferenceService } from '../services/InferenceService.js';
export interface CoderAgentParams {
    taskId: string;
    codeContext: string;
    language: string;
    contextChunks?: ContextChunk[];
    sessionId: string;
}
export interface CoderAgentResponse {
    code: string;
    diff?: string;
    metadata?: Record<string, any>;
}
export declare class CoderAgent {
    private inference;
    constructor(inference: InferenceService);
    execute(params: CoderAgentParams, token: CancellationToken): Promise<CoderAgentResponse>;
}
//# sourceMappingURL=CoderAgent.d.ts.map