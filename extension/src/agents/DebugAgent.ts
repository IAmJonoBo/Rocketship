import { InferenceService } from '../services/InferenceService.js';
import { TesterAgent } from './TesterAgent.js';
import { TelemetryService } from '../services/TelemetryService.js';
import { Issue, DebugReport } from '../../../shared/src/types/index.js';
import { CancellationToken } from 'vscode';
import { applyPatch } from '../helpers/patch.js';

export class DebugAgent {
  constructor(
    private inference: InferenceService,
    private tester: TesterAgent,
    private telemetry: TelemetryService
  ) {}

  async execute(
    params: { code: string; errors: Issue[] },
    token: CancellationToken
  ): Promise<{ patchedCode: string; report: DebugReport }> {
    // 1. Ask the LLM to analyze `code` and `errors`:
    const prompt = `The following code failed tests with errors:\n\n\\n${params.code}\n\\nErrors:\n${JSON.stringify(params.errors, null, 2)}\nGenerate a patch diff that fixes these issues.`;
    const result = await this.inference.callModel({ prompt }, token);

    // 2. Apply the diff to the code:
    const patchedCode = applyPatch(params.code, result.text);

    // 3. Re-run tests in sandbox:
    const testResultsResp = await this.tester.execute({ code: patchedCode, testFramework: 'jest', sessionId: 'debug-session' }, token);

    // 4. Emit telemetry and return:
    const allPassed = testResultsResp.testResults.every(r => r.passed);
    this.telemetry.trackEvent('debug.completed', { success: allPassed });
    return { patchedCode, report: { originalErrors: params.errors, testResults: testResultsResp.testResults } };
  }
}