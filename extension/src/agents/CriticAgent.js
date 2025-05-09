// CriticAgent is responsible for reviewing and critiquing code
// See docs/Agent & API Documentation.md
export class CriticAgent {
    inference;
    constructor(inference) {
        this.inference = inference;
    }
    async execute(params, token) {
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
            const parsed = JSON.parse(result.text);
            if (typeof parsed.feedback !== 'string' || !Array.isArray(parsed.issues)) {
                throw new Error('Invalid CriticAgent schema');
            }
            return parsed;
        }
        catch (err) {
            throw new Error(`CriticAgent JSON parse error: ${err.message}`);
        }
    }
}
