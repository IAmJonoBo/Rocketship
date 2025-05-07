"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrchestratorService_1 = require("../OrchestratorService");
const ConfigService_1 = require("../ConfigService");
const HybridRetrievalService_1 = require("../HybridRetrievalService");
const InferenceService_1 = require("../InferenceService");
const MemoryService_1 = require("../MemoryService");
const TelemetryService_1 = require("../TelemetryService");
const MetaLearningController_1 = require("../MetaLearningController");
const PlannerAgent_1 = require("../../agents/PlannerAgent");
const CoderAgent_1 = require("../../agents/CoderAgent");
const CriticAgent_1 = require("../../agents/CriticAgent");
const TesterAgent_1 = require("../../agents/TesterAgent");
jest.mock('../ConfigService');
jest.mock('../HybridRetrievalService');
jest.mock('../InferenceService');
jest.mock('../MemoryService');
jest.mock('../TelemetryService');
jest.mock('../MetaLearningController');
jest.mock('../../agents/PlannerAgent');
jest.mock('../../agents/CoderAgent');
jest.mock('../../agents/CriticAgent');
jest.mock('../../agents/TesterAgent');
describe('OrchestratorService', () => {
    let orchestrator;
    let token;
    beforeEach(() => {
        jest.clearAllMocks();
        orchestrator = new OrchestratorService_1.OrchestratorService(new ConfigService_1.ConfigService(), new HybridRetrievalService_1.HybridRetrievalService(), new InferenceService_1.InferenceService(), new MemoryService_1.MemoryService(), new TelemetryService_1.TelemetryService(), new MetaLearningController_1.MetaLearningController(), new PlannerAgent_1.PlannerAgent(new InferenceService_1.InferenceService()), new CoderAgent_1.CoderAgent(new InferenceService_1.InferenceService()), new CriticAgent_1.CriticAgent(new InferenceService_1.InferenceService()), new TesterAgent_1.TesterAgent());
        token = { isCancellationRequested: false, onCancellationRequested: jest.fn() };
    });
    it('should execute the full workflow and return results on happy path', async () => {
        HybridRetrievalService_1.HybridRetrievalService.prototype.retrieve.mockResolvedValue([{ id: '1', content: 'ctx' }]);
        PlannerAgent_1.PlannerAgent.prototype.execute.mockResolvedValue({ tasks: [{ id: 't1', description: 'desc' }] });
        CoderAgent_1.CoderAgent.prototype.execute.mockResolvedValue({ code: 'code', diff: '' });
        CriticAgent_1.CriticAgent.prototype.execute.mockResolvedValue({ feedback: '', issues: [] });
        TesterAgent_1.TesterAgent.prototype.execute.mockResolvedValue({ testResults: [{ testName: 't', passed: true }] });
        const result = await orchestrator.runWorkflow({ requirementText: 'req', language: 'ts', testFramework: 'jest' }, token);
        // Debug: print all calls to appendMemory
        // eslint-disable-next-line no-console
        console.log('appendMemory calls:', MemoryService_1.MemoryService.prototype.appendMemory.mock.calls);
        expect(result).toHaveProperty('plan');
        expect(result).toHaveProperty('code');
        expect(TelemetryService_1.TelemetryService.prototype.trackEvent).toHaveBeenCalledWith('workflow.start', expect.any(Object));
        expect(MemoryService_1.MemoryService.prototype.appendMemory).toHaveBeenCalledTimes(5);
    });
    it('should stop execution when cancelled', async () => {
        token.isCancellationRequested = true;
        await expect(orchestrator.runWorkflow({ requirementText: '', language: 'ts', testFramework: 'jest' }, token)).rejects.toThrow();
    });
});
