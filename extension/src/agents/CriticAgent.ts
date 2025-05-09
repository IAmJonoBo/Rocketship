// CriticAgent is responsible for reviewing and critiquing code
// See docs/Agent & API Documentation.md

import { CancellationToken } from 'vscode';
import { InferenceService } from '../services/InferenceService.js';
import { Issue } from '../../../shared/src/types/index.js';
import { Validator } from '../../../packages/core/src/Validator.js';
import criticSchema from '../../../shared/src/schema/critic.schema.json' with { type: 'json' };

export interface CriticAgentParams {
  code: string;
  tests?: string[];
  sessionId: string;
}
export interface CriticAgentResponse {
  feedback: string;
  issues: Issue[];
}

export class CriticAgent {
  constructor(private inference: InferenceService) {}

  async execute(params: CriticAgentParams, token: CancellationToken): Promise<CriticAgentResponse> {
    const context = (params.tests || [])
      .map(t => `// test: ${t}`)
      .join('\n');
    const prompt = `
You are an expert code critic. Given the code below and optional tests, provide structured feedback and list issues.

Code:
${params.code}

Tests:
${context}

Output a JSON object with "feedback" and "issues" (each with line, message, severity). Example:
{
  "feedback": "Consider variable naming improvements.",
  "issues": [ { "line": 12, "message": "Unused variable x", "severity": "warning" } ]
}
`;
    const result = await this.inference.callModel({ prompt }, token);
    try {
      const parsed = JSON.parse(result.text) as CriticAgentResponse;
      if (typeof parsed.feedback !== 'string' || !Array.isArray(parsed.issues)) {
        throw new Error('Invalid CriticAgent schema');
      }
      // Ajv validation
      const validator = new Validator();
      const validate = validator.compile(criticSchema);
      if (!validate(parsed)) {
        throw new Error('CriticAgent output failed schema validation: ' + JSON.stringify(validate.errors));
      }
      return parsed;
    } catch (err: any) {
      throw new Error(`CriticAgent JSON parse error: ${err.message}`);
    }
  }
}