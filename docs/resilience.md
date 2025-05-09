# Resilience, Self-Healing, and Continuous Learning

> **For actionable tasks and implementation phases, see:**
> - [docs/roadmap.md](roadmap.md#phase-46-resilience-self-healing-and-continuous-learning)
> - [TODO.md](../TODO.md)
> - [docs/architecture.md](architecture.md)

This document describes Rocketship's advanced resilience, self-healing, and continuous learning architecture and patterns. It covers global orchestration, agent-level defense, crash reporting, live research, self-training, and observability.

---

## 1. SupervisorService & Fallback Hierarchy
- Singleton service for global orchestration, retries, backoff, and fallback.
- Hierarchical fallback: FallbackAgent → human prompt → external webhook (configurable in rocketship.yaml).
- Periodic state snapshots and rollback using SQLite-based StateStore.

## 2. Crash Reporting & Auto-Resolution
- AIER agent (Raygun or in-house GPT) classifies errors, suggests fixes, and stores reports in SQLite (error_reports table).
- FixGenerator sub-agent proposes scripts/commands for human review (auto-execute optional).

## 3. Agent Defensive Middleware
- All agents wrapped with middleware/interceptors for retries, schema validation, and defensive checks.
- Per-agent defense settings in rocketship.yaml (e.g., retries, schemaValidation).

## 4. Web Search Integration
- DuckDuckGo tool registered globally, agent-scoped, with Redis caching and rate limits.
- Fallback search providers supported (configurable chain).

## 5. TrainerAgent & Continuous Self-Training
- TrainerAgent runs nightly and on-demand, ingesting curated best-practice sources (training.sources.json).
- Embeddings stored in LanceDB under a dedicated namespace.
- Agents can propose new sources, subject to human approval.

## 6. ReflexionAgent & Meta-Learning
- ReflexionAgent proposes prompt updates for human review.
- Lessons and fine-tuning data stored in LanceDB, surfaced as prompt augmentations.

## 7. Performance, Caching, and Rate-Limits
- Heavy tasks offloaded to Electron UtilityProcess, with extension points for microservices.
- Global and per-tool caching/rate-limits (Redis, Prometheus metrics, config in rocketship.yaml).

## 8. Observability
- All resilience/self-healing events instrumented with OpenTelemetry.
- Metrics and traces exposed via Prometheus and visualized in Grafana dashboards.

## 9. Configuration
- All features are configurable in rocketship.yaml (supervisor, agent defense, search providers, caching, rate-limits).
- See config stubs and examples in the repo.

---

## On-Demand Model Loading & Resilience (2024)

Rocketship's resilience layer now includes:

- **SupervisorService**: Singleton with sub-managers for models and adapters (lifecycle, TTL, health).
- **ModelRouter**: Structured ModelStatus responses, async load, whileLoading config.
- **CacheBackend**: Redis/in-memory/NVMe, pluggable eviction policy.
- **API Endpoints**: `/models/load`, `/models/unload`, `/models/status` with token-based auth.
- **MetricsService**: Per-model/global Prometheus metrics, config-driven alerts.
- **HybridActivationCache**: UtilityProcess-scoped, agent-accessible.
- **Device Placement**: Auto-detect or override in config.

See `architecture.md` for diagrams and config examples.

### References
- `extension/src/services/SupervisorService.ts`
- `extension/src/services/ModelRouter.ts`
- `extension/src/services/CacheBackend.ts`
- `extension/src/services/ApiServer.ts`
- `extension/src/services/MetricsService.ts`
- `extension/src/services/HybridActivationCache.ts`
- `rocketship.yaml`