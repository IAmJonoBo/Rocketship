# Configuration

> **For the canonical implementation plan and actionable details, see:**
> - [Feature_Enhancements.md](../Feature_Enhancements.md)
> - [architecture.md](architecture.md)
> - [onboarding.md](onboarding.md)

This document consolidates the configuration schema, merge strategy, validation, and sample configs for Rocketship. All configuration practices are aligned with the Integration & Technical Plan and project architecture.

---

## 1. Configuration Schema

Rocketship uses a YAML-based configuration file (`rocketship.yaml`) to define agents, plugins, features, and global settings.

**Sample schema:**
```yaml
modelProvider: openai
maxConcurrentAgents: 4
agents:
  planner:
    enabled: true
    model: gpt-4
    prompt: planner-agent.tpl
  coder:
    enabled: true
    model: starcoder
    prompt: coder-agent.tpl
plugins:
  myCustomAgent:
    type: agent
    entry: ./plugins/myCustomAgent/index.js
    enabled: true
retrieval:
  chunking: token
  embeddingModel: openai
  vectorStore: lancedb
observability:
  telemetry: true
  dashboards: true
security:
  secretStorage: vscode
  inputValidation: true
```

---

## 2. Merge Strategy
- User config in `.vscode/rocketship.yaml` overrides defaults in `extension/config/default.yaml`.
- Deep merge is performed for nested objects (e.g., `agents`, `plugins`).
- Environment variables can override any config value (e.g., `ROCKETSHIP_MODEL_PROVIDER`).

---

## 3. Validation
- All configs are validated at load time using Ajv and shared JSON schemas.
- Invalid configs block startup and emit detailed diagnostics.
- See `ConfigService` and `schemas/` for canonical validation logic.

---

## 4. Sample Configs
- See `extension/config/` for more examples.
- Minimal config:
```yaml
modelProvider: openai
agents:
  planner:
    enabled: true
```
- Full-featured config:
```yaml
modelProvider: openai
maxConcurrentAgents: 8
agents:
  planner:
    enabled: true
    model: gpt-4
    prompt: planner-agent.tpl
  coder:
    enabled: true
    model: starcoder
    prompt: coder-agent.tpl
plugins:
  myCustomAgent:
    type: agent
    entry: ./plugins/myCustomAgent/index.js
    enabled: true
retrieval:
  chunking: token
  embeddingModel: openai
  vectorStore: lancedb
observability:
  telemetry: true
  dashboards: true
security:
  secretStorage: vscode
  inputValidation: true
```

---

## 5. References
- [Feature_Enhancements.md](../Feature_Enhancements.md)
- [architecture.md](architecture.md)
- [onboarding.md](onboarding.md)