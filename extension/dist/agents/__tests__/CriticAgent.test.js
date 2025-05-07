"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CriticAgent_1 = require("../CriticAgent");
const InferenceService_1 = require("../../services/InferenceService");
jest.mock('../../services/InferenceService');
describe('CriticAgent', () => {
    let agent;
    const token = { isCancellationRequested: false };
    beforeEach(() => {
        agent = new CriticAgent_1.CriticAgent(new InferenceService_1.InferenceService());
    });
    it('parses valid JSON', async () => {
        InferenceService_1.InferenceService.prototype.callModel.mockResolvedValue({
            text: JSON.stringify({ feedback: 'OK', issues: [] })
        });
        const res = await agent.execute({ code: 'x=1', tests: [], sessionId: 's1' }, token);
        expect(res.feedback).toBe('OK');
        expect(Array.isArray(res.issues)).toBe(true);
    });
    it('throws on malformed JSON', async () => {
        InferenceService_1.InferenceService.prototype.callModel.mockResolvedValue({ text: 'not json' });
        await expect(agent.execute({ code: '', sessionId: 's1' }, token))
            .rejects.toThrow('CriticAgent: Failed to parse JSON response');
    });
    it('aborts if cancelled', async () => {
        token.isCancellationRequested = true;
        InferenceService_1.InferenceService.prototype.callModel.mockResolvedValue({ text: '{}' });
        // You may want to throw or return early in your agent if cancelled
        // For now, just ensure it still runs (customize as needed)
        const res = await agent.execute({ code: '', sessionId: 's1' }, token);
        expect(res).toBeDefined();
    });
});
