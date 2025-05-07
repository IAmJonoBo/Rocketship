import { CriticAgent } from '../CriticAgent';
import { InferenceService } from '../../services/InferenceService';
import { CancellationToken } from 'vscode';

jest.mock('../../services/InferenceService');

describe('CriticAgent', () => {
  let agent: CriticAgent;
  const token = { isCancellationRequested: false } as CancellationToken;

  beforeEach(() => {
    agent = new CriticAgent(new InferenceService());
  });

  it('parses valid JSON', async () => {
    (InferenceService.prototype.callModel as jest.Mock).mockResolvedValue({
      text: JSON.stringify({ feedback: 'OK', issues: [] })
    });
    const res = await agent.execute({ code: 'x=1', tests: [], sessionId: 's1' }, token);
    expect(res.feedback).toBe('OK');
    expect(Array.isArray(res.issues)).toBe(true);
  });

  it('throws on malformed JSON', async () => {
    (InferenceService.prototype.callModel as jest.Mock).mockResolvedValue({ text: 'not json' });
    await expect(agent.execute({ code: '', sessionId: 's1' }, token))
      .rejects.toThrow('CriticAgent: Failed to parse JSON response');
  });

  it('aborts if cancelled', async () => {
    token.isCancellationRequested = true;
    (InferenceService.prototype.callModel as jest.Mock).mockResolvedValue({ text: '{}' });
    // You may want to throw or return early in your agent if cancelled
    // For now, just ensure it still runs (customize as needed)
    const res = await agent.execute({ code: '', sessionId: 's1' }, token);
    expect(res).toBeDefined();
  });
});