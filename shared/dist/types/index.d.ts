export type PlaceholderType = {};
export interface ContextChunk {
    id: string;
    snippet: string;
    sourceFile: string;
    lineRange: {
        start: number;
        end: number;
    };
    score?: number;
}
export interface WorkflowResult {
    plan: any;
    code: any;
    critique: any;
    testResults: any;
}
export interface ReflectionReport {
    summary: string;
    insights?: string[];
    actions?: string[];
}
//# sourceMappingURL=index.d.ts.map