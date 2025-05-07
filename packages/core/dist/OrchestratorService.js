/**
 * © 2025 Rocketship Contributors
 * Licensed under the Apache-2.0 License.
 */
import { createCircuitBreaker } from './helpers.js';
import { RocketshipError } from './helpers.js';
export class OrchestratorService {
    retrieval;
    planner;
    coder;
    critic;
    tester;
    memory;
    telemetry;
    meta;
    constructor(retrieval, planner, coder, critic, tester, memory, telemetry, meta) {
        this.retrieval = retrieval;
        this.planner = planner;
        this.coder = coder;
        this.critic = critic;
        this.tester = tester;
        this.memory = memory;
        this.telemetry = telemetry;
        this.meta = meta;
    }
    async executeAgent(agent, params, token) {
        const breaker = createCircuitBreaker(() => agent.execute(params, token));
        try {
            return await breaker.fire();
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            throw new RocketshipError('AgentExecutionFailed', { agent, params }, message);
        }
    }
    // Stub for workflow orchestration
    async runWorkflow(def, token) {
        // TODO: Implement the full workflow orchestration logic
        throw new Error('runWorkflow not yet implemented');
    }
}
