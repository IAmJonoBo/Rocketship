# Testing & Quality Assurance

## Tech Stack (2024)
- **Test Framework:** Vitest
- **Circuit Breaking:** Opossum
- **Schema Validation:** Ajv
- **Vector Store:** LanceDB
- **File Watching:** chokidar
- **Prompt Governance:** handlebars-lint (CI)
- **Accessibility:** axe-core, Pa11y, Lighthouse

> **Note:** This file consolidates and supersedes the previous 'Testing & QA Plans.md'.

> **Terminology Note:** For definitions of agents, services, and plugins, see the [Rocketship Glossary](glossary.md).

This document outlines Rocketship's comprehensive testing and quality-assurance strategy, ensuring reliability, security, and performance based on current best practices.

---

## 1. Test Strategy

### 1.1 Unit Tests
- **Framework:** Vitest for all unit tests.
- **Scope:** Test individual functions, utilities, and service methods (e.g., `ConfigService.loadConfig`, `PluginManager.activatePlugin`).
- **Coverage Target:** ≥ 80% lines, functions, and branches measured with Vitest coverage.
- **Best Practices:**
  - Use Vitest mocks to isolate external dependencies.
  - Keep tests fast (<50ms) to maintain rapid feedback loops.
  - Structure tests with clear `describe`/`it` blocks and avoid complex logic in tests.

### 1.2 Integration Tests
- **Framework:** Vitest + Supertest for Node/CLI flows; use VS Code Test Runner and Playwright for Webview interactions.
- **Scope:**
  - CLI commands (`plan`, `code`, `test`, `diagnose`) in an isolated Node environment.
  - In-extension workflows spanning retrieval→inference→memory services.
- **Approach:**
  - Spin up an in-memory LanceDB and mock external LLM endpoints.
  - Use Playwright for reliable, multi-browser UI tests.
- **Acceptance Criteria:** No uncaught exceptions, correct outputs, and acceptable performance.
> **TODO:** Ensure dynamic port allocation and robust skip logic for Docker/Testcontainers are implemented in all integration tests. Track for final mass refactor.

### 1.3 End-to-End (E2E) Tests
- **Framework:** Playwright for cross-platform, headless VS Code simulations.
- **Scope:** Simulate full user journey:
  1. Open workspace with `.vscode/rocketship.yaml`.
  2. Execute `Rocketship: Plan`, `Code`, `Test` commands.
- **Test Data:** Use a canonical sample repository.
- **Goals:** Validate UI rendering, command activation, error handling, and telemetry emissions.

### 1.4 Performance & AI QA
- **Benchmarks:** Run HumanEval+ and MBPP via SWE-bench nightly; target pass@1 ≥ 50%, pass@5 ≥ 80%.
- **Latency Targets:** 95th-percentile inference < 2s for 512-token calls.
- **Automation:** Fail CI on >5% accuracy drop or latency regression.

---

## 2. Security & SAST Playbook

### 2.1 Static Application Security Testing
- **Tools:**
  - GitHub CodeQL with custom and OWASP packs.
  - Semgrep with default `p/default` and custom rules.
- **Integration:** Include in `ci.yml`:
  ```yaml
  - name: Run CodeQL Analysis
    uses: github/codeql-action/analyze@v2
  - name: Run Semgrep
    run: semgrep --config=p/default --timeout=120
  ```
- **Failure Modes:**
  - **Critical:** block merges.
  - **Medium:** warn in PR.
  - **Low:** log to dashboard.

### 2.2 Dynamic & Fuzz Testing
- **Tools:** OWASP ZAP for quick scans; Fuzzilli for JS engine fuzzing.
- **Tests:**
  - Prompt injection vectors.
  - File-system path traversal.
  - Network fault simulations (timeouts, 5xx errors).
- **Recovery:** Verify retry/backoff and user diagnostics.

---

## 3. Regression & Metrics Tracking

### 3.1 Performance Regression
- **Instrumentation:** Use OpenTelemetry SDK to emit histograms for each agent call.
- **Monitoring:** Prometheus endpoint at `/metrics` with Grafana dashboards.
- **Alerts:** 95th-percentile latency >2s over 10m triggers alert.

### 3.2 Load Testing
- **Tool:** k6 for JS-based load scripts; simulate up to 4 concurrent agents.
- **Scripts:** Hybrid protocol/browser tests and realistic scenarios.
- **CI Integration:** Nightly k6 runs; fail on threshold breaches.

### 3.3 Token-Usage Budgets & Drift
- **Budgets:** PlannerAgent ≤512 tokens, CoderAgent ≤1024, TesterAgent ≤512.
- **Validation:** ConfigService enforces budgets on load.
- **Drift Alerts:** >10% weekly increase triggers notifications via webhook.

## See also
- architecture.md
- configuration.md
- agents.md

