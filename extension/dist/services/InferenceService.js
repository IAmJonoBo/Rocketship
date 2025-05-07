// InferenceService provides LLM inference capabilities
// See docs/Agent & API Documentation.md
export class InferenceService {
    constructor() {
        // Initialize inference service
    }
    infer(prompt) {
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
    async callModel(request, token) {
        // TODO: dispatch to OpenAI, Ollama, or HF provider per config
        return { text: '', modelId: undefined };
    }
    /**
     * Optionally prewarm or load any adapters or caches.
     */
    async prewarmAdapter(adapterId) {
        // TODO: implement adapter prewarming if using LoRA or similar
    }
}
