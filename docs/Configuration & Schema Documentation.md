

# Configuration & Schema Documentation

This document provides the JSON Schema for `rocketship.yaml`, explains the configuration merge strategy across VS Code settings and YAML levels, and offers sample templates for common environments (M1 MacBook Pro, Linux server).

---

## 1. JSON Schema Definition

Below is the JSON Schema (Draft-07) for `rocketship.yaml`. It defines global defaults, per-agent overrides, and key feature toggles. Inline comments (`description`) explain each field.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Rocketship Configuration Schema",
  "description": "Schema for rocketship.yaml configuration",
  "type": "object",
  "properties": {
    "global": {
      "type": "object",
      "description": "Global settings applied to all agents and services",
      "properties": {
        "modelProvider": {
          "type": "string",
          "enum": ["local", "ollama", "hf", "custom"],
          "default": "local",
          "description": "Default model provider: 'local', 'ollama', 'hf' (Hugging Face), or 'custom'."
        },
        "maxConcurrentAgents": {
          "type": "integer",
          "minimum": 1,
          "default": 2,
          "description": "Max number of simultaneous agent invocations."
        },
        "requestTimeoutMs": {
          "type": "integer",
          "minimum": 1000,
          "default": 120000,
          "description": "Request timeout in milliseconds for LLM calls."
        },
        "enableTelemetry": {
          "type": "boolean",
          "default": true,
          "description": "Globally enable or disable telemetry events."
        }
      },
      "additionalProperties": false
    },
    "agents": {
      "type": "object",
      "description": "Per-agent configuration overrides",
      "patternProperties": {
        "^[A-Za-z0-9]+Agent$": {
          "type": "object",
          "properties": {
            "modelProvider": {
              "type": "string",
              "enum": ["local", "ollama", "hf", "custom"],
              "description": "Override model provider for this agent."
            },
            "maxConcurrent": {
              "type": "integer",
              "minimum": 1,
              "description": "Override max concurrent calls for this agent."
            },
            "requestTimeoutMs": {
              "type": "integer",
              "minimum": 1000,
              "description": "Override request timeout for this agent."
            },
            "enabled": {
              "type": "boolean",
              "default": true,
              "description": "Enable or disable this agent."
            }
          },
          "additionalProperties": false
        }
      }
    },
    "retrieval": {
      "type": "object",
      "description": "Settings for hybrid retrieval pipeline",
      "properties": {
        "vector": {
          "type": "object",
          "description": "Vector embedding index configuration",
          "properties": {
            "chunkSize": {
              "type": "integer",
              "default": 256,
              "description": "Number of tokens per embedding chunk."
            },
            "overlap": {
              "type": "integer",
              "default": 128,
              "description": "Token overlap between chunks."
            }
          },
          "additionalProperties": false
        },
        "graph": {
          "type": "object",
          "description": "PKG graph ingestion settings",
          "properties": {
            "parser": {
              "type": "string",
              "default": "tree-sitter",
              "description": "AST parser engine for graph extraction."
            }
          },
          "additionalProperties": false
        }
      },
      "additionalProperties": false
    }
  },
  "required": ["global", "agents", "retrieval"],
  "additionalProperties": false
}
```

---

## 2. Configuration Merge Strategy

Rocketship supports layered configuration, merging values from:

1. **Built-in Defaults**  
   - Hard-coded in the extension and JSON Schema `default` fields.
2. **User Settings** (`$HOME/.config/Code/User/rocketship.yaml`)  
   - Overrides built-in defaults.
3. **Workspace Settings** (`.vscode/rocketship.yaml` in workspace root)  
   - Overrides User Settings.
4. **Folder Settings** (multi-root folder-specific `rocketship.yaml`)  
   - Overrides Workspace Settings for that folder.

> **Error Handling:** On load, the `ConfigService` validates against the JSON Schema:
> - Missing required sections → throws `ConfigValidationError`.
> - Invalid types or values → lists all errors with `path` and `message`, and falls back to nearest valid ancestor (e.g., drop invalid field, retain defaults).

---

## 3. Sample Configs & Templates

### 3.1 M1 MacBook Pro (16GB RAM) Minimal Setup

```yaml
global:
  modelProvider: "local"
  maxConcurrentAgents: 2
  requestTimeoutMs: 90000

agents:
  PlannerAgent:
    maxConcurrent: 1
    requestTimeoutMs: 60000
  CoderAgent:
    maxConcurrent: 2

retrieval:
  vector:
    chunkSize: 256
    overlap: 128
  graph:
    parser: "tree-sitter"
```

### 3.2 Linux Server (32GB RAM, HF & Ollama Hybrid)

```yaml
global:
  modelProvider: "hf"
  maxConcurrentAgents: 4
  requestTimeoutMs: 120000
  enableTelemetry: false

agents:
  PlannerAgent:
    modelProvider: "ollama"
  CoderAgent:
    modelProvider: "hf"
    maxConcurrent: 3
  TesterAgent:
    enabled: false

retrieval:
  vector:
    chunkSize: 512
    overlap: 256
  graph:
    parser: "custom-swift-parser"
```

> **Tip:** Copy one of these templates into your workspace `.vscode/rocketship.yaml` and adjust values as needed.