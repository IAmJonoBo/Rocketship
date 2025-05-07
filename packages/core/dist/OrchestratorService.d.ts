/**
 * © 2025 Rocketship Contributors
 * Licensed under the Apache-2.0 License.
 */
export declare class OrchestratorService {
    private retrieval;
    private planner;
    private coder;
    private critic;
    private tester;
    private memory;
    private telemetry;
    private meta;
    constructor(retrieval: any, planner: any, coder: any, critic: any, tester: any, memory: any, telemetry: any, meta: any);
    executeAgent(agent: any, params: any, token: any): Promise<any>;
    runWorkflow(def: any, token: any): Promise<any>;
}
//# sourceMappingURL=OrchestratorService.d.ts.map