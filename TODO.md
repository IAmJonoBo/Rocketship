# 🚧 Rocketship Central TODO List

> **For context, implementation phases, and rationale, see also:**
> - [docs/roadmap.md](docs/roadmap.md)
> - [Feature_Enhancements.md](Feature_Enhancements.md)

This file is the actionable, up-to-date checklist for all outstanding work in the Rocketship project. Each TODO references the relevant section in [docs/roadmap.md](docs/roadmap.md). Update this file and the roadmap together after every major batch of changes.

---

## How to Use This File
- Check off items as you complete them, and update the roadmap accordingly.
- For detailed context, dependencies, and quality gates, see the referenced roadmap section.
- Add new TODOs here and in the roadmap as the project evolves.

---

## Phase 1: Codebase Stabilisation & Structure ([roadmap](docs/roadmap.md#phase-1-codebase-stabilisation--structure))
- [ ] Confirm all shared types, helpers, and schemas are centralized and DRY
- [ ] Add/expand API docs for all services (Orchestrator, Retrieval, etc.)
- [ ] Lint, DRY, and ESM compliance; docs review

## Phase 2: Test & Schema Integration ([roadmap](docs/roadmap.md#phase-2-test--schema-integration))
- [ ] Scaffold minimal unit and contract test files for each agent/service
- [ ] Refactor contract tests to use dynamic ports
- [ ] Implement real agent calls in contract tests
- [ ] Ensure integration tests skip gracefully if Docker/Testcontainers is unavailable
- [ ] Scaffold or update JSON schema files for each agent's output
- [ ] Integrate schema validation in each agent's `execute` method (Ajv)
- [ ] Emit telemetry for validation success/failure
- [ ] Expand `docs/testing.md` with test strategies, troubleshooting, and coverage reporting
- [ ] Achieve ≥80% test coverage, schema validation, contract test pass

## Phase 3: Prompt Governance & RAG Foundation ([roadmap](docs/roadmap.md#phase-3-prompt-governance--rag-foundation))
- [ ] Scaffold minimal `.tpl` prompt templates for all agents (with version/timestamp headers and TODOs)
- [ ] Lint prompt templates in CI (`.github/workflows/prompt-lint.yml`)
- [ ] Emit telemetry on prompt load/version
- [ ] Scaffold/implement token-based chunking and real embedding model in RAG pipeline
- [ ] Emit telemetry for RAG ingestion, retrieval, deduplication
- [ ] Expand `docs/prompts.md` and RAG sections in `docs/architecture.md`
- [ ] Ensure prompt lint, RAG telemetry, prompt versioning

## Phase 4: CI/CD, Observability, Security ([roadmap](docs/roadmap.md#phase-4-cicd-observability-security))
- [ ] Ensure all CI workflows (lint, test, prompt-lint, build) are green and block on failure
- [ ] Integrate code coverage reporting and enforce thresholds
- [ ] Populate `observability/dashboards/` with per-agent Grafana JSON and alert rules
- [ ] Expose Prometheus `/metrics` endpoint
- [ ] Add/expand `docs/observability.md` and `docs/ci-cd.md`
- [ ] Add/expand `docs/security.md` for secret management, input validation, and compliance
- [ ] CI green, SAST/DAST pass, dashboards live
- [ ] Instrument all core services and agents with OpenTelemetry
- [ ] Build minimal dashboard (VS Code webview or web UI) for real-time monitoring

## Phase 4.5: Disaster Recovery Drills & Automated Failover Tests ([roadmap](docs/roadmap.md#phase-45-disaster-recovery-drills--automated-failover-tests))
- [ ] Automate regular backups for LanceDB (vector DB) and audit logs
- [ ] Scaffold and schedule restore/failover drills for LanceDB and audit logs
- [ ] Implement health check scripts for vector DB and audit log integrity
- [ ] Add CI workflow (.github/workflows/dr-drill.yml) to run DR drills on schedule
- [ ] Emit telemetry and alert on drill failures
- [ ] Document DR procedures and runbooks in docs/disaster-recovery.md
- [ ] Integrate DR status into observability dashboards

## Phase 4.6: Resilience, Self-Healing, and Continuous Learning ([roadmap](docs/roadmap.md#phase-46-resilience-self-healing-and-continuous-learning))
- [ ] Scaffold and implement SupervisorService (singleton, global fallback, snapshot/rollback, config-driven)
- [ ] Integrate crash reporting (AIER agent, error_reports table, human-reviewed fix scripts)
- [ ] Add agent-level defensive middleware/interceptors, with per-agent config in rocketship.yaml
- [ ] Register DuckDuckGo tool (global, agent-scoped, Redis cache, rate limits, fallback providers)
- [ ] Scaffold TrainerAgent (nightly/manual, curated sources, vector store namespace)
- [ ] Implement ReflexionAgent prompt update proposal and lessons storage in LanceDB
- [ ] Add config stubs for caching, rate-limits, and search providers (global + per-tool)
- [ ] Instrument all resilience/self-healing events with OpenTelemetry and expose in dashboards
- [ ] Create and maintain docs/resilience.md for all resilience/self-healing patterns

## Phase 5: Advanced Services & Plugin Extensibility ([roadmap](docs/roadmap.md#phase-5-advanced-services--plugin-extensibility))
- [ ] Scaffold and implement ModelAdvisor, BanditController, PKGService, LoRAAdapterService
- [ ] Document and test plugin lifecycle and extension points
- [ ] Add advanced agent/service extension points for v2+
- [ ] Expand `docs/plugins.md` with lifecycle, DI, and security
- [ ] Plugin tests, doc coverage, extension point validation
- [ ] Refactor OrchestratorService to graph/state-machine model; define agent roles (Planner, Critic, Executor, ReflectionAgent)
- [ ] Implement message-passing and task queueing natively
- [ ] Integrate lightweight, embeddable knowledge graph (TypeScript-native or adapter)
- [ ] Refactor ToolRegistry for runtime registration, discovery, and removal; integrate Opossum
- [ ] Add CriticAgent, ReflectionAgent, and feedback logging
- [ ] Require agent outputs to include rationale and decision trace
- [ ] Log all actions, tool invocations, and errors to central audit log
- [ ] Implement HITL checkpoints as middleware

## Phase 6: Ongoing Maintenance & Review ([roadmap](docs/roadmap.md#phase-6-ongoing-maintenance--review))
- [ ] Regularly review and update all documentation and TODOs
- [ ] Track all TODOs in this file and the roadmap
- [ ] Encourage contributors to update docs as part of every PR
- [ ] Schedule periodic recursive reviews of all documentation
- [ ] Onboard new contributors with up-to-date guides and roadmap references
- [ ] Recurring reviews, docs sync, onboarding feedback
- [ ] Maintain and update the Integration & Technical Plan as new research emerges