import { CancellationToken } from 'vscode';
/**
 * ModelRequest encapsulates the prompt (and any other parameters) sent to the LLM.
 */
export interface ModelRequest {
    prompt: string;
}
/**
 * ModelResponse contains the LLM's raw text output and metadata about the model invocation.
 */
export interface ModelResponse {
    text: string;
    modelId?: string;
}
export declare class InferenceService {
    constructor();
    infer(prompt: string): string;
    /**
     * Call the configured LLM with a given request, honoring cancellation tokens.
     *
     * @param request  The prompt and parameters for the model.
     * @param token    VS Code cancellation token to abort long-running calls.
     * @returns        The model's text response and metadata.
     */
    callModel(request: ModelRequest, token: CancellationToken): Promise<ModelResponse>;
    /**
     * Optionally prewarm or load any adapters or caches.
     */
    prewarmAdapter(adapterId: string): Promise<void>;
}
//# sourceMappingURL=InferenceService.d.ts.map