---

## 4. Mutation & Contract Testing

### 4.1 Mutation Testing
- **Purpose:** Mutation testing checks the effectiveness of your test suite by introducing small code changes (mutations) and verifying that tests fail as expected.
- **Tool:** [Stryker](https://stryker-mutator.io/) is recommended for JavaScript/TypeScript projects.
- **Setup:**
  ```sh
  npm install --save-dev @stryker-mutator/core
  npx stryker init
  npx stryker run
  ```
- **Best Practice:** Run mutation tests on critical services and agent logic. Integrate Stryker into CI for coverage gates.

### 4.2 Contract Testing
- **Purpose:** Contract testing ensures that service and agent APIs conform to agreed contracts, preventing integration regressions.
- **Tool:** [Pact](https://docs.pact.io/) is a popular choice for JavaScript/TypeScript.
- **Setup:**
  ```sh
  npm install --save-dev @pact-foundation/pact
  # Write and run contract tests as per Pact docs
  ```
- **Best Practice:** Use contract tests for all public agent/service APIs and workflows. Integrate into CI for automated verification.

See also: [ci-cd.md](ci-cd.md), [glossary.md](glossary.md)

---

## 5. Mutation Testing (Stryker)

Rocketship uses [Stryker](https://stryker-mutator.io/) for mutation testing to ensure the effectiveness of the test suite.

- **Config:** See `stryker.conf.json` at the project root.
- **Run:**
  ```sh
  npm run stryker:run
  ```
- **Reports:** View results in `reports/mutation/html/index.html` after running.
- **Best Practice:** Run mutation tests on critical agent/service logic and integrate into CI for coverage gates.

## 6. Accessibility Testing (axe-core)

Rocketship will use [axe-core](https://www.deque.com/axe/) for automated accessibility checks on documentation and (in future) webviews.

- **Docs:**
  ```sh
  npm run a11y:docs
  # (This is a placeholder; see package.json for details)
  # Example: npx axe docs/index.html
  ```
- **Webviews:** (TODO) Integrate axe-core or Playwright/axe for webview snapshot testing in CI.

## 7. Contract Testing (Pact)

- **Tool:** [Pact](https://docs.pact.io/) will be used for contract testing of agent/service APIs.
- **Status:** (TODO) Scaffold contract tests and integrate into CI.

## Test Framework
- All tests use **Vitest**. Migration from Jest is complete. See `vitest.config.ts` for configuration.

## Current Test Status (Post-Migration)
- **Unit tests:** Most pass with Vitest.
- **Contract tests (Pact):** Many are failing due to mock server issues (expected requests not received), port conflicts, or missing endpoints.
- **Integration tests (Testcontainers):** Failing due to missing or misconfigured Docker/Testcontainers runtime.
- **Skipped/Empty suites:** Some test files are skipped or have no test suites.

## Troubleshooting
- **Pact contract tests:**
  - Ensure mock servers are started and endpoints are correctly configured for Vitest.
  - Check for available ports before starting Pact servers.
- **Testcontainers integration tests:**
  - Ensure Docker is installed and running.
  - Check that your user has permission to run containers.
  - See onboarding for setup instructions.
- **General:**
  - Mark failing/skipped tests with TODOs and document the reason in the test file and in the test plan.

## Next Steps
- Review and update contract/integration test setup for Vitest compatibility.
- Add port and runtime checks to test setup.
- Document all issues and remediation steps in the test plan and CHANGELOG.

## Contract & Integration Test Infrastructure (2024 Update)
- **Pact contract tests:**
  - Now use dynamic ports to avoid conflicts. See test files for implementation details.
  - If a port conflict occurs, the test will retry or skip with a warning.
  - Some contract tests are placeholders and will be implemented in future batches. These are marked with TODOs in the test files.
  - In CI, contract tests should be run sequentially to avoid port conflicts (see `.github/workflows/contract-tests.yml`).
- **Integration tests (Testcontainers):**
  - If Docker/Testcontainers is not available, integration tests are skipped with a warning.
  - See onboarding for Docker setup instructions.

## Troubleshooting (2024)
- **Port conflicts in contract tests:**
  - Ensure no other process is using the required port, or use dynamic port assignment.
  - In CI, run contract tests sequentially or set `maxConcurrency: 1` for Vitest.
- **Docker/Testcontainers issues:**
  - Ensure Docker is installed, running, and your user has permission to run containers.
  - If integration tests are skipped, see the test output for details.

## Next Steps
- Refactor contract tests to use dynamic ports and implement real agent calls.
- Add runtime checks and skip logic for integration tests if Docker/Testcontainers is unavailable.
- Continue to mark and document placeholder/skipped tests with TODOs.
- Update CI workflows to run contract tests sequentially.
- Document all changes and troubleshooting steps here and in onboarding.

---