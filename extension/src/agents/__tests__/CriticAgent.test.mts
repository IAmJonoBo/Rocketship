import { describe, beforeEach, afterEach, test, expect, jest } from '@jest/globals';
import { CriticAgent } from '../CriticAgent.js';
import { InferenceService } from '../../services/InferenceService.js';

describe('CriticAgent (ESM)', () => {
  let agent: CriticAgent;
  let inferSpy: jest.MockedFunction<any>;

  beforeEach(() => {
    agent = new CriticAgent(new InferenceService());
    // Spy on the instance method via the prototype
    inferSpy = jest.spyOn(InferenceService.prototype, 'callModel') as any;
    inferSpy.mockResolvedValue({ text: JSON.stringify({ feedback: 'All checks passed.', issues: [] }) } as any);
  });

  afterEach(() => {
    // Restore original implementation
    inferSpy.mockRestore();
  });

  test('returns feedback and issues', async () => {
    const result = await agent.execute({ code: 'const x = 1;', sessionId: 'test' } as any, {} as any);
    expect(result.feedback).toBe('All checks passed.');
    expect(result.issues).toEqual([]);
  });

  test('throws on malformed JSON', async () => {
    inferSpy.mockResolvedValue({ text: '{"feedback": "oops", "issues": [}' } as any);
    await expect(agent.execute({ code: 'const x = 1;', sessionId: 'test' } as any, {} as any))
      .rejects
      .toThrow(/CriticAgent JSON parse error/);
  });
});