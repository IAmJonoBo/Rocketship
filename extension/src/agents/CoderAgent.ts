// CoderAgent is responsible for generating code
// See docs/Agent & API Documentation.md

import { CancellationToken } from 'vscode';
import { ContextChunk } from '@rocketship/shared';
import { InferenceService } from '../services/InferenceService.js';

export interface CoderAgentParams {
  taskId: string;
  codeContext: string;
  language: string;
  contextChunks?: ContextChunk[];
  sessionId: string;
}

export interface CoderAgentResponse {
  code: string;
  diff?: string;
  metadata?: Record<string, any>;
}

export class CoderAgent {
  constructor(private inference: InferenceService) {}

  async execute(params: CoderAgentParams, token: CancellationToken): Promise<CoderAgentResponse> {
    // 1. Flatten context chunks into prompt-friendly text
    const context = (params.contextChunks || [])
      .map(c => `// ${c.sourceFile}:${c.lineRange.start}-${c.lineRange.end}\n${c.snippet}`)
      .join('\n\n');

    // 2. Construct a code-only generation prompt
    const prompt = `
You are an expert ${params.language} developer. Complete the task "[${params.taskId}] ${params.codeContext}" using the context below.

Context:
${context}

Please provide only ${params.language} code. Do not include explanations or comments beyond minimal inline clarity.
`;
    // 3. Invoke model for code generation
    const result = await this.inference.callModel({ prompt }, token);

    // 4. Return generated code
    return {
      code: result.text.trim(),
      metadata: { model: result.modelId }
    };
  }
}