# Rocketship

![Build Status](https://github.com/rocketship-ai/rocketship/actions/workflows/ci.yml/badge.svg)
![Coverage](https://img.shields.io/coveralls/github/rocketship-ai/rocketship/main)
![Release](https://img.shields.io/github/v/release/rocketship-ai/rocketship)

> **Badges:** See [docs/ci-cd.md](docs/ci-cd.md) for badge and artifact conventions. For definitions, see the [glossary](docs/glossary.md).

> **Note:** This project now uses Nx for monorepo orchestration, pnpm for package management, and Vitest for all testing. All dependencies are open-source by default, with paid fallbacks only as explicit opt-in. Electron compatibility is a core requirement. The codebase has undergone a mass refactor for DRY, YAGNI, and canonical structure. See the [CHANGELOG.md](CHANGELOG.md) for details on the new structure and refactor principles.

A self-hostable, multi-agent automation platform for VS Code. Rocketship orchestrates specialized AI agents to automate, refactor, and enhance software projects, with a focus on extensibility, robust validation, and modern developer experience.

---

## Quick Start

1. **Install dependencies:**
   ```sh
   pnpm install
   ```

2. **Run tests:**
   ```sh
   npx vitest run
   ```

3. **Generate coverage report:**
   ```sh
   npx vitest run --coverage --reporter=html
   # Open coverage/coverage.html in your browser
   ```

4. **Configuration:**
   - Edit `rocketship.yaml` to configure agents, features, and plugins.
   - See [docs/configuration.md](docs/configuration.md) for schema and examples.

---

## Documentation

All technical specifications, architecture, agent APIs, and best practices are now consolidated in the [docs/](docs/) directory:

- [Architecture](docs/architecture.md)
- [Agents & API](docs/agents.md)
- [Configuration](docs/configuration.md)
- [Testing & QA](docs/testing.md)
- [Project Roadmap](docs/roadmap.md)
- [Onboarding & Handover](docs/onboarding.md)
- [Security & Compliance](docs/security.md)
- [Observability & Telemetry](docs/observability.md)
- [Prompt Engineering](docs/prompts.md)
- [Data & Retrieval Pipeline](docs/data-retrieval.md)
- [Requirements & Scope](docs/requirements.md)
- [CI/CD & Deployment](docs/ci-cd.md)
- [Documentation Index](docs/README.md) — Start here for all architecture, agent, service, and plugin docs.
- [Glossary](docs/glossary.md) — Definitions of all key Rocketship terms.

See these files for the latest, canonical guidance on all features, agent types, and workflows.

---

## Project Structure
- `extension/` — VS Code extension source code
- `cli/` — CLI companion (headless workflows)
- `shared/` — Shared types and schemas
- `docs/` — Architecture, configuration, and developer docs
- `coverage/` — Test coverage reports

---

## Contributing
- Follow [Conventional Commits](https://www.conventionalcommits.org/)
- Branch from `develop` for features, `main` for hotfixes
- Run `npx vitest run` before submitting PRs
- See [docs/](docs/) for architecture, best practices, and the AI TODO list

---

## Test Coverage
- Coverage reports are generated in `coverage/` by Vitest.
- Open `coverage/coverage.html` for a detailed, interactive report.
- Aim for 80–90% statement coverage on core services.

---

## More Information
- See `ROCKETSHIP_PROJECT_BRIEF.md` for full technical specification, architecture, and best practices.

## Monorepo Structure
- Managed by Nx. See `nx.json` and `workspace.json` for configuration.
- Use `pnpm` for all installs and scripts. Remove any Yarn or npm lockfiles.

## Testing
- All tests use Vitest. Migration from Jest is complete. See `vitest.config.ts` for configuration.

## Phased Execution Plan
- **Phase 1:** Circuit breaking (Opossum.js) and runtime validation (Ajv)
- **Phase 2:** Adaptive RAG (chokidar + LanceDB) and prompt governance (handlebars-lint)
- **Phase 3:** Sandbox (testcontainers-node) and telemetry (prom-client)
- **Phase 4:** Integration tests & benchmarks

See `ROCKETSHIP_PROJECT_BRIEF.md` for the canonical TODOs and technical plan.

## Electron Compatibility
- All features and dependencies are tested for Electron compatibility. See `docs/ci-cd.md` for packaging and testing instructions.

## Open-Source Policy
- All dependencies and tools are open-source by default. Paid fallbacks are opt-in only.

## Test Status
- **Vitest migration:** Complete. All tests now use Vitest.
- **Current issues:** Some contract (Pact) and integration (Testcontainers) tests are failing due to mock server and container runtime issues.
- **Requirements:** Docker must be installed and running for integration tests. See `docs/testing.md` and `docs/onboarding.md` for troubleshooting.
- **Next steps:** Remediation of contract/integration test setup is planned in the next batch.

## Tech Stack & Tooling (2024)
- **Monorepo Orchestration:** Nx
- **Package Manager:** pnpm
- **Test Framework:** Vitest
- **Circuit Breaking:** Opossum
- **Schema Validation:** Ajv
- **Vector Store:** LanceDB
- **File Watching:** chokidar
- **Prompt Governance:** handlebars-lint (CI)
- **Accessibility:** axe-core, Pa11y, Lighthouse