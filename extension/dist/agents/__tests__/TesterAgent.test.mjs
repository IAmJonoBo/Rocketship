import { describe, beforeEach, test, expect, jest } from '@jest/globals';
import { TesterAgent } from '../TesterAgent.js';
describe('TesterAgent (ESM)', () => {
    let agent;
    const token = { isCancellationRequested: false };
    beforeEach(() => {
        agent = new TesterAgent();
    });
    test('returns a well-formed stub response', async () => {
        const res = await agent.execute({ code: 'x=1', testFramework: 'jest', sessionId: 's1' }, token);
        expect(res).toHaveProperty('testResults');
        expect(Array.isArray(res.testResults)).toBe(true);
    });
    test('propagates errors from test runner', async () => {
        // Simulate error by monkey-patching execute
        // @ts-expect-error: TypeScript cannot infer the correct type for this mock
        agent.execute = (jest.fn().mockRejectedValue(new Error('Test runner failed')));
        await expect(agent.execute({ code: '', testFramework: 'jest', sessionId: 's1' }, token))
            .rejects.toThrow('Test runner failed');
    });
});
