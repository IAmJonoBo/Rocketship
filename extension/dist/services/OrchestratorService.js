"use strict";
// OrchestratorService coordinates agent workflows
// See docs/Architectural Documentation.md
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrchestratorService = void 0;
class OrchestratorService {
    constructor(configService, retrieval, inference, memory, telemetry, metaLearning, planner, coder, critic, tester) {
        this.configService = configService;
        this.retrieval = retrieval;
        this.inference = inference;
        this.memory = memory;
        this.telemetry = telemetry;
        this.metaLearning = metaLearning;
        this.planner = planner;
        this.coder = coder;
        this.critic = critic;
        this.tester = tester;
    }
    async runWorkflow(def, token) {
        const startTs = Date.now();
        // 0. Cancellation guard: abort immediately if already cancelled
        if (token.isCancellationRequested) {
            throw new Error('OrchestratorService: Workflow cancelled');
        }
        // 1. Load configuration
        const config = await this.configService.loadConfig();
        this.telemetry.trackEvent('workflow.start', { workflow: 'Plan→Code→Test' });
        // 2. Retrieval: get context snippets
        const contextChunks = await this.retrieval.retrieve(def.requirementText, { token });
        // 2a. Persist retrieval context for long-term memory
        await this.memory.appendMemory({
            type: 'retrievalContext',
            data: contextChunks
        });
        this.telemetry.trackEvent('retrieval.complete', {
            count: contextChunks.length,
            duration: Date.now() - startTs,
        });
        // 3. Planner Agent
        const plan = await this.planner.execute({ requirementText: def.requirementText, contextChunks, sessionId: token.isCancellationRequested ? 'cancelled' : 'active' }, token);
        await this.memory.appendMemory({ type: 'plan', data: plan });
        this.telemetry.trackEvent('planner.complete', { taskCount: plan.tasks.length });
        // 4. Coder Agent
        const code = await this.coder.execute({ taskId: plan.tasks[0]?.id, codeContext: plan.tasks[0]?.description, language: def.language, contextChunks, sessionId: 'session1' }, token);
        await this.memory.appendMemory({ type: 'code', data: code });
        this.telemetry.trackEvent('coder.complete');
        // 5. Critic Agent
        const critique = await this.critic.execute({ code: code.code, tests: [], sessionId: 'session1' }, token);
        await this.memory.appendMemory({ type: 'critique', data: critique });
        this.telemetry.trackEvent('critic.complete', { issues: critique.issues.length });
        // 6. Tester Agent
        const testResults = await this.tester.execute({ code: code.code, testFramework: def.testFramework, sessionId: 'session1' }, token);
        await this.memory.appendMemory({ type: 'test', data: testResults });
        this.telemetry.trackEvent('tester.complete', { passed: testResults.testResults.filter(r => r.passed).length });
        // 7. Reflexion / Meta-Learning
        await this.metaLearning.recordFeedback({ plan, code, critique, testResults });
        const reflection = await this.metaLearning.runReflexion({ plan, code, critique, testResults });
        this.telemetry.trackEvent('reflexion.complete', { insights: reflection });
        this.telemetry.trackEvent('workflow.complete', { totalDuration: Date.now() - startTs });
        return { plan, code, critique, testResults };
    }
}
exports.OrchestratorService = OrchestratorService;
