# Rocketship Glossary

This glossary defines key terms, concepts, and components used throughout the Rocketship project. For deeper details, see the cross-referenced documentation links.

| Term                | Definition & Reference |
|---------------------|-----------------------|
| **Agent**           | Autonomous component responsible for a specific task (e.g., planning, coding, testing). See [agents.md](agents.md). |
| **PlannerAgent**    | Decomposes requirements into actionable plans and workflows. |
| **CoderAgent**      | Generates and refactors code. |
| **CriticAgent**     | Reviews code, enforces standards, and suggests improvements. |
| **TesterAgent**     | Generates, runs, and analyzes tests. |
| **ScaffolderAgent** | Bootstraps new projects, modules, or features. |
| **DeployerAgent**   | Handles deployment automation and environment setup. |
| **DebuggerAgent**   | Diagnoses and fixes runtime or build errors. |
| **MonitorAgent**    | Observes system health, performance, and workflow progress. |
| **DocsAgent**       | Fetches and injects live API documentation and usage examples. |
| **OrchestratorService** | Central control plane for workflow sequencing and agent coordination. See [architecture.md](architecture.md). |
| **PluginManager**   | Manages discovery, loading, and lifecycle of plugins. |
| **HybridRetrievalService** | Unified retrieval pipeline (vector + PKG). |
| **MemoryService**   | Manages session and persistent memory layers. |
| **TelemetryService**| Centralized event logging, metrics, and sampling. |
| **ModelRouter**     | Abstracts access to all LLM backends (local, cloud, hybrid). |
| **PKGService**      | Programming Knowledge Graph service for codebase structure and relationships. |
| **BanditController**| Adaptive model selection using contextual bandits. |
| **ReflexionAgent**  | Meta-agent for self-reflection and policy updates. |
| **LoRAAdapterService** | Service for on-the-fly codebase-specific fine-tuning. |
| **VectorStore**     | Manages embeddings for semantic search and context augmentation. |
| **WebviewPanel**    | Main entry point for agent interaction and workflow visualization. |
| **Plugin**          | Optional extension that adds or modifies Rocketship functionality. See [plugins.md](plugins.md). |
| **Workflow**        | Sequence of agent operations to achieve a user goal. |
| **RAG**             | Retrieval-Augmented Generation: combines retrieval and generation for LLMs. |
| **ADR**             | Architectural Decision Record. See [onboarding.md](onboarding.md). |
| **SLSA**            | Supply-chain Levels for Software Artifacts. See [security.md](security.md). |
| **SBOM**            | Software Bill of Materials. See [security.md](security.md). |
| **CI/CD**           | Continuous Integration/Continuous Deployment. See [ci-cd.md](ci-cd.md). |
| **Prometheus**      | Metrics and monitoring system. See [observability.md](observability.md). |
| **Grafana**         | Visualization and dashboarding tool. |
| **LanceDB**         | Embedded vector database for semantic search. |
| **pgvector**        | Postgres extension for vector search. |
| **Ollama**          | Local LLM serving platform. |
| **LM Studio**       | Local LLM management and serving tool. |
| **HumanEval+**      | Benchmark for code generation quality. |
| **MBPP**            | Benchmark for Python programming problems. |

*For additional terms, see the relevant documentation or open an issue to request a new entry.*