import { CancellationToken } from 'vscode';
import { InferenceService } from '../services/InferenceService.js';
export interface CriticAgentParams {
    code: string;
    tests?: string[];
    sessionId: string;
}
export interface CriticAgentResponse {
    feedback: string;
    issues: Array<{
        line: number;
        message: string;
        severity: 'info' | 'warning' | 'error';
    }>;
}
export declare class CriticAgent {
    private inference;
    constructor(inference: InferenceService);
    execute(params: CriticAgentParams, token: CancellationToken): Promise<CriticAgentResponse>;
}
//# sourceMappingURL=CriticAgent.d.ts.map