# Changelog

## [Unreleased]
- Removed deprecated `vscode` and `@types/chokidar` from devDependencies in `extension/package.json`.
- Added `@types/vscode` for type support and `@vscode/test-electron` for testing in VS Code extensions.
- Ran a clean install to restore missing LanceDB types and dist files.
- Resolved all npm audit vulnerabilities as of this update.
- Documentation consistency updates: all docs now reference pnpm and Vitest only, removed all references to npm, yarn, and Jest, clarified coverage instructions, and updated troubleshooting and onboarding steps for the current stack.
### Test Status Update
- Migrated all tests to **Vitest**.
- Some contract (Pact) and integration (Testcontainers) tests are currently failing due to mock server and container runtime issues.
- See `docs/testing.md` and `docs/onboarding.md` for troubleshooting and requirements.
- Remediation of contract/integration test setup is planned in the next batch.
### Test Infrastructure Improvements
- Pact contract tests now use dynamic ports to avoid port conflicts.
- Integration tests (Testcontainers) are skipped with a warning if Docker/Testcontainers is not available.
- Some contract tests are placeholders and will be implemented in future batches (marked with TODOs).
- Documentation updated in `docs/testing.md` and `docs/onboarding.md` to reflect these changes and troubleshooting steps.
### Core Logic Improvements
- Removed duplicate circuit breaker logic (`CircuitBreakerFactory.ts`); all circuit breaker usage is now unified in `helpers/circuitBreaker.ts`.
- `OrchestratorService` now fully implements best-practice circuit breaker and schema validation integration for agent execution.
### Validation & Telemetry Improvements
- Schema validation is now performed for all agent outputs with available schemas: PlannerAgent, ScaffolderAgent, MonitorAgent, DebuggerAgent, and CriticAgent.
- Telemetry is emitted for both validation success and failure for these agents.
### Adaptive RAG Pipeline
- Implemented adaptive RAG pipeline: file watching with chokidar, chunking (chunkFile), embedding (embedFile), LanceDB upsert, adaptive retrieval, deduplication, and telemetry.
- TODOs: Replace line-based chunking with token-based chunking; integrate a real embedding model for production use.
### Prompt Governance
- Implemented prompt governance: prompt templates in `extension/src/prompts/`, version/timestamp headers, handlebars-lint in CI, and telemetry on prompt load.
- PHASE 2 review: Adaptive RAG pipeline and prompt governance reviewed; TODOs for token-based chunking, real embedding model, prompt load telemetry, and full agent prompt coverage added to code and docs.
- PHASE 3 review: Sandboxing, advanced telemetry, and integration test hardening reviewed; TODOs for sandboxing, dynamic port allocation, skip logic, and metrics endpoint added to code and docs; all marked for final mass refactor.

## [Final Mass Refactor Strategy]

The final mass refactor will ensure Rocketship is fully coherent, streamlined, and aligned with the latest tech stack and best practices. This refactor will:

- **Scope:**
  - Cover all code, tests, documentation, CI/CD workflows, and configuration files.
  - Eliminate all legacy, dead, or deprecated code and patterns (e.g., old test frameworks, unused scripts, outdated configs).
  - Unify and clarify project structure, imports, and dependency management (Nx, pnpm, Vitest, etc.).
  - Ensure all features, agents, and plugins use the current stack: Nx, pnpm, Vitest, Opossum (circuit breaking), Ajv (schema validation), LanceDB (vector store), chokidar (file watching), handlebars-lint (prompt governance), and related tools.
  - Complete all outstanding TODOs and technical debt, as tracked in code and documentation.
  - Finalize prompt governance: all agent/system prompts as versioned Handlebars `.tpl` files, linted in CI, with telemetry on load.
  - Implement or finalize advanced telemetry: event dispatch, `/metrics` endpoint, OpenTelemetry/prom-client integration.
  - Harden all integration tests: dynamic port allocation, robust skip logic for Docker/Testcontainers, and clear test status reporting.
  - Ensure sandboxing/isolation for all agent and plugin execution (VM, process, or container isolation as appropriate).
  - Update and unify all documentation for consistency, accuracy, and onboarding clarity.

- **Goal:**
  - Deliver a maintainable, extensible, and production-ready monorepo, with clear documentation and robust, modern developer experience.
  - All TODOs marked for the final mass refactor should reference this section.

## [Canonical Directory Structure & Refactor Principles]

This section documents the canonical directory structure and guiding principles for the Rocketship monorepo. All current and future refactors should adhere to this structure and these best practices:

### Directory Structure (2024+)
- `extension/` — VS Code extension (agents, services, plugins, prompts, helpers, etc.)
- `cli/` — CLI companion
- `packages/core/` — Core logic, helpers, schemas, tests
- `shared/` — Shared types, schemas, utilities
- `docs/` — Documentation (modular, up-to-date)
- `tests/` — (Legacy, to be removed if not needed)
- `ai-ml/`, `backend/`, `frontend/` — Stubs or future expansion
- `infrastructure/` — Docker, Helm, K8s (for IaC and deployment)
- `observability/` — Dashboards and monitoring assets
- `scripts/` — Automation scripts (remove if empty)
- Configs: `nx.json`, `pnpm-workspace.yaml`, `tsconfig.*`, etc.

### Principles
- **DRY (Don't Repeat Yourself):** No duplicate code, config, or docs.
- **YAGNI (You Aren't Gonna Need It):** Remove unused abstractions, dead code, and speculative features.
- **Single Responsibility:** Each file/module has a clear, focused purpose.
- **Explicit Imports/Exports:** No ambiguous or circular dependencies.
- **Consistent Naming/Structure:** Follow conventions for file, directory, and symbol names.
- **Modern Monorepo Practices:** Nx, pnpm, Vitest, modular shared code, and clear domain boundaries.
- **Documentation:** All changes and structure decisions are documented here and in relevant docs.

> Reference this section in all major TODOs and documentation for future refactors.

- Mass refactor: Centralized and standardized shared logic, removed unused/placeholder helpers and services, cleaned up prompt templates, and removed placeholder/non-actionable tests. Codebase now fully adheres to the canonical structure and refactor principles.