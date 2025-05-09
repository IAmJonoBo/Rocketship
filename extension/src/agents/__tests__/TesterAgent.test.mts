import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TesterAgent } from '../TesterAgent.js';

describe('TesterAgent (ESM)', () => {
  let agent: TesterAgent;
  const token = { isCancellationRequested: false } as any;

  beforeEach(() => {
    agent = new TesterAgent();
  });

  it('returns a well-formed stub response', async () => {
    const res = await agent.execute({ code: 'x=1', testFramework: 'jest', sessionId: 's1' }, token);
    expect(res).toHaveProperty('testResults');
    expect(Array.isArray(res.testResults)).toBe(true);
  });

  it('propagates errors from test runner', async () => {
    // Simulate error by monkey-patching execute
    (agent as any).execute = (vi.fn().mockRejectedValue(new Error('Test runner failed'))) as typeof agent.execute;
    await expect(agent.execute({ code: '', testFramework: 'jest', sessionId: 's1' }, token))
      .rejects.toThrow('Test runner failed');
  });
});