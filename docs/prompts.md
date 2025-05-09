# Prompt Engineering

> **Note:** This file consolidates and supersedes the previous 'Prompt Engineering Guidelines.md'.

Effective prompt engineering hinges on clarity, context, and iterative refinement. Core principles—such as specificity, role definition, and structured prompting—lay the foundation for reliable model behavior. Advanced techniques like chain-of-thought, few-shot prompting, and reflexive self-evaluation boost reasoning and resilience to hallucinations. Responsible practices, including bias mitigation, prompt safety, and modular template management, ensure ethical and maintainable workflows. Rigorous testing, A/B experimentation, and metrics-driven optimization complete a disciplined prompt engineering lifecycle that maximizes performance across use cases.

## 1. Core Principles

### 1.1 Clarity & Specificity
Prompts must articulate the exact task, expectations, and constraints to prevent ambiguous or generic outputs.

### 1.2 Context & Scope
Provide sufficient background or data snippets to enable domain-relevant responses, while bounding context size to avoid token overflow.

### 1.3 Role & Persona
Assign a clear role (e.g., "You are a senior data engineer.") and desired tone to align outputs with stylistic and expertise requirements.

## 2. Advanced Techniques

### 2.1 Chain-of-Thought Prompting
Encourage models to "think step-by-step" to improve multi-step reasoning, reducing hallucinations and logical errors.

### 2.2 Few-Shot & Zero-Shot Prompting
Demonstrate desired output formats through a small number of examples (few-shot), or rely on explicit instructions for zero-shot, depending on the task complexity.

### 2.3 Reflexive Self-Evaluation (Reflexion)
Implement multi-pass prompts where the model critiques its own output and iteratively refines the response for higher accuracy.

### 2.4 Multi-Objective Directional Prompting (MODP)
Incorporate metrics-driven "directional" cues to guide the model towards multiple objectives simultaneously, balancing correctness and style.

### 2.5 Sequential Optimal Prompt Learning
Use Bayesian or Knowledge-Gradient frameworks to automatically optimize prompt parameters through sequential trials under a limited evaluation budget.

## 3. Responsible Prompting

### 3.1 Bias & Fairness Mitigation
Use balanced examples and avoid loaded language; employ fairness-aware evaluators to detect biased outputs.

### 3.2 Prompt Safety & Injection Guardrails
Sanitize inputs, lock system messages, and apply semantic filters to thwart injection attempts and ensure stable behavior.

## 4. Testing & Iteration

### 4.1 Prompt Versioning & A/B Testing
Maintain a versioned registry of prompt variants; measure performance metrics (accuracy, cost, user overrides) to select optimal versions.

### 4.2 Metrics-Driven Optimization
Track key indicators—task success rate, token usage, latency—and automate threshold-based alerts for prompt regressions.

## 5. Template Library

| Use Case            | Template Snippet                                     |
|---------------------|-------------------------------------------------------|
| QA                  | "Answer the following question based on context: {{context}} Q: {{query}} A:" |
| Summarization       | "Summarize the text below in {{length}} words: {{text}}" |
| Code Generation     | "Write a {{language}} function that {{spec}}. Provide only code, no explanations." |
| Test Generation     | "Based on the function signature and implementation, generate Jest tests." |

## 6. Tooling & Workflow

### 6.1 Prompt Management Platforms
Leverage platforms like PromptHub or promptingguide.ai for collaborative prompt versioning and performance tracking.

### 6.2 Retrieval-Augmented Prompting
Combine RAG context (graph snippets + vector chunks) with structured prompts to enrich domain knowledge without exceeding token limits.

### 6.3 LoRA Adapter Injection
For repetitive or domain-specific tasks, inject low-rank adapters to fine-tune base models on-the-fly, then reflect the adapter ID in prompts for contextual awareness.

## 7. Maintenance & Collaboration

> **TODO:** Ensure all agent/system prompts are covered by versioned `.tpl` files with version/timestamp headers in `extension/src/prompts/`. Track prompt load telemetry as implemented or as a TODO in the codebase.

### 7.1 Prompt ADRs
Document major prompt-design decisions as ADRs (e.g., adopting MODP) to trace rationale and facilitate future audits.

### 7.2 Sharing & Reuse
Store shared prompt templates and best practices in a centralized "prompts" repository, with clear naming, metadata, and usage examples.

## See also
- agents.md
- architecture.md
- onboarding.md