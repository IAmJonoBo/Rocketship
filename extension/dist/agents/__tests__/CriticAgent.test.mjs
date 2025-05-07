import { describe, beforeEach, afterEach, test, expect, jest } from '@jest/globals';
import { CriticAgent } from '../CriticAgent.js';
import { InferenceService } from '../../services/InferenceService.js';
describe('CriticAgent (ESM)', () => {
    let agent;
    let inferSpy;
    beforeEach(() => {
        agent = new CriticAgent(new InferenceService());
        // Spy on the instance method via the prototype
        inferSpy = jest.spyOn(InferenceService.prototype, 'callModel');
        inferSpy.mockResolvedValue({ feedback: 'looks good', issues: [] });
    });
    afterEach(() => {
        // Restore original implementation
        inferSpy.mockRestore();
    });
    test('returns feedback and issues', async () => {
        const result = await agent.execute({ code: 'const x = 1;', sessionId: 'test' }, {});
        expect(result.feedback).toBe('looks good');
        expect(result.issues).toEqual([]);
    });
});
