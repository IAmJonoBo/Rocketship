
# Agent & API Documentation

This document defines the interface specifications for each agent, provides a reference for core extension and CLI APIs, and details activation patterns and security scopes for the VS Code extension.

---

## 1. Agent Interface Specification

### 1.1 PlannerAgent

**Purpose:** Analyze requirements and generate structured task lists.

```ts
interface PlannerAgentParams {
  requirementText: string;
  contextChunks?: ContextChunk[];
  sessionId: string;
}
interface PlannerAgentResponse {
  tasks: Array<{
    id: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
  }>;
  metadata?: Record<string, any>;
}
interface PlannerAgent {
  execute(params: PlannerAgentParams, token: CancellationToken): Promise<PlannerAgentResponse>;
}
```

- **Required Context Fields:**
  - `requirementText`
  - Optional `contextChunks`
  - `sessionId`
- **Response Schema:** List of tasks with id, description, priority, and optional metadata.

### 1.2 CoderAgent

**Purpose:** Generate or modify code based on tasks or specifications.

```ts
interface CoderAgentParams {
  taskId: string;
  codeContext: string;
  language: string;
  contextChunks?: ContextChunk[];
  sessionId: string;
}
interface CoderAgentResponse {
  code: string;
  diff?: string; // Unified diff against existing code
  metadata?: Record<string, any>;
}
interface CoderAgent {
  execute(params: CoderAgentParams, token: CancellationToken): Promise<CoderAgentResponse>;
}
```

- **Required Context Fields:**
  - `taskId`
  - `codeContext`
  - `language`
  - `sessionId`
- **Response Schema:** `code`, optional `diff`, and metadata.

### 1.3 CriticAgent

**Purpose:** Evaluate code or tasks and provide structured feedback.

```ts
interface CriticAgentParams {
  code: string;
  tests?: string[];
  sessionId: string;
}
interface CriticAgentResponse {
  feedback: string;
  issues: Array<{
    line: number;
    message: string;
    severity: 'info' | 'warning' | 'error';
  }>;
}
interface CriticAgent {
  execute(params: CriticAgentParams, token: CancellationToken): Promise<CriticAgentResponse>;
}
```

- **Required Context Fields:**
  - `code`
  - Optional `tests`
  - `sessionId`
- **Response Schema:** `feedback` and list of issues.

### 1.4 TesterAgent

**Purpose:** Generate and run tests, then report results.

```ts
interface TesterAgentParams {
  code: string;
  testFramework: 'jest' | 'mocha' | 'pytest';
  sessionId: string;
}
interface TesterAgentResponse {
  testResults: Array<{
    testName: string;
    passed: boolean;
    error?: string;
  }>;
  coverage?: Record<string, number>;
}
interface TesterAgent {
  execute(params: TesterAgentParams, token: CancellationToken): Promise<TesterAgentResponse>;
}
```

- **Required Context Fields:**
  - `code`
  - `testFramework`
  - `sessionId`
- **Response Schema:** `testResults` and optional `coverage`.

---

## 2. API Reference

### 2.1 Core Services

#### ConfigService

- **loadConfig():** `Promise<Config>`
- **onDidChangeConfig:** `Event<Config>`
- **Errors:**
  - `ConfigParseError`
  - `ConfigValidationError`

<details>
<summary>Example</summary>

```ts
try {
  const config = await configService.loadConfig();
} catch (err) {
  if (err instanceof ConfigValidationError) {
    // handle validation errors
  }
}
```

</details>

#### PluginManager

- **listPlugins():** `PluginInfo[]`
- **activatePlugin(id: string):** `Promise<void>`
- **deactivatePlugin(id: string):** `Promise<void>`

#### OrchestratorService

- **runWorkflow(workflow: WorkflowDefinition, token: CancellationToken):** `Promise<WorkflowResult>`
- **Errors:**
  - `WorkflowExecutionError` (includes `failedStep` and `cause`)

#### HybridRetrievalService

- **retrieve(query: string, options?: RetrievalOptions):** `Promise<ContextChunk[]>`

#### InferenceService

- **callModel(request: ModelRequest):** `Promise<ModelResponse>`
- **prewarmAdapter(adapterId: string):** `Promise<void>`

#### MemoryService

- **getSessionMemory(sessionId: string):** `MemoryRecord[]`
- **getPersistentMemory(key: string):** `MemoryRecord[]`
- **appendMemory(record: MemoryRecord):** `Promise<void>`

#### MetaLearningController

- **updateAdapters(data: TrainingData):** `Promise<void>`
- **recordFeedback(context: FeedbackContext):** `void`
- **runReflexion(result: WorkflowResult):** `Promise<ReflectionReport>`

#### TelemetryService

- **trackEvent(name: string, properties?: Record<string, any>):** `void`
- **flush():** `Promise<void>`

#### SecretStorageManager

- **getSecret(key: string):** `Promise<string | undefined>`
- **storeSecret(key: string, value: string):** `Promise<void>`

---

### 2.2 CLI Companion Commands

| Command                 | Description                                         | Exit Codes                |
|-------------------------|-----------------------------------------------------|---------------------------|
| `rocketship plan`       | Generate a plan from requirements                   | 0, 1 (validation error)   |
| `rocketship code`       | Produce code stubs or modifications                 | 0, 2 (execution error)    |
| `rocketship test`       | Generate and run tests                              | 0, 3 (test failure)       |
| `rocketship diagnose`   | Run self-diagnostics checks                         | 0, 4 (diagnostic failure) |

<details>
<summary>Example</summary>

```bash
npx rocketship plan --input specs.md --output plan.json
```

</details>

---

## 3. Extension Activation & Commands

### 3.1 Activation Events (package.json)

```jsonc
"activationEvents": [
  "onCommand:rocketship.plan",
  "onCommand:rocketship.code",
  "onCommand:rocketship.test",
  "onCommand:rocketship.diagnose",
  "workspaceContains:**/rocketship.yaml"
],
```

### 3.2 Contributed Commands

```jsonc
"contributes": {
  "commands": [
    {
      "command": "rocketship.plan",
      "title": "Rocketship: Plan",
      "category": "Rocketship"
    },
    {
      "command": "rocketship.code",
      "title": "Rocketship: Code",
      "category": "Rocketship"
    },
    {
      "command": "rocketship.test",
      "title": "Rocketship: Test",
      "category": "Rocketship"
    },
    {
      "command": "rocketship.diagnose",
      "title": "Rocketship: Diagnose",
      "category": "Rocketship"
    }
  ]
}
```

### 3.3 Command Security Scopes

- **rocketship.plan:** Requires workspace read and write access.
- **rocketship.code:** Requires ability to modify workspace files.
- **rocketship.test:** Requires execution permission for test frameworks.
- **rocketship.diagnose:** May perform network and file system health checks.
