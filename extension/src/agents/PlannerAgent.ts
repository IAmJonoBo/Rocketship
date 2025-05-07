// PlannerAgent is responsible for planning tasks
// See docs/Agent & API Documentation.md

import { CancellationToken } from 'vscode';
import { ContextChunk } from '@rocketship/shared';
import { InferenceService } from '../services/InferenceService';

/**
 * PlannerAgentParams:
 * - requirementText: user‐provided spec
 * - contextChunks: retrieval results for enhanced context
 * - sessionId: unique session identifier
 */
export interface PlannerAgentParams {
  requirementText: string;
  contextChunks?: ContextChunk[];
  sessionId: string;
}

export interface PlannerAgentResponse {
  tasks: Array<{ id: string; description: string; priority: 'low' | 'medium' | 'high' }>;
  metadata?: Record<string, any>;
}

export class PlannerAgent {
  constructor(private inference: InferenceService) {}

  async execute(params: PlannerAgentParams, token: CancellationToken): Promise<PlannerAgentResponse> {
    // 1. Serialize context chunks into text
    const context = (params.contextChunks || [])
      .map(c => `• ${c.sourceFile}:${c.lineRange.start}-${c.lineRange.end} → ${c.snippet}`)
      .join('\n');

    // 2. Build a planning prompt with chain-of-thought decomposition
    const prompt = `
You are a software engineering planner. Given the requirement below and supporting context, decompose into a list of discrete tasks.

Requirement:
${params.requirementText}

Context:
${context}

Output a JSON array of tasks, each with "id", "description", and "priority" (low/medium/high). Use concise, action-oriented descriptions.
Example:
[
  { "id":"task1", "description":"Initialize Rocketship VS Code extension", "priority":"high" },
  ...
]
`;
    // 3. Call the inference service for plan generation
    const result = await this.inference.callModel({ prompt }, token);

    // 4. Parse and return structured tasks
    let tasks;
    try {
      tasks = JSON.parse(result.text) as PlannerAgentResponse['tasks'];
    } catch {
      throw new Error('PlannerAgent: Failed to parse JSON response');
    }
    return { tasks, metadata: { model: result.modelId } };
  }
}