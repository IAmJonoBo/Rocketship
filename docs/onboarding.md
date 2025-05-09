# Onboarding & Handover

> **Note:** This file consolidates and supersedes the previous 'Onboarding & Handover Documentation.md'.

This guide ensures new users and teams can quickly adopt Rocketship and seamlessly transition project ownership, covering a Quickstart tutorial, ADR maintenance process, and a comprehensive handover checklist.

---

## 1. Quickstart Guide

A concise "Hello Rocketship" tutorial to get started in under ten minutes.

### 1.1 Installation
1. **Prerequisites:** Install Node.js v16+ and VS Code ≥1.70.0.
2. **Extension Install:** In VS Code, open the Extensions view (`Ctrl+Shift+X`), search for "Rocketship", and click **Install**.
3. **CLI Setup:** Run `pnpm install -g @rocketship/cli` or use `pnpm dlx @rocketship/cli` for headless commands.

> **Note:** pnpm is the only supported package manager. Remove any npm or yarn lockfiles before installing.

### 1.2 Configuration
1. **Copy Sample Config:** Place one of the provided `rocketship.yaml` templates into `.vscode/rocketship.yaml` in your workspace root.
2. **Adjust Settings:** Edit `modelProvider`, `maxConcurrentAgents`, and agent overrides to suit your environment (e.g., local or cloud).
3. **Validate:** In VS Code command palette (`Ctrl+Shift+P`), run **Rocketship: Diagnose** to verify config validity.

### 1.3 First Plan → Code → Test
1. **Plan:** Invoke **Rocketship: Plan** (command palette) with a brief requirement; review generated tasks in the Planner panel.
2. **Code:** Select a task and run **Rocketship: Code** to scaffold code stubs; inspect diffs and apply changes.
3. **Test:** Use **Rocketship: Test** to generate and execute unit tests; view results and coverage directly in the Test panel.

---

## 2. ADR & ADR Maintenance Guide

Maintain a clear, evolving record of architectural decisions using ADRs.

### 2.1 Propose an ADR
- Create a new file in `docs/adr/` named `NNNN-title.md` with the template:
  ```markdown
  # ADR NNNN: Title
  **Status:** Proposed
  **Date:** YYYY-MM-DD
  **Context:** [Describe the issue]
  **Decision:** [Chosen approach]
  **Consequences:** [Trade-offs]
  ```

### 2.2 Review & Meetings
- **Schedule a 30–45 min ADR meeting** with stakeholders to discuss context, alternatives, and rationale.
- Assign an ADR owner to document feedback and update the ADR as "Accepted" or "Superseded".

### 2.3 Definition of Done
- ADR is complete when it has **Context**, **Decision**, **Consequences**, and **Status** updated to "Accepted" with no open comments.
- Record all updates in the ADR's "History" section and link superseded ADRs in the ADR index.

---

## 3. Handover Checklist

A template to ensure seamless project transition to a new team.

| Item                          | Description                                                                                               |
|-------------------------------|-----------------------------------------------------------------------------------------------------------|
| **Project Overview**          | Objectives, scope, key stakeholders, and high-level architecture.                  |
| **Repository Access**         | Git URLs, branch policies, CI status badges, service account keys.                   |
| **Readme & Docs**             | Verified `README.md`, architecture diagrams, ADR index, `docs/` folder contents.     |
| **Environment Setup**         | Local dev steps, Docker configs, environment variables, and Xvfb instructions for headless tests. |
| **Dependencies & Build**      | Package manager commands, version locks, build scripts, and CI workflows (`ci.yml`, `bench.yml`). |
| **Automated Tests**           | Test commands, coverage thresholds, SWE-bench integration, and nightly benchmark results.           |
| **Credentials & Secrets**     | SecretStorage guidelines, access scopes, rotation policy, and location of vault-backed secrets.     |
| **Operational Runbooks**      | Monitoring dashboards, alert rules, performance targets, and incident response procedures.   |
| **Training & Contacts**       | Schedule knowledge-transfer sessions with original maintainers, key Slack channels, and on-call roster. |
| **Sign-Off**                  | Formal acceptance by incoming team lead, ensuring all checklist items are reviewed and confirmed. |

> **Tip:** Keep this checklist versioned alongside the codebase and review it at each release or handover event.

## See also
- README.md
- architecture.md
- configuration.md
- agents.md
- roadmap.md

---

## Governance & Project Roles

- See [GOVERNANCE.md](../GOVERNANCE.md) for the governance model, roles (Maintainer, Committer, Contributor), and escalation procedures.
- All contributors must follow the Code of Conduct and dispute resolution process as described in GOVERNANCE.md.

## Integration Test Requirements
- **Docker/Testcontainers:**
  - Integration tests require Docker to be installed and running.
  - If Docker is not available, some integration tests will fail (see `docs/testing.md` for troubleshooting).
  - Ensure your user has permission to run containers.
  - For Mac: Install Docker Desktop. For Linux: Install Docker Engine and add your user to the `docker` group.

## Test Framework
- All tests use **Vitest**. Migration from Jest is complete. See `vitest.config.ts` for configuration.
- See `docs/testing.md` for current test status and troubleshooting.

## Contract & Integration Test Infrastructure (2024 Update)
- **Pact contract tests:**
  - Use dynamic ports to avoid conflicts. See test files for implementation details.
  - Some contract tests are placeholders and will be implemented in future batches. These are marked with TODOs in the test files.
- **Integration tests (Testcontainers):**
  - If Docker/Testcontainers is not available, integration tests are skipped with a warning.
  - See `docs/testing.md` for troubleshooting and details.

## Tech Stack Overview (2024)
- **Monorepo Orchestration:** Nx
- **Package Manager:** pnpm
- **Test Framework:** Vitest
- **Circuit Breaking:** Opossum
- **Schema Validation:** Ajv
- **Vector Store:** LanceDB
- **File Watching:** chokidar
- **Prompt Governance:** handlebars-lint (CI)
- **Accessibility:** axe-core, Pa11y, Lighthouse