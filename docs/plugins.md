# Plugin & Extension Development Guide

> **Terminology Note:** For definitions of agents, services, and plugins, see the [Rocketship Glossary](glossary.md).

This guide explains how to develop, register, and maintain plugins and extensions for Rocketship. It covers plugin types, lifecycle, security, best practices, and testing requirements.

---

## 1. Plugin Types

Rocketship supports several plugin types:

- **Agent Plugins:** Implement new agent types or extend existing ones. See [agents.md](agents.md).
- **Workflow Plugins:** Define custom workflow templates or step types.
- **UI Plugins:** Add new webviews, dashboards, or command palette actions.

All plugins must be registered in `rocketship.yaml` and follow the documented lifecycle.

---

## 2. Plugin Lifecycle & Registration

- **Discovery:** Plugins are discovered at startup by scanning `rocketship.yaml`.
- **Validation:** Each plugin must declare its type, capabilities, and dependencies. Rocketship validates plugins before activation.
- **Activation:** Plugins are loaded and injected via the PluginManager. Use dependency injection (see [architecture.md](architecture.md)) for service access.
- **Hot-Reload:** Plugins are reloaded on config changes or file updates.

**Example plugin registration in `rocketship.yaml`:**
```yaml
plugins:
  myCustomAgent:
    type: agent
    entry: ./plugins/myCustomAgent/index.js
    enabled: true
  myWorkflow:
    type: workflow
    entry: ./plugins/myWorkflow/index.js
    enabled: true
```

---

## 3. Security & Best Practices

- **Isolation:** Run plugins in a sandboxed context. Avoid direct file system or network access unless explicitly permitted.
- **Validation:** Validate all plugin inputs/outputs using Rocketship's schema validation (Ajv/Zod).
- **Secrets:** Never hardcode secrets. Use VS Code SecretStorage APIs.
- **Versioning:** Follow SemVer for plugin APIs. Mark deprecated APIs and provide migration guides.
- **Telemetry:** Respect user telemetry settings. Emit only anonymized, opt-in metrics.
- **Testing:** Provide unit and integration tests for all plugin logic. Use mocks for external dependencies.
- **Documentation:** Document all public APIs and configuration options. Reference the [glossary](glossary.md) for terminology.

---

## 4. Plugin Author Checklist

- [ ] Register plugin in `rocketship.yaml` with correct type and entry point
- [ ] Validate all inputs/outputs with schemas
- [ ] Avoid direct access to secrets or sensitive data
- [ ] Provide tests (unit/integration)
- [ ] Document all APIs and config options
- [ ] Respect user telemetry and security settings
- [ ] Follow naming conventions and reference the [glossary](glossary.md)

---

## 5. Further Reading

- [Agents & API](agents.md)
- [Architecture](architecture.md)
- [Configuration](configuration.md)
- [Security & Compliance](security.md)
- [Testing & QA](testing.md)
- [Glossary](glossary.md)