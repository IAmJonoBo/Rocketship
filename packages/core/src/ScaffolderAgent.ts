import { CancellationToken } from 'vscode';
import { RocketshipError } from './helpers.js';

// Placeholder types
export type Task = any;
export type ScaffoldResult = any;

/**
 * ScaffolderAgent
 * Generates file/folder skeletons based on a Plan.
 * TODO: Integrate Yeoman generator invocation (yo rocketship-scaffold).
 */
export class ScaffolderAgent {
  async execute(params: { tasks: Task[] }, token: CancellationToken): Promise<{ scaffolds: ScaffoldResult[] }> {
    if (token.isCancellationRequested) throw new RocketshipError('Cancelled', { agent: 'ScaffolderAgent' }, 'Operation cancelled');
    // TODO: invoke Yeoman generator for each task:
    // `await runYeomanGenerator(task.definition, params.destination);`
    return { scaffolds: [] };
  }
}