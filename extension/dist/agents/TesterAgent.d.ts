import { CancellationToken } from 'vscode';
export interface TesterAgentParams {
    code: string;
    testFramework: 'jest' | 'mocha' | 'pytest';
    sessionId: string;
}
export interface TesterAgentResponse {
    testResults: Array<{
        testName: string;
        passed: boolean;
        error?: string;
    }>;
    coverage?: Record<string, number>;
}
export declare class TesterAgent {
    constructor();
    execute(params: TesterAgentParams, token: CancellationToken): Promise<TesterAgentResponse>;
}
//# sourceMappingURL=TesterAgent.d.ts.map