// CriticAgent is responsible for reviewing and critiquing code
// See docs/Agent & API Documentation.md

import { CancellationToken } from 'vscode';
import { InferenceService } from '../services/InferenceService';

export interface CriticAgentParams {
  code: string;
  tests?: string[];
  sessionId: string;
}
export interface CriticAgentResponse {
  feedback: string;
  issues: Array<{ line: number; message: string; severity: 'info' | 'warning' | 'error' }>;
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
    let critique;
    try { critique = JSON.parse(result.text) as CriticAgentResponse; }
    catch { throw new Error('CriticAgent: Failed to parse JSON response'); }
    return critique;
  }
}