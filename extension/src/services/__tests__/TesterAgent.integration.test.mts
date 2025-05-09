// TODO: Use dynamic port allocation (e.g., get-port) for any services/servers.
// TODO: Add robust skip logic if Docker/Testcontainers is unavailable.
// TODO: Mark for refactor in the final mass refactor phase.
import { describe, it, test, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { TesterAgent } from '../../agents/TesterAgent.js';

describe('TesterAgent Integration', () => {
  let container: StartedPostgreSqlContainer;
  let agent: TesterAgent;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start(); // returns StartedPostgreSqlContainer
    agent = new TesterAgent();
  });

  afterAll(async () => {
    if (container) {
      try {
        await container.stop();
      } catch (err) {
        console.warn('Failed to stop container:', err);
      }
    }
  });

  it('runs tests against a real database', async () => {
    const dbUri = container.getConnectionUri();
    const fakeToken = { isCancellationRequested: false, onCancellationRequested: { dispose: () => {} } };
    const result = await agent.execute({ testDbUri: dbUri } as any, fakeToken as any);
    expect(Array.isArray(result.testResults)).toBe(true);
  });
});