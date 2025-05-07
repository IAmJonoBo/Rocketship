// PlannerAgent is responsible for planning tasks
// See docs/Agent & API Documentation.md
export class PlannerAgent {
    inference;
    constructor(inference) {
        this.inference = inference;
    }
    async execute(params, token) {
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
            tasks = JSON.parse(result.text);
        }
        catch {
            throw new Error('PlannerAgent: Failed to parse JSON response');
        }
        return { tasks, metadata: { model: result.modelId } };
    }
}
