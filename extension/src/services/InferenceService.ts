// InferenceService provides LLM inference capabilities
// See docs/Agent & API Documentation.md

import { CancellationToken } from 'vscode';

/**
 * ModelRequest encapsulates the prompt (and any other parameters) sent to the LLM.
 */
export interface ModelRequest {
  prompt: string;
  // ...add fields like maxTokens, temperature, etc., as needed
}

/**
 * ModelResponse contains the LLM's raw text output and metadata about the model invocation.
 */
export interface ModelResponse {
  text: string;
  modelId?: string;
  // ...add fields like usage, finishReason, etc.
}

export class InferenceService {
  constructor() {
    // Initialize inference service
  }

  infer(prompt: string) {
    // TODO: Implement inference logic
    return '';
  }

  /**
   * Call the configured LLM with a given request, honoring cancellation tokens.
   *
   * @param request  The prompt and parameters for the model.
   * @param token    VS Code cancellation token to abort long-running calls.
   * @returns        The model's text response and metadata.
   */
  async callModel(request: ModelRequest, token: CancellationToken): Promise<ModelResponse> {
    // TODO: dispatch to OpenAI, Ollama, or HF provider per config
    return { text: '', modelId: undefined };
  }

  /**
   * Optionally prewarm or load any adapters or caches.
   */
  async prewarmAdapter(adapterId: string): Promise<void> {
    // TODO: implement adapter prewarming if using LoRA or similar
  }
}