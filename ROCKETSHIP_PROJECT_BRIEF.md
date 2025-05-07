# Rocketship: Project & Technical Specification

---

## Table of Contents
- [Rocketship: Project \& Technical Specification](#rocketship-project--technical-specification)
  - [Table of Contents](#table-of-contents)
  - [Service Boundaries \& Architecture](#service-boundaries--architecture)
    - [High-Level Diagram](#high-level-diagram)
    - [Service Responsibilities](#service-responsibilities)
  - [VS Code Activation Strategy](#vs-code-activation-strategy)
  - [Feature Staging \& Versioning Roadmap](#feature-staging--versioning-roadmap)
    - [v1 MVP Features](#v1-mvp-features)
    - [v2+ Advanced Features (Behind Feature Toggles)](#v2-advanced-features-behind-feature-toggles)
    - [Feature Toggles \& Milestones](#feature-toggles--milestones)
  - [Executive Summary](#executive-summary)
  - [Implementation Guidance \& Best Practices](#implementation-guidance--best-practices)
    - [1. Project Vision \& Priorities](#1-project-vision--priorities)
    - [2. Architecture \& Technology Choices](#2-architecture--technology-choices)
    - [3. Agent \& Service Design](#3-agent--service-design)
    - [4. Configuration \& Extensibility](#4-configuration--extensibility)
    - [5. Security \& Compliance](#5-security--compliance)
    - [6. Metrics, Telemetry, and Observability](#6-metrics-telemetry-and-observability)
    - [7. Testing \& Quality Assurance](#7-testing--quality-assurance)
    - [8. User Experience \& UI](#8-user-experience--ui)
    - [9. CI/CD \& Release Management](#9-cicd--release-management)
    - [10. Collaboration \& Contribution](#10-collaboration--contribution)
    - [Important Guidance](#important-guidance)
  - [Advanced Implementation Guidance \& Operational Best Practices](#advanced-implementation-guidance--operational-best-practices)
    - [1. Performance, Scalability, and Resource Constraints](#1-performance-scalability-and-resource-constraints)
    - [2. Error Handling, Recovery, and Support](#2-error-handling-recovery-and-support)
    - [3. Security, Privacy, and Compliance](#3-security-privacy-and-compliance)
    - [4. Extensibility, Upgrades, and Backward Compatibility](#4-extensibility-upgrades-and-backward-compatibility)
    - [5. Documentation, Onboarding, and Training](#5-documentation-onboarding-and-training)
    - [6. Internationalization and Accessibility](#6-internationalization-and-accessibility)
    - [7. AI/LLM Model Management](#7-aillm-model-management)
    - [8. Data Retention, Export, and Portability](#8-data-retention-export-and-portability)
    - [9. Open Source Community and Governance](#9-open-source-community-and-governance)
  - [Project Overview](#project-overview)
  - [Core Objectives \& Scope](#core-objectives--scope)
  - [Key Functional Components](#key-functional-components)
    - [Agents](#agents)
    - [Core Services](#core-services)
      - [Rich Webview Dashboards](#rich-webview-dashboards)
    - [Intelligent Model Advisor \& Orchestration](#intelligent-model-advisor--orchestration)
      - [1. System Introspection](#1-system-introspection)
      - [2. Model Card Integration](#2-model-card-integration)
      - [3. Quantization Advisor](#3-quantization-advisor)
      - [4. Recommendation Engine](#4-recommendation-engine)
      - [5. Ollama / LM Studio Integration](#5-ollama--lm-studio-integration)
      - [6. UI \& Configuration](#6-ui--configuration)
      - [7. Implementation Hints](#7-implementation-hints)
    - [Advanced Intelligence, Adaptivity \& Plugin Architecture](#advanced-intelligence-adaptivity--plugin-architecture)
      - [1. Programming Knowledge Graph–Augmented Retrieval (PKG)](#1-programming-knowledge-graphaugmented-retrieval-pkg)
      - [2. Iterative KG-RAG (Think-on-Graph 2.0)](#2-iterative-kg-rag-think-on-graph-20)
      - [3. On-The-Fly Codebase-Specific Fine-Tuning (LoRA)](#3-on-the-fly-codebase-specific-fine-tuning-lora)
      - [4. Dynamic Model Selection via Contextual Bandits](#4-dynamic-model-selection-via-contextual-bandits)
      - [5. Multi-Session Long-Term Memory](#5-multi-session-long-term-memory)
      - [6. Meta-Agent Self-Reflection (Reflexion Pattern)](#6-meta-agent-self-reflection-reflexion-pattern)
      - [7. Plugin-First, Telemetry-Driven, and Feature-Toggled](#7-plugin-first-telemetry-driven-and-feature-toggled)
  - [Configuration \& Validation](#configuration--validation)
    - [Schema Structure](#schema-structure)
      - [Example Configuration Schema (YAML)](#example-configuration-schema-yaml)
      - [TypeScript Config Interface (Excerpt)](#typescript-config-interface-excerpt)
    - [Validation Flow](#validation-flow)
  - [Metrics \& Observability](#metrics--observability)
    - [MetricsService Architecture](#metricsservice-architecture)
      - [Example Metrics API](#example-metrics-api)
      - [Example Metrics Configuration](#example-metrics-configuration)
    - [Enhanced Telemetry \& Benchmarking](#enhanced-telemetry--benchmarking)
  - [Extensibility \& Modularity](#extensibility--modularity)
    - [Plugin Lifecycle \& Dependency Injection](#plugin-lifecycle--dependency-injection)
    - [Testing \& Quality Assurance](#testing--quality-assurance)
  - [Documentation \& Developer Experience](#documentation--developer-experience)
  - [CI/CD \& Deployment](#cicd--deployment)
  - [Model Routing \& Backend Support](#model-routing--backend-support)
    - [ModelRouter Architecture](#modelrouter-architecture)
      - [Example Model Config (Excerpt)](#example-model-config-excerpt)
      - [ModelRouter API (Simplified)](#modelrouter-api-simplified)
      - [Resource Constraints \& Failover](#resource-constraints--failover)
      - [Vector Store \& RAG Integration](#vector-store--rag-integration)
  - [Workflow Orchestration \& Error Recovery](#workflow-orchestration--error-recovery)
    - [Orchestrator Role \& Workflow Structure](#orchestrator-role--workflow-structure)
      - [Example Workflow Step Schema](#example-workflow-step-schema)
      - [Example Workflow (YAML)](#example-workflow-yaml)
    - [Error Handling \& Recovery Strategies](#error-handling--recovery-strategies)
  - [UI Integration \& Developer Experience](#ui-integration--developer-experience)
      - [Example Command Registration](#example-command-registration)
  - [Feature Descriptions \& Workflows](#feature-descriptions--workflows)
    - [Automated Planning \& Execution](#automated-planning--execution)
    - [Code Generation \& Refactoring](#code-generation--refactoring)
    - [Code Review \& Critique](#code-review--critique)
    - [Automated Testing](#automated-testing)
    - [Scaffolding \& Bootstrapping](#scaffolding--bootstrapping)
    - [Deployment \& Monitoring](#deployment--monitoring)
      - [End-to-End Feature Delivery (Pseudocode)](#end-to-end-feature-delivery-pseudocode)
      - [Critic-Driven Feedback Loop (Pseudocode)](#critic-driven-feedback-loop-pseudocode)
  - [Security Architecture](#security-architecture)
    - [Licensing Safeguards](#licensing-safeguards)
    - [Guarded Execution Sandbox](#guarded-execution-sandbox)
  - [Plugin \& Extension System](#plugin--extension-system)
  - [Advanced Agent Internals](#advanced-agent-internals)
  - [Cross-Reference Index](#cross-reference-index)
- [End of Specification](#end-of-specification)
  - [Activation \& Resource Management](#activation--resource-management)
  - [Performance Profiling \& Concurrency Controls](#performance-profiling--concurrency-controls)
  - [UI/UX Streamlining](#uiux-streamlining)
  - [Code Quality \& Cleanup Automation](#code-quality--cleanup-automation)
  - [Extension Lifecycle Best Practices](#extension-lifecycle-best-practices)
  - [Integration \& Ecosystem Opportunities](#integration--ecosystem-opportunities)

## Service Boundaries & Architecture

Rocketship's architecture is designed for clear separation of concerns, maintainability, and extensibility. The following are the core services and their responsibilities:

### High-Level Diagram

```
Rocketship Extension
├── OrchestratorService
│   └── Sequences workflows, invokes agents, manages execution state
│   └── Sole authority for workflow progression and agent coordination
├── PluginManager
│   └── Discovers, loads/unloads, and manages lifecycle of optional plugins/features
│   └── Injects plugin capabilities into OrchestratorService and HybridRetrievalService as needed
├── HybridRetrievalService
│   └── Unified retrieval pipeline (vector + PKG)
│   └── Exposes retrieve(context) API; handles all code/context retrieval
├── MemoryService
│   └── Manages both session and persistent memory layers
│   └── Provides get/set/list/clearSession APIs for agent and workflow state
├── TelemetryService
│   └── Centralized event logging, metrics, and sampling
│   └── Pluggable backends (Prometheus, VS Code telemetry, etc.)
```

### Service Responsibilities

- **OrchestratorService**: The central control plane. Reads config, sequences workflows, invokes agents, and manages execution state. All workflow progression and agent coordination flow through this service. No other service should sequence agents or workflows.

- **PluginManager**: Handles dynamic discovery, loading, unloading, and lifecycle management of optional features and plugins. Injects plugin-provided capabilities into OrchestratorService and HybridRetrievalService as needed. Does not sequence workflows.

- **HybridRetrievalService**: Provides a unified retrieval pipeline, combining vector search and knowledge graph (PKG) retrieval. Exposes a single retrieve(context) API. Handles all code/context retrieval for agents and workflows. Standalone VectorStore/PKGService are deprecated in favor of this unified service.

- **MemoryService**: Manages both session (in-memory) and persistent (on-disk) memory. Provides a unified API for agents and workflows to store and retrieve state. Ensures clear TTLs and separation between transient and persistent data.

- **TelemetryService**: Centralized event logging, metrics collection, and adaptive sampling. All telemetry flows through this service, which supports pluggable backends (e.g., Prometheus, VS Code telemetry). No other service should implement its own telemetry pipeline.

This architecture ensures clear boundaries, reduces code duplication, and enables robust extensibility and maintainability.

## VS Code Activation Strategy

Rocketship uses a unified, predictable activation pattern for its VS Code extension to ensure reliability, performance, and maintainability:

- **Minimal activationEvents**: Only essential events are declared in `package.json`, such as `onCommand:rocketship.*`. Avoids over-activation and reduces extension host load.
- **Runtime guard in command handlers**: Each command handler checks for required configuration (e.g., `if (!hasConfig) return`) before proceeding. This prevents accidental activation in unconfigured workspaces.
- **No onView/onLanguage triggers**: Avoids implicit or accidental activation from unrelated VS Code events.
- **Rationale**: This approach ensures the extension is only activated when explicitly needed, reduces cold-start latency, and prevents resource waste. It also simplifies debugging and onboarding for new contributors.

**Example:**

```json
"activationEvents": [
  "onCommand:rocketship.plan",
  "onCommand:rocketship.code",
  "onCommand:rocketship.test"
]
```

And in each command handler:

```typescript
if (!hasRocketshipConfig()) {
  vscode.window.showWarningMessage("Rocketship is not configured in this workspace.");
  return;
}
// Proceed with command logic
```

This pattern is documented and enforced throughout the codebase and onboarding materials.

## Feature Staging & Versioning Roadmap

Rocketship development is organized into clear milestones, with a focus on delivering a robust MVP (v1) before layering on advanced features. Feature toggles are used to gate non-MVP capabilities, enabling safe, incremental rollout and testing.

### v1 MVP Features

- **Core Agents**: PlannerAgent, CoderAgent, TesterAgent
- **ModelRouter**: Basic model routing (local/cloud)
- **HybridRetrievalService**: Vector-only retrieval
- **MemoryService**: Session memory
- **Core UI Panels**: Plan, Code, Test, Diff preview
- **Config & Validation**: rocketship.yaml, schema validation
- **Minimal Telemetry**: Operation/event logging
- **Basic CLI Companion**: Headless plan/code/test

### v2+ Advanced Features (Behind Feature Toggles)

- **PKG (Programming Knowledge Graph) Retrieval**
- **LoRA On-the-Fly Fine-Tuning**
- **Bandit-Driven Adaptive Model Selection**
- **Reflexion Meta-Agent**
- **Long-Term Persistent Memory**
- **Advanced CI/CD & SOC 2 Readiness**
- **Plugin/Extension System**
- **Advanced Telemetry & A/B Testing**
- **Custom Workflow Templates**
- **Automated Plugin Vetting Pipeline**

### Feature Toggles & Milestones

- All advanced features are gated by explicit toggles in `rocketship.yaml` under the `features` section.
- Each milestone is tracked in the project roadmap and CHANGELOG.md.
- New features are enabled for a subset of users (A/B or canary) before general release.
- Deprecated features are marked in config/docs and removed in the next major version.

This staged approach ensures stability, rapid feedback, and safe adoption of new capabilities.

---

## Executive Summary

**Rocketship** is a self-hostable, multi-agent automation platform for VS Code. It orchestrates specialized AI agents to automate, refactor, and enhance software projects. Rocketship is designed for extensibility, robust validation, metrics-driven observability, and modern dependency injection. This document provides a comprehensive technical and architectural specification for developers, contributors, and stakeholders.

---

## Implementation Guidance & Best Practices

This section provides actionable guidance and best practices for implementers, addressing key architectural, security, testing, and collaboration questions. These recommendations are grounded in industry standards and current tooling landscapes, and should be referenced throughout the implementation process.

### 1. Project Vision & Priorities
- **MVP Scope:** Deliver end-to-end "Plan → Code → Test" automation within VS Code, including PlannerAgent, CoderAgent, TesterAgent, model routing, and basic UI checkpoints. Must-haves: planning, code generation, test orchestration, user-approval diff views. Nice-to-haves (v1+): deployment automation, security scanning, monitoring agents.
- **Primary User Stories:**
  - Automate code review for a PR (CriticAgent suggests fixes).
  - Generate & run tests for new features (TesterAgent writes/executes tests for plan steps).
  - Scaffold a new project (ScaffolderAgent creates REST API boilerplate).

### 2. Architecture & Technology Choices
- **Webview Framework:** Use any frontend (React, Vue, Svelte) over JSON-RPC postMessage; choose based on team expertise.
- **Vector Database:** LanceDB (embedded) or pgvector/Postgres for embeddings; avoid proprietary lock-in.
- **Cross-Platform:** Target VS Code Extension API (Windows, macOS, Linux); CI must test all OSes.
- **VS Code API Versioning:** Specify `engines.vscode` in package.json; validate with Extension Compatibility Lab.

### 3. Agent & Service Design
- **API Granularity:** Expose each agent via a single `execute(parameters)` method encapsulating its workflow; avoid chatty, fine-grained calls.
- **State & Memory:** Use context.workspaceState/globalState for ephemeral data; persist embeddings and plan artifacts in LanceDB/pgvector for long-term memory.
- **Plugin Lifecycle:** Discover agents/tools at startup via rocketship.yaml; support hot-reload on config change by watching the file system and reinitializing affected services.

### 4. Configuration & Extensibility
- **Config Precedence:** Merge VS Code settings and rocketship.yaml using VS Code's precedence (Default < User < Remote < Workspace < Folder); validate with Ajv/Zod on reload.
- **Plugin Discovery:** Register plugins (agents, workflows) via rocketship.yaml only; avoid marketplace-level dynamic installs for core agents. Third-party UI plugins may ship as separate VS Code extensions.
- **Secrets Management:** Use VS Code SecretStorage for API keys/tokens; access via vscode.SecretStorage API with user consent.

### 5. Security & Compliance
- **Prompt Injection:** Treat user code/comments as untrusted; segregate system/user prompts and sanitize before LLM calls.
- **Execution Sandboxing:** Run all shell commands in Docker containers with minimal capabilities; require explicit user confirmation for each command.
- **Licensing & Provenance:** Scan code blocks >20 lines with Copyleaks/Black Duck Polaris; prefer imports over pasted code when provenance is uncertain.

### 6. Metrics, Telemetry, and Observability
- **Critical Metrics:** Record latency, error rates per agent, token usage, human vs AI action counts, and workflow times.
- **Opt-in Telemetry:** Default to no external telemetry; allow opt-in via extension setting. Disable all telemetry in self-hosted/offline mode.
- **Visualization:** Expose Prometheus endpoint via lightweight HTTP server; recommend Grafana Cloud or on-prem Grafana for dashboards.

### 7. Testing & Quality Assurance
- **Coverage Targets:** Aim for 80–90% statement coverage, 70% branch coverage on core services; monitor trends, not just absolute numbers.
- **Security & SAST:** Integrate OWASP ZAP for webview payloads, Bandit for Python-based services; fail builds on high-severity findings and feed issues to CriticAgent for auto-fix.
- **Regression Benchmarks:** Automate HumanEval+ and MBPP in CI to detect regressions in codegen quality; track pass@k and token usage.

### 8. User Experience & UI
- **Key Flows:**
  - Planner view: graphical breakdown of plan steps.
  - Live diffs: preview CoderAgent changes with inline comments.
  - Human-in-loop checkpoints: QuickPick confirmation cards at major steps.
- **Headless/CI:** Support a --ci flag to skip webviews and run workflows in logs; use Xvfb/virtual framebuffers for headless testing.
- **Accessibility:** Adhere to WCAG in webviews (ARIA labels, keyboard nav, high-contrast themes) per VS Code guidelines.

### 9. CI/CD & Release Management
- **Release Cadence:** Use Semantic Versioning (SemVer 2.0.0) with MAJOR.MINOR.PATCH and Conventional Commits; bi-weekly minor releases, patch releases as needed.
- **Breaking Changes:** Use BREAKING CHANGE: in commit messages; bump MAJOR version; document in CHANGELOG.md.
- **Automation:** Use GitHub Actions for ci.yml (lint/tests), bench.yml (benchmarks), release.yml (publish VSIX/Docker), and smoke-tests.yml (headless activation).

### 10. Collaboration & Contribution
- **Contributor Workflow:** Enforce CONTRIBUTING.md: branch-per-feature, Conventional Commits, PR reviews, issue templates.
- **Protected Areas:** Lock core orchestration/security modules behind approver groups; allow community plugins in plugins/ directory.
- **ADR Process:** Maintain adr/ directory for Architectural Decision Records (per Michael Nygard) to log major design choices and non-goals.
- **Documentation:** Require TSDoc/JSDoc on public APIs, markdown docs for user guides, in-source examples; validate with markdownlint in CI.

### Important Guidance
- **MVP & Non-Goals:** v1 = Plan, Code, Test with user approval; no deployment/monitoring autonomy until v2.
- **Communication:** Use Slack/Teams + GitHub Discussions for blockers.
- **Decision Log:** Require ADRs for changes to core security/orchestration logic.
- **Deprecations:** Mark with @deprecated in TS and bump MINOR version.
- **Documentation:** All public methods/config options must have docstrings and example snippets in VS Code docs.

This roadmap balances rapid iteration with robust safety, observability, and extensibility, ensuring Rocketship delivers immediate value while laying a solid foundation for long-term growth.

---

## Advanced Implementation Guidance & Operational Best Practices

This section provides advanced, research-driven recommendations to ensure Rocketship is performant, resilient, secure, and community-driven. These practices should be referenced by all contributors and maintainers.

### 1. Performance, Scalability, and Resource Constraints
- **Latency Budgets:** Enforce strict latency budgets (e.g., 95th-percentile Plan → Code → Test under 2s); monitor in real time to catch regressions.
- **Resource Quotas:** Under heavy load or large workspaces, enforce configurable quotas on concurrent workflows and LLM instances to avoid blocking the extension host. Limit simultaneous LLM calls to prevent CPU/GPU saturation.
- **Auto-Configuration:** Detect available system resources at startup (GPU VRAM, CPU cores, RAM) and auto-configure model sizes (e.g., default to 7B model under 8GB RAM, 34B above 16GB) to optimize throughput and reduce OOM errors.

### 2. Error Handling, Recovery, and Support
- **Actionable Errors:** Design error messages to be concise, constructive, and actionable—inline near the relevant UI element, with clear instructions and a polite tone.
- **Partial Failures:** For partial workflow failures, apply configurable retry policies (e.g., up to 2 retries with exponential backoff), then escalate to the user via non-blocking notification or diff view. Do not abort silently.
- **Logging:** Log all failures to the audit log; surface only high-level status in the UI, directing users to detailed logs for diagnostics.

### 3. Security, Privacy, and Compliance
- **Privacy by Design:** Anonymize or pseudonymize logs, encrypt in transit and at rest, and retain only as long as needed (e.g., purge logs after 30 days by default, GDPR-compliant).
- **SOC 2 Readiness:** Implement continuous monitoring and audit logging of user actions and agent operations; document controls for at least 6 months for Type 2 readiness.
- **Secret Management:** Use VS Code's SecretStorage API for API keys, require user consent for telemetry (opt-in only), and enforce prompt sanitization to defend against injection attacks.

### 4. Extensibility, Upgrades, and Backward Compatibility
- **Semantic Versioning:** Apply SemVer for all public APIs (agents, workflows, plugins); document the public API surface in code and docs.
- **Deprecation Policy:** Mark APIs as deprecated in one minor release, remove in the next major, and provide migration guides and codemods where possible.
- **Dependency Upgrades:** For core dependency upgrades, use lock-step bumps with ADRs and CI smoke tests across all supported OSes.

### 5. Documentation, Onboarding, and Training
- **Interactive Quickstart:** Provide a sample Rocketship project and recorded walkthroughs; track doc coverage in CI (≥90% of public APIs) with markdownlint and link checking.
- **Guided Tours:** Integrate an in-UI guided tour (e.g., "First Run" wizard) highlighting major features and UI flows.
- **ADR Process:** Maintain a documented ADR process and a living "Definition of Done" checklist for each milestone.

### 6. Internationalization and Accessibility
- **Localization:** Localize all UI strings and settings using VS Code's l10n framework; include language bundles in package.nls.json.
- **Accessibility:** Test webviews with screen readers and keyboard navigation to meet WCAG standards; automate accessibility tests in CI with tools like axe-core.

### 7. AI/LLM Model Management
- **Model Registry:** Implement a pluggable Model Registry; each new LLM provider must be registered with metadata and benchmarked before activation.
- **Model Drift:** Monitor for model drift by sampling production outputs against a held-out validation set weekly; rollback if quality degrades beyond threshold.
- **Canary Releases:** Support canary releases with gradual traffic shifts (e.g., start at 10% of requests) when introducing a new model.

### 8. Data Retention, Export, and Portability
- **Retention Policies:** Vector embeddings older than 90 days are pruned; logs older than 30 days are archived or deleted. Use backup snapshots with a 3-2-1 rule (three copies, two media types, one offsite).
- **Export/Import:** Provide user-facing export/import commands to back up and restore vector stores and audit logs (e.g., via CLI `rocketship export-data --output=archive.zip`).

### 9. Open Source Community and Governance
- **Governance Model:** Choose and document a governance model (e.g., BDFL or Steering Committee) in GOVERNANCE.md.
- **Contributor Roles:** Establish clear CONTRIBUTING.md outlining roles (Maintainer, Contributor, Committer), code review process, and dispute resolution.
- **Code of Conduct:** Adopt a Code of Conduct (e.g., CNCF) and moderate via GitHub Discussions for transparency.

---

By applying these targeted enhancements—grounded in industry best practices, empirical guidance, and human-centered design principles—Rocketship will deliver a performant, resilient, secure, and community-driven multi-agent platform that maximizes developer productivity and trust.

---

## Project Overview

Rocketship leverages a modular, agent-oriented architecture. Each agent (Planner, Coder, Critic, Tester, Scaffolder, Deployer, Debugger, Monitor, DocsAgent, etc.) is responsible for a distinct aspect of the software development lifecycle. The platform is self-hostable, extensible, and integrates deeply with VS Code.

---

## Core Objectives & Scope
- **Agent-Based Automation:** Modular, domain-specific agents for planning, coding, testing, deployment, and more.
- **Self-Hostable & Extensible:** Local or private infrastructure, with clear extension points for new agents, models, and workflows.
- **Modern Validation & Configuration:** Ajv (JSON Schema) and Zod (type-safe) validation for all config and agent inputs.
- **Unified Metrics & Observability:** Centralized `MetricsService` for operation durations, error tracking, and custom metrics.
- **Dependency Injection:** All core services and agents instantiated via `tsyringe`-based DI.
- **Rich UI Integration:** VS Code webviews and panels for agent interaction, workflow visualization, and metrics.

---

## Key Functional Components

### Agents
- **PlannerAgent:** Decomposes requirements into actionable plans and workflows.
- **CoderAgent:** Generates and refactors code.
- **CriticAgent:** Reviews code, enforces standards, and suggests improvements via Reflexion-style self-checks.
- **TesterAgent:** Generates, runs, and analyzes tests (with integrated SAST).
- **ScaffolderAgent:** Bootstraps new projects, modules, or features.
- **DeployerAgent:** Handles deployment automation and environment setup.
- **DebuggerAgent:** Diagnoses and fixes runtime or build errors.
- **MonitorAgent:** Observes system health, performance, and workflow progress.
- **DocsAgent:** Fetches and injects live API documentation and usage examples to ground code generation and prevent hallucinated or outdated API usage.

Each agent is a singleton, instantiated via DI, receives core services as dependencies, and exposes a consistent API for execution, initialization, and reporting.

### Core Services
- **ModelRouter:** Abstracts access to all LLM backends (local, cloud, hybrid).
- **MetricsService:** Centralized metrics collection with Prometheus exporter.
- **PromptValidationService:** Validates all agent prompts and inputs against JSON schemas (Ajv/Zod) to enforce strict typing and prevent prompt injection or malformed API calls.
- **ValidationService:** Runtime and type-safe validation for config and workflows.
- **ProgressTracker:** Tracks the status and progress of long-running operations.
- **ErrorRecovery:** Implements retry, fallback, circuit-breaker, and rollback strategies.
- **VectorStore:** Manages embeddings for semantic search, code retrieval, and context augmentation.
- **WebviewPanel:** Main entry point for agent interaction and workflow visualization.

#### Rich Webview Dashboards
- Implement interactive dashboards using React or Vue within VS Code Webviews, enabling hot module reload (Fast Refresh) during development for rapid iteration.
- Use a type-safe JSON-RPC layer (postMessage with predefined schemas) between the extension host and the Webview to enforce contract validity and mitigate injection risks.
- Adhere to VS Code UX guidelines: activate Webviews contextually, follow native theming, and keep controls focused and lightweight to minimize resource overhead.

- **PlannerViewProvider:** Custom view for planning and tracking agent-generated workflows.
- **Metrics Dashboard:** Real-time metrics and health status for agents, models, and workflows.
- **Command Palette Integration:** Quick access to agent actions and workflow commands.

### Intelligent Model Advisor & Orchestration

Rocketship features an adaptive ModelAdvisorService and orchestration subsystem that dynamically selects, configures, and recommends the optimal LLM models and quantization settings for each agent role, based on real-time system introspection and external model metadata.

#### 1. System Introspection
- **Resource Detection:** At startup, Rocketship uses Node's os module to gather CPU count, total/free memory, and shells out to nvidia-smi or system_profiler for GPU VRAM. This forms a SystemProfile used for model selection.
- **Capability Profile:** Hardware is mapped to performance tiers (e.g., <8 GB RAM = "small", 8–16 GB = "medium", >16 GB = "large") and exposed to downstream services.

#### 2. Model Card Integration
- **Hugging Face Model Cards:** The advisor queries Hugging Face's HfApi to fetch ModelCardData (pipeline tags, parameter counts, eval metrics, license) for candidate models.
- **ArXiv & Papers with Code:** Extracts arxiv:<ID> tags and links to papers, optionally fetching citation and benchmark details to gauge model suitability for code or reasoning tasks.
- **Evaluation Dataset Results:** Reads model-index fields (e.g., pass@1 on HumanEval) to score models for code-generation and agent-specific tasks.

#### 3. Quantization Advisor
- **MLX Quantization Profiles:** Integrates MLX quantization (4-bit/8-bit) and community pre-quantized repos. Dynamically selects bitwidth/group size based on available memory and model size.
- **AutoMLX Integration:** Optionally benchmarks quantized models at startup to fine-tune bit settings for optimal tokens/sec throughput.

#### 4. Recommendation Engine
- **Scoring Function:** Computes a composite score for each candidate model:
  1. Performance (latency estimate)
  2. Quality (eval results)
  3. Resource Fit (memory thresholds)
- **Agent Typing:** Each agent (e.g., Coder, Debugger, Planner) is tagged with preferred pipeline tags and weighted metrics for model selection.

#### 5. Ollama / LM Studio Integration
- **Hot-Download Hooks:** UI surfaces a "Download & Load" button for recommended models, calling e.g. `ollama pull <modelId> --quantize <bits> --alias rocketship-selected`.
- **Fallback & Caching:** ModelCacheService caches downloaded models; on failure, falls back to next-best or cloud API.

#### 6. UI & Configuration
- **Model Advisor Panel:** WebviewDashboards include a "Model Advisor" tab showing:
  - Current system profile
  - Top 3 model+quantization picks per agent role, with expected latency and eval scores
  - Provider/version metadata for transparency
- **Progressive Disclosure:** Only the top suggestion is shown by default; power users can expand for a full ranked list.
- **Override & Persist:** Users can accept, override, or pin models in rocketship.yaml:

```yaml
modelAdvisor:
  autoSelect: true
  overrides:
    coder: "bigcode/starcoder-15B"
    debugger:
      model: "gpt-4"
      quantize: false
```

#### 7. Implementation Hints
- **ModelAdvisorService (TypeScript):**

```typescript
@singleton()
class ModelAdvisorService {
  constructor(
    private systemProfile: SystemProfile,
    private hfApi: HfApi,
    private vectorStore: VectorStore,
    private config: Config,
  ) {}
  async recommend(agentType: string): Promise<ModelRecommendation[]> {
    const models = await fetchCandidateModels(agentType);
    return models
      .map(m => scoreModel(m, this.systemProfile, agentType))
      .filter(m => m.fits)
      .sort((a,b) => b.score - a.score);
  }
}
```

- **Resource Probing Script (Node.js):**

```typescript
import os from "os";
import { exec } from "child_process";
const cpus = os.cpus().length;
const totalMem = os.totalmem();
exec("nvidia-smi --query-gpu=memory.total --format=csv,noheader", ...);
```

- **HF Metadata Fetch (Python helper):**

```python
from huggingface_hub import HfApi
api = HfApi()
info = api.model_info("bigcode/starcoder-15B")
card = info.cardData
```

- **Quantization Probe (MLX):**

```python
from mlx.nn import quantize
bits = 4 if system_profile.ram < 8e9 else 8
quantized_model = quantize(model_instance, group_size=64, bits=bits)
```

By embedding this ModelAdvisorService into Rocketship's ModelRouter and WebviewDashboards, Rocketship achieves a truly adaptive system that picks the right model (and quantization), maximizes performance on local hardware, maintains quality via HF benchmarks, and streamlines the developer experience with one-click infrastructure.

### Advanced Intelligence, Adaptivity & Plugin Architecture

Rocketship's architecture supports advanced, research-backed intelligence and adaptivity features, each encapsulated as an optional plugin and gated by telemetry-driven feature toggles. This ensures modularity, performance, and developer control.

#### 1. Programming Knowledge Graph–Augmented Retrieval (PKG)
- **PKGService:** On workspace load, parse the codebase (e.g., with tree-sitter or Joern) to build a property graph (nodes: functions, classes, files; edges: calls, inheritance, imports).
- **Graph Queries:** Expose Gremlin/GraphQL endpoints so agents can "find all implementations of X" or "retrieve callers of method Y" for fine-grained, structured retrieval.
- **Integration:** The ModelRouter's RAG stage can call PKGService.querySubgraph(symbol) before or after vector retrieval, pruning irrelevant context via structured filters.

#### 2. Iterative KG-RAG (Think-on-Graph 2.0)
- **HybridRetrievalModule:** Alternate PKGService.querySubgraph() and VectorStore.retrieveText() in each iteration (e.g., 2–3 cycles) so insights surfaced in one step guide the next.
- **Workflow:** Orchestrator calls GraphRetrieval → TextRetrieval → GraphRetrieval with new entities → final LLM call, enriching prompts with both structured and unstructured context.
- **Pseudocode:**

```typescript
let context = initialPrompt;
for (let i = 0; i < config.iterations; i++) {
  const subgraph = pkgService.query(context.entities);
  const docs    = vectorStore.retrieve(subgraph.snippets);
  context       = merge(context, subgraph, docs);
}
const answer = modelRouter.complete(context);
```

#### 3. On-The-Fly Codebase-Specific Fine-Tuning (LoRA)
- **LoRAAdapterService:** Extract recent commit diffs or code style samples, train rank-decomposition matrices (LoRA) on these snippets for 1–2 epochs.
- **Adapter Management:** Store each adapter as a few-MB artifact in `.rocketship/lora/<project>`, load/unload dynamically per workspace.
- **Pipeline:**
  1. On workspace open, detect `lora.enabled` flag.
  2. Fine-tune base model with local data:

```python
from loralib import LoRA
model = load_base_model()
adapter = LoRA(model, rank=config.rank)
adapter.train(local_code_snippets)
model.apply_adapter(adapter)
```

  3. Use adapted model for subsequent codegen tasks.

#### 4. Dynamic Model Selection via Contextual Bandits
- **BanditController:** Wrap model recommendations in a contextual bandit that treats each (agentType, modelId, quant) as an arm, using implicit feedback (user approvals, diff edits) as rewards.
- **Implementation:**

```typescript
class BanditController {
  selectArm(context) { /* e.g., Thompson sampling */ }
  update(arm, reward) { /* incorporate user feedback */ }
}
```

- **Feedback Signals:** Reward = +1 for "accepted diff" clicks, 0 for "manual override," −1 for "diff reverted."

#### 5. Multi-Session Long-Term Memory
- **MemoryService:** Combine a vector DB (LanceDB) with a lightweight relational store for metadata (e.g., preference: indentStyle=tab).
- **MemorySchema:**

```yaml
memories:
  - type: preference
    key: indent_style
    value: tabs
  - type: plan
    name: add-oauth
    steps: [...]
    timestamp: ...
```

- **Usage:** On new workflows, seed the PlannerAgent with "Previously you asked to use tabs" or "Last time you scaffolded XYZ" to maintain continuity.

#### 6. Meta-Agent Self-Reflection (Reflexion Pattern)
- **ReflexionAgent:** After each orchestrated run, prompt itself:
  1. "What went well?"
  2. "What failed or under-performed?"
  3. "How to improve retry policies or model choices?"
- **Policy Update:** Parsed "lessons learned" update BanditController priors, throttle parameters, or prompt templates for next runs.

#### 7. Plugin-First, Telemetry-Driven, and Feature-Toggled
- **Feature Toggles:** Gate each enhancement under `rocketship.yaml`:

```yaml
plugins:
  pkgRetrieval: true
  tog2: false
  lora: true
  bandits: true
  longTermMemory: false
  reflexion: true
```

- **A/B Testing & Telemetry:** Use MetricsService to track task success rate, latency, and error frequency per plugin. Roll out ToG-2 or LoRA behind percent-rollout flags, monitor impact before default enablement.

---

By integrating these orthogonal, research-backed enhancements—each encapsulated as an optional plugin—Rocketship can evolve into a truly intelligent, self-improving IDE assistant while maintaining performance, modularity, and developer control.

---

## Configuration & Validation

### Schema Structure
- Main config file: `rocketship.yaml` (see example below)
- Validated at startup and on reload using both Ajv (JSON Schema) and Zod (type-safe)

#### Example Configuration Schema (YAML)
```yaml
version: "1.0"

features:
  lora: false         # plugin
  bandits: false      # plugin
  reflexion: false    # plugin
  pkg: true           # core
  vector: true        # core

retrieval:
  kg: true
  vector: true

learning:
  lora: false
  bandits: false
  reflexion: false

memory:
  persistent: true
  session: true

agents:
  planner:
    enabled: true
    model: gpt-4
    maxTokens: 1024
    temperature: 0.5
  coder:
    enabled: true
    model: gpt-4
    maxTokens: 2048
    temperature: 0.7

telemetry:
  enabled: true
  backend: prometheus
  sampling: 0.1

security:
  inputValidation: true
  outputValidation: true
  maxTokens: 4096
  timeout: 60

metrics:
  enabled: true
  interval: 60
  retention: 86400
```

#### TypeScript Config Interface (Excerpt)
```typescript
export interface Config {
  version: string;
  models: {
    local: { enabled: boolean; models: string[]; maxTokens: number; temperature: number; };
    cloud: { enabled: boolean; provider: string; apiKey?: string; models: string[]; maxTokens: number; temperature: number; };
  };
  agents: {
    planner: { enabled: boolean; model: string; maxTokens: number; temperature: number; };
    coder: { enabled: boolean; model: string; maxTokens: number; temperature: number; };
  };
  security: { inputValidation: boolean; outputValidation: boolean; maxTokens: number; timeout: number; };
  metrics: { enabled: boolean; interval: number; retention: number; };
}
```

### Validation Flow
- Config is loaded and parsed (YAML → JSON)
- Validated with Ajv (JSON Schema) and Zod (type-safe)
- **Schema-Driven Prompt Validation:** Before dispatching to LLMs, all prompts are validated against defined JSON schemas to catch and sanitize unexpected or malicious patterns.
- Validation errors surface via VS Code notifications and logs.
- Hot-reloading of config and schemas on change.

---

## Metrics & Observability

### MetricsService Architecture
- Tracks operation durations, error rates, and success counts for all agents and services
- Records model usage (latency, tokens, errors)
- Tracks workflow steps, durations, and error patterns
- Exposes metrics in a Prometheus-compatible format

> **Retention & Alerts**: Configure Prometheus with `--storage.tsdb.retention.time=30d`. Include default Grafana alert rules for 95th‑percentile latency > 2 s or error‑rate > 5 %.

#### Example Metrics API
```typescript
metrics.recordOperationDuration("planner", "generate_plan", "success", duration);
metrics.recordOperationError("planner", "generate_plan", "error", error.message);
```

#### Example Metrics Configuration
```yaml
metrics:
  enabled: true
  interval: 60      # Collection interval in seconds
  retention: 86400  # Retention period in seconds
```

```yaml
# Prometheus configuration snippet
--storage.tsdb.retention.time=30d
```

### Enhanced Telemetry & Benchmarking
- Integrate `@vscode/extension-telemetry` for opt-in event reporting.
- Expose Prometheus-compatible metrics via a lightweight HTTP exporter.
- Automate CI & Regression Benchmarks: run HumanEval+, MBPP in CI; track pass@k, latency, and token usage over time; alert on regressions via Prometheus/Grafana.

---

## Extensibility & Modularity
- **Agent Plugins:** Implement the Agent interface, register with DI, and add to orchestrator.
- **Workflow Plugins:** Define and share custom workflow templates or step types.
- **UI Plugins:** Add new webviews, dashboards, or command palette actions via the UI plugin API.
- **Plugin Lifecycle:** Plugins are discovered, validated, and registered at startup; can declare dependencies, capabilities, and permissions

### Plugin Lifecycle & Dependency Injection
- Use `tsyringe` for decorator-based inversion of control: enable `emitDecoratorMetadata` and register each agent, tool, and context provider as injectable services.
- Adopt a "hub" architecture (inspired by Continue.dev) where models, rules, and prompts are published as pluggable blocks; dynamically discover and hot-reload plugins by scanning `rocketship.yaml` at startup.

---

### Testing & Quality Assurance
- **Jest** for unit/integration tests; **SWE-bench** for lifecycle benchmarks.
- **Security Tests:** Static analysis, fuzzing, OWASP ZAP, Bandit.
- **Integrated Linting & Formatting:** Run ESLint/Prettier (or equivalent) on generated code; surface errors inline and auto-fix before commit.
- **Security-First Code Scanning:** Include SAST tools in TestAgent workflow; block merges on high-severity findings and feed issues back to CriticAgent.
- **Licensing & Provenance Checks:** Scan large code blocks (>20 lines) with Copyleaks/Black Duck Polaris; recommend imports over pasting and log provenance metadata.
- Mocking & dependency injection for isolated testing
- All test inputs/outputs validated, with robust error reporting
- Automated fuzzing and static analysis integrated into the test suite

---

## Documentation & Developer Experience
- In-source documentation, markdown docs, and code comments
- Hot reloading for UI and config changes
- Tooltips and inline docs for agent actions and config options
- UI components are testable and support mock data for development

## CI/CD & Deployment
- **Branch Strategy**:
  - `main`: stable releases
  - `develop`: integration of features
  - `feature/*`: individual feature work
  - `hotfix/*`: urgent patches
- **GitHub Actions Workflows**:
  - `ci.yml`: lint, type‑check, Jest tests
  - `bench.yml`: run SWE‑bench and upload artifacts
  - `release.yml`: package VSIX and Docker images on tag, run smoke-tests, and deploy
  - `smoke-tests.yml`: headless VS Code activation and basic command invocation tests via `@vscode/test-electron`
- **Versioning**: Enforce **Semantic Versioning** and **Conventional Commits**, maintain `CHANGELOG.md` via [Keep a Changelog].
- **Containerization**: Provide `.devcontainer/devcontainer.json` for Docker/Podman development, and `docker-compose.yml` for optional local model servers and vector store.
- **Environment Management**: Use `.env` files and GitHub Secrets for sensitive configs; document required variables in `README.md`.
- **Automated Dependency Updates:** Integrate Dependabot or Renovate to automatically open PRs for outdated NPM, Python, or Docker dependencies, reducing security risks and keeping the codebase fresh.

---

## Model Routing & Backend Support

### ModelRouter Architecture
- Abstracts access to all language model backends (local, cloud, or hybrid)
- Unified API for agents/services to request completions, embeddings, or other model operations
- Supports multiple model providers (Ollama, LM Studio, OpenAI, Anthropic, etc.)
- Handles model initialization, health checks, and error recovery
- Tracks and reports model usage metrics

#### Example Model Config (Excerpt)
```yaml
models:
  local:
    enabled: true
    models: ["llama", "mistral"]
    maxTokens: 2048
    temperature: 0.7
  cloud:
    enabled: true
    provider: "openai"
    apiKey: "sk-..."
    models: ["gpt-4"]
    maxTokens: 4096
    temperature: 0.7
```

#### ModelRouter API (Simplified)
```typescript
export interface IModelRouter {
  routeRequest(request: ModelRequest): Promise<ModelResponse>;
  isInitialized(): boolean;
}
```

#### Resource Constraints & Failover
- Cap GPU/CPU memory per model instance (e.g., vLLM's `--max_gpu_memory_fraction`) and enable Ollama's `keep_alive` timeout to unload idle models.
- Implement a parameter-centric memory drop strategy to selectively unload inactive models under pressure; on failure, fallback to smaller local models or configured cloud APIs.

#### Vector Store & RAG Integration
- Embed LanceDB for on-disk vector storage of code, logs, and past interactions; offer pgvector as an optional Postgres extension.
- Auto-index workspace on load and on file saves by chunking files, generating embeddings, and upserting into the vector store.
- Before each model call, retrieve top-K relevant snippets to include in prompts, reducing hallucinations and improving local-model efficacy.

---

## Workflow Orchestration & Error Recovery

### Orchestrator Role & Workflow Structure
- Sequences agents, manages workflow execution, tracks progress, and handles errors
- Supports workflow templates and custom user-defined flows

#### Example Workflow Step Schema
```typescript
export interface WorkflowStep {
  id: string;
  agent: string;
  operation: string;
  parameters: Record<string, any>;
  dependsOn?: string[];
  onSuccess?: string[];
  onFailure?: string[];
}
```

#### Example Workflow (YAML)
```yaml
steps:
  - id: plan
    agent: planner
    operation: generatePlan
    parameters:
      task: "Add user authentication"
  - id: code
    agent: coder
    operation: implement
    parameters:
      planStep: plan
    dependsOn: [plan]
  - id: test
    agent: tester
    operation: generateTests
    parameters:
      codeStep: code
    dependsOn: [code]
```

### Error Handling & Recovery Strategies
- Retry, fallback, circuit-breaker, rollback
- All errors are captured with context and surfaced in the UI

- **Hallucination Mitigation:** Incorporate a Critic agent using self-reflection loops (Reflexion) and EVER-style real-time verification; perform retrieval-augmented fact-checking before executing changes.
- **Prompt Injection Defences:** Segregate system vs. user prompts (Structured Queries), sanitise inputs, and run a lightweight Prompt Auditor agent to reject or neutralise malicious patterns before LLM calls.

---

## UI Integration & Developer Experience
- Rich, interactive VS Code webviews and custom panels.
- **Interactive In-IDE Feedback Panels:** Live diff previews, test results, vulnerability warnings; inline approval/adjustment UI.
- **Human-in-the-Loop Checkpoints:** Pause workflows at key stages (post-plan, major refactor, pre-deploy) with QuickPick/InputBox summary cards for confirmation or edits.
- Visualization of agent workflows and plans
- Real-time display of metrics and progress
- Interactive forms for user input and configuration
- Error and status notifications
- Command palette integration for agent actions and workflow commands
- **Progressive Disclosure:** Gradually reveal advanced controls—show only primary actions ("Plan", "Code", "Test") by default, with expandable sections for agent internals, logs, and tuning sliders—reducing cognitive load for new users.
- **Automated Self-Diagnostics:** Implement a `rocketship.diagnose` command that runs checks for missing backends (e.g., Ollama server), invalid config, low resource warnings, and suggests remediation (e.g., "Install llama.cpp via Homebrew").
- **Agent "Dry Run" / Simulation Mode:** Allow invoking any workflow in "simulation" where agents generate plans, diffs, and logs without applying changes—ideal for onboarding, code review previews, and risk-free experimentation.

#### Example Command Registration
```typescript
context.subscriptions.push(
  vscode.commands.registerCommand("rocketship.showPlanner", () => {
    WebviewPanel.createOrShow(context.extensionUri);
  }),
);
```

---

## Feature Descriptions & Workflows

### Automated Planning & Execution
- User submits a requirement (e.g., "Add OAuth login")
- PlannerAgent generates a workflow plan
- Orchestrator sequences steps, invoking the appropriate agent for each
- ProgressTracker and MetricsService record status, results, and errors
- User receives real-time feedback and can intervene or adjust the plan

### Code Generation & Refactoring
- CoderAgent receives a plan step or direct prompt
- Validates input and context
- Uses ModelRouter to select the best LLM backend
- Generates or modifies code, then passes results to CriticAgent or TesterAgent

### Code Review & Critique
- CriticAgent receives code, runs static analysis, pattern checks, and LLM-based review
- Reports issues, suggestions, and metrics
- Can trigger rework by CoderAgent or escalate to user

### Automated Testing
- TesterAgent generates, runs, and analyzes tests for new or modified code
- Executes tests, collects results, and reports coverage and failures
- Can trigger fixes or escalate to user/other agents

### Scaffolding & Bootstrapping
- ScaffolderAgent creates new projects, modules, or features with best practices and templates
- Passes results to CoderAgent or CriticAgent for further refinement

### Deployment & Monitoring
- DeployerAgent handles environment setup, build, and deployment
- MonitorAgent tracks system health, workflow progress, and metrics
- Alerts or triggers recovery actions on failures

#### End-to-End Feature Delivery (Pseudocode)
```typescript
const plan = await plannerAgent.execute({ task: "Add OAuth login" });
for (const step of plan.steps) {
  try {
    const agent = agentRegistry.get(step.agent);
    const result = await agent.execute(step.parameters);
    progressTracker.update(step.id, "completed");
  } catch (error) {
    errorRecovery.handleError({ step, error });
    progressTracker.update(step.id, "failed");
  }
}
```

#### Critic-Driven Feedback Loop (Pseudocode)
```typescript
const codeResult = await coderAgent.execute(planStep);
const critique = await criticAgent.execute({ code: codeResult.code });
if (critique.issues.length > 0) {
  const fixed = await coderAgent.execute({ code: codeResult.code, feedback: critique.issues });
}
```

---

## Security Architecture
- Input/output validation at every workflow step and agent boundary
- Sandboxing and isolation for code execution, test runs, and deployments
- Secrets management via secure storage and SecretManager interface
- Audit logging of all agent actions, workflow steps, and user interventions

### Licensing Safeguards
- Integrate snippet-detection tools (Black Duck Polaris, Copyleaks) to flag large verbatim code blocks.
- Maintain originality checks via local grep or AI search; log provenance metadata.

### Guarded Execution Sandbox
- **Guarded Execution Sandbox:** Run all shell commands in Docker sandboxes with allow/deny lists and confirm-run policies to prevent dangerous operations.

- Automated fuzzing and static analysis integrated into the test suite

---

## Plugin & Extension System
- **Agent Plugins:** Implement the Agent interface, register with DI, and add to orchestrator
- **Workflow Plugins:** Define and share custom workflow templates or step types
- **UI Plugins:** Add new webviews, dashboards, or command palette actions
- **Plugin Lifecycle:** Plugins are discovered, validated, and registered at startup; can declare dependencies, capabilities, and permissions

---

## Advanced Agent Internals
- **State & Memory:** Agents can maintain internal state, persist across workflow steps, and use VectorStore for semantic memory
- **Context Management:** Agents receive and update context objects, enabling adaptive behavior
- **Learning & Adaptation:** Agents learn from feedback, metrics, and outcomes; future roadmap includes reinforcement learning
- **Multi-Agent Collaboration:** Agents can negotiate, delegate, or compete for tasks; orchestrator supports parallel, sequential, and conditional execution
- **VectorStore**
  > **Pruning & Backups**: Use **LanceDB** with a daily cron job to prune embeddings older than 90 days. Provide `scripts/backup_vector_store.sh` and `scripts/restore_vector_store.sh` for backup and recovery.

---

## Cross-Reference Index

| Section                                 | Description                                                      |
|-----------------------------------------|------------------------------------------------------------------|
| 1. Project Overview                     | High-level summary and goals                                     |
| 2. Core Objectives & Scope              | Key design principles and scope                                  |
| 3. Key Functional Components            | Agents, services, UI, and integration points                     |
| 4. Configuration & Validation           | Schema structure, loading, validation, error handling            |
| 5. Metrics & Observability              | MetricsService, tracked metrics, Prometheus integration          |
| 6. Extensibility & Modularity           | Plugins, agent extension, workflow templates                     |
| 7. Testing & Quality Assurance          | Test suite, mocking, validation, error handling                  |
| 8. Documentation & Developer Experience | In-source docs, markdown, code comments, onboarding              |
| 9. Model Routing & Backend Support      | ModelRouter, backend abstraction, routing logic                  |
| 10. Workflow Orchestration & Error Recovery | Orchestrator, workflow steps, error handling, progress tracking |
| 11. UI Integration & Developer Experience | Webviews, planner view, metrics dashboard, command registration |
| 12. Feature Descriptions & Workflows    | Detailed feature logic, agent workflows, inter-agent logic       |
| 13. Security Architecture               | Validation, sandboxing, secrets, audit, fuzzing                 |
| 14. Plugin & Extension System           | Agent, workflow, and UI plugins, lifecycle, security             |
| 15. Advanced Agent Internals            | State, memory, context, learning, multi-agent collaboration      |

---

# End of Specification

---

## Activation & Resource Management

- **Hybrid Activation Guards:** In `package.json` under `activationEvents`, combine specific events (e.g., `workspaceContains:**/rocketship.yaml`, `onCommand:rocketship.plan`) with lightweight always-on listeners registered in `activate()` that immediately guard on `workspaceState.hasRocketshipConfig`. (VS Code 1.74+ implicitly activates on any declared contribution, so purely gated events may be bypassed or missed.)
- **Lazy Initialization with Idle Prefetch:** In the extension's `activate()` function, register all commands synchronously. Inside each command handler, lazily instantiate heavy services (model cache, vector store). Schedule background prefetch of low-priority data on idle via `setTimeout(..., 0)` or the `onDidChangeWindowState` idle signal. (Deferring in activate() hides costly cold starts but avoids AsyncPackage unpredictability; idle prefetch amortises initialization without blocking first use.)
- **Disposable Management & Advanced Leak Detection:** Continue using `context.subscriptions` but also instrument periodic DevTools heap snapshots (Memory → Profiles → Heap snapshot) in developer docs. Employ `WeakRef` for any long-lived caches or backing stores. (Sole reliance on `context.subscriptions` misses closures holding contexts; heap snapshots pinpoint retained objects, and `WeakRef` prevents unintentional retention cycles.)

---

## Performance Profiling & Concurrency Controls

- **Native Profiling:** Update CONTRIBUTING.md and docs to direct developers to VS Code's "Show Running Extensions" view and built-in JS Profiler (Help → Toggle Developer Tools → Performance) rather than building a custom performance dashboard. (Native tools provide full CPU/heap insights without duplicating effort or exposing sensitive metrics.)
- **Adaptive Semaphore Throttling:** In ModelRouter, wrap LLM calls behind a dynamic semaphore (e.g., via the async-mutex package). Adjust the semaphore's maxConcurrency based on real-time CPU/RAM stats from Node's os module, and honour VS Code's CancellationToken to gracefully back off under load. (Static caps either underutilise resources or cause saturation; dynamic semaphores adapt to current load, preventing blockage and starvation.)
- **Inference Isolation:** Run heavyweight inference (local GGUF or cloud calls) in separate child processes or Web Workers managed by a ProcessPoolService. The main extension host retains only lightweight coordination logic. (The VS Code host isn't launched with --expose-gc, so manual GC hints (global.gc()) are unavailable and risky. Isolation contains memory spikes and allows the host to free its own heap naturally.)

---

## UI/UX Streamlining

- **Telemetry-Backed Progressive Disclosure:** In webview components, wrap advanced panels (Model Advisor, Diagnostics) behind a "Show Advanced" toggle. Instrument anonymized telemetry (via @vscode/extension-telemetry) capturing command usage and task completion times. Use A/B experiments to validate that hiding complexity benefits both novices and experts. (Progressive disclosure reduces cognitive load but must be validated by actual usage data to avoid frustrating power users.)
- **Hierarchical QuickPick Menus:** Replace single-stage QuickPicks listing all commands with a two-stage flow: first select a context category (e.g., "Diff Preview", "Diagnostics"), then present a curated list (< 100 items) filtered by file type or cursor context. (QuickPick performance degrades sharply beyond ~100 items; hierarchical filtering keeps interactions snappy (< 100 ms) and contextually relevant.)
- **Non-Blocking Self-Diagnostics:** Convert `rocketship.diagnose` from a blocking command into an idle-scheduled background check (e.g., every 5 minutes of inactivity). Surface summary results via a status bar icon with hover details, linking to a detailed Diagnostics panel only on demand. (On-demand diagnostics introduce noticeable pauses; proactive background checks keep UX fluid while still surfacing needed info.)

---

## Code Quality & Cleanup Automation

- **Workspace-Respectful On-Save Fixes:** In extension settings, detect `editor.formatOnSave` and `eslint.validate`. If neither is present, offer Rocketship's auto-fix as an opt-in recommendation. Otherwise, do not override existing configurations. (Unilateral on-save formatting can conflict with Prettier, Black, clang-format, etc., degrading trust. Respecting workspace preferences avoids such conflicts.)
- **EditorConfig & Pre-Commit Integration:** Provide sample `.pre-commit-config.yaml` including editorconfig-checker and common hooks. Document in README how to leverage existing pre-commit frameworks (Husky + lint-staged) for multi-language cleanup rather than building custom adapters. (Leveraging EditorConfig and pre-commit collaborates with community tooling, reducing maintenance and increasing reliability.)
- **Stable Diagnostic Annotations:** Use the stable `vscode.DiagnosticCollection` API to display lint/security issues in diff previews and inline editor markers. Avoid `vscode.proposed` APIs that risk breaking on patch releases. (Stability of the Diagnostic API ensures long-term maintainability and reduces breakage during VS Code upgrades.)

---

## Extension Lifecycle Best Practices

- **Command-Plus-Guard Activation:** In `package.json`, each Rocketship command entry under activationEvents should include a when clause checking `workspaceState.hasRocketshipConfig`. Example:

```json
"activationEvents": [
  "onCommand:rocketship.plan when workspaceState.hasRocketshipConfig"
]
```

(Combines fine-grained activation with context guards to prevent both under- and over-activation, without resorting to global "*".)
- **Feature Detection & Polyfills:** In code startup, check for API existence before calling (e.g. `if (vscode.window.createQuickPick) { … }`). Fall back to no-ops or simplified behavior on older hosts, while declaring `"engines.vscode": ">=1.70.0"` in package.json. (Ensures compatibility with both modern and enterprise LTS VS Code versions without sacrificing new-API benefits.)
- **Dependabot Grouping & Dual-Track Updates:** Provide a `.github/dependabot.yml` template in the repo that groups dev/prod dependencies and runs security updates immediately. (Grouping by ecosystem prevents PR overload, but security patches still open PRs immediately—balancing review load against patch urgency.)

---

## Integration & Ecosystem Opportunities

- **Dedicated CLI Companion:** Extract core orchestrator logic into a separate `@rocketship/cli` package. Expose headless commands (`rocketship --ci test`, `rocketship --ci lint`) that CI/CD pipelines can invoke directly, bypassing VS Code host constraints. (Facilitates seamless automation in GitHub Actions, Jenkins, etc., without needing the VS Code extension host.)
- **Scoped Secret Storage:** Use `vscode.SecretStorage` under a clear namespace (e.g. `rocketship.jiraToken`, `rocketship.githubToken`) for all third-party credentials. Document retrieval via `extensionContext.secrets.get("rocketship.jiraToken")`. (Prevents key collisions with other extensions and ensures clean lifecycle management of secrets.)
- **Automated Plugin Vetting Pipeline:** In the Rocketship GitHub repo, create a GitHub Actions workflow that triggers on community PRs to `plugins/.../*.js`. The workflow runs CodeQL and Dependabot security checks, then applies a community-triage label for minimal manual review. (Automates security vetting at scale, reducing manual overhead while maintaining a high safety bar for shipped plugins.)

---