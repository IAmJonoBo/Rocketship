# Testing & QA Plans

This document outlines Rocketship’s comprehensive testing and quality-assurance strategy, ensuring reliability, security, and performance based on current best practices.

---

## 1. Test Strategy

### 1.1 Unit Tests  
- **Framework:** Jest for broad compatibility; adopt Vitest 3.0 for Vite-based and ultra-fast ESM/TS projects citeturn0search8turn0search3.  
- **Scope:** Test individual functions, utilities, and service methods (e.g., `ConfigService.loadConfig`, `PluginManager.activatePlugin`) citeturn0search1.  
- **Coverage Target:** ≥ 80% lines, functions, and branches measured with Istanbul citeturn0search1.  
- **Best Practices:**  
  - Use `jest.fn()` or Vitest mocks to isolate external dependencies citeturn0search1.  
  - Keep tests fast (<50ms) to maintain rapid feedback loops citeturn0search3.  
  - Structure tests with clear `describe`/`it` blocks and avoid complex logic in tests.

### 1.2 Integration Tests  
- **Framework:** Jest or Vitest + Supertest for Node/CLI flows; use VS Code Test Runner and Playwright for Webview interactions citeturn0search4turn0search4.  
- **Scope:**  
  - CLI commands (`plan`, `code`, `test`, `diagnose`) in an isolated Node environment.  
  - In-extension workflows spanning retrieval→inference→memory services.  
- **Approach:**  
  - Spin up an in-memory LanceDB and mock external LLM endpoints.  
  - Use Playwright for reliable, multi-browser UI tests citeturn0search4.  
- **Acceptance Criteria:** No uncaught exceptions, correct outputs, and acceptable performance.

### 1.3 End-to-End (E2E) Tests  
- **Framework:** Playwright for cross-platform, headless VS Code simulations citeturn0search4.  
- **Scope:** Simulate full user journey:  
  1. Open workspace with `.vscode/rocketship.yaml`.  
  2. Execute `Rocketship: Plan`, `Code`, `Test` commands.  
- **Test Data:** Use a canonical sample repository.  
- **Goals:** Validate UI rendering, command activation, error handling, and telemetry emissions.

### 1.4 Performance & AI QA  
- **Benchmarks:** Run HumanEval+ and MBPP via SWE-bench nightly; target pass@1 ≥ 50%, pass@5 ≥ 80% citeturn0search5.  
- **Latency Targets:** 95th-percentile inference < 2s for 512-token calls.  
- **Automation:** Fail CI on >5% accuracy drop or latency regression.

---

## 2. Security & SAST Playbook

### 2.1 Static Application Security Testing  
- **Tools:**  
  - GitHub CodeQL with custom and OWASP packs citeturn1search0.  
  - Semgrep with default `p/default` and custom rules citeturn1search1.  
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
- **Tools:** OWASP ZAP for quick scans; Fuzzilli for JS engine fuzzing citeturn0search4turn0search9.  
- **Tests:**  
  - Prompt injection vectors.  
  - File-system path traversal.  
  - Network fault simulations (timeouts, 5xx errors).  
- **Recovery:** Verify retry/backoff and user diagnostics.

---

## 3. Regression & Metrics Tracking

### 3.1 Performance Regression  
- **Instrumentation:** Use OpenTelemetry SDK to emit histograms for each agent call citeturn1search8.  
- **Monitoring:** Prometheus endpoint at `/metrics` with Grafana dashboards.  
- **Alerts:** 95th-percentile latency >2s over 10m triggers alert.

### 3.2 Load Testing  
- **Tool:** k6 for JS-based load scripts; simulate up to 4 concurrent agents citeturn0search0.  
- **Scripts:** Hybrid protocol/browser tests and realistic scenarios citeturn0search6.  
- **CI Integration:** Nightly k6 runs; fail on threshold breaches.

### 3.3 Token-Usage Budgets & Drift  
- **Budgets:** PlannerAgent ≤512 tokens, CoderAgent ≤1024, TesterAgent ≤512.  
- **Validation:** ConfigService enforces budgets on load.  
- **Drift Alerts:** >10% weekly increase triggers notifications via webhook.
