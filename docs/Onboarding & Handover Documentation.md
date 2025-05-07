

# Onboarding & Handover Documentation

This guide ensures new users and teams can quickly adopt Rocketship and seamlessly transition project ownership, covering a Quickstart tutorial, ADR maintenance process, and a comprehensive handover checklist.

---

## 1. Quickstart Guide

A concise “Hello Rocketship” tutorial to get started in under ten minutes.

### 1.1 Installation  
1. **Prerequisites:** Install Node.js v16+ and VS Code ≥1.70.0 citeturn1search0.  
2. **Extension Install:** In VS Code, open the Extensions view (`Ctrl+Shift+X`), search for “Rocketship”, and click **Install** citeturn1search0.  
3. **CLI Setup:** Run `npm install -g @rocketship/cli` or use `npx` for headless commands citeturn1search1.

### 1.2 Configuration  
1. **Copy Sample Config:** Place one of the provided `rocketship.yaml` templates into `.vscode/rocketship.yaml` in your workspace root citeturn1search8.  
2. **Adjust Settings:** Edit `modelProvider`, `maxConcurrentAgents`, and agent overrides to suit your environment (e.g., local or cloud) citeturn1search2.  
3. **Validate:** In VS Code command palette (`Ctrl+Shift+P`), run **Rocketship: Diagnose** to verify config validity citeturn1search4.

### 1.3 First Plan → Code → Test  
1. **Plan:** Invoke **Rocketship: Plan** (command palette) with a brief requirement; review generated tasks in the Planner panel citeturn0search3.  
2. **Code:** Select a task and run **Rocketship: Code** to scaffold code stubs; inspect diffs and apply changes citeturn0search3.  
3. **Test:** Use **Rocketship: Test** to generate and execute unit tests; view results and coverage directly in the Test panel citeturn0search3.

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
  ``` citeturn2search2.  

### 2.2 Review & Meetings  
- **Schedule a 30–45 min ADR meeting** with stakeholders to discuss context, alternatives, and rationale citeturn2search0.  
- Assign an ADR owner to document feedback and update the ADR as “Accepted” or “Superseded” citeturn2search1.

### 2.3 Definition of Done  
- ADR is complete when it has **Context**, **Decision**, **Consequences**, and **Status** updated to “Accepted” with no open comments citeturn2search6.  
- Record all updates in the ADR’s “History” section and link superseded ADRs in the ADR index citeturn2search1.

---

## 3. Handover Checklist

A template to ensure seamless project transition to a new team.

| Item                          | Description                                                                                               |
|-------------------------------|-----------------------------------------------------------------------------------------------------------|
| **Project Overview**          | Objectives, scope, key stakeholders, and high-level architecture citeturn3search0.                  |
| **Repository Access**         | Git URLs, branch policies, CI status badges, service account keys citeturn3search1.                   |
| **Readme & Docs**             | Verified `README.md`, architecture diagrams, ADR index, `docs/` folder contents citeturn3search4.     |
| **Environment Setup**         | Local dev steps, Docker configs, environment variables, and Xvfb instructions for headless tests citeturn3search2. |
| **Dependencies & Build**      | Package manager commands, version locks, build scripts, and CI workflows (`ci.yml`, `bench.yml`) citeturn3search4. |
| **Automated Tests**           | Test commands, coverage thresholds, SWE-bench integration, and nightly benchmark results citeturn3search5.           |
| **Credentials & Secrets**     | SecretStorage guidelines, access scopes, rotation policy, and location of vault-backed secrets citeturn4search1.     |
| **Operational Runbooks**      | Monitoring dashboards, alert rules, performance targets, and incident response procedures citeturn3search7.   |
| **Training & Contacts**       | Schedule knowledge-transfer sessions with original maintainers, key Slack channels, and on-call roster citeturn3search3. |
| **Sign-Off**                  | Formal acceptance by incoming team lead, ensuring all checklist items are reviewed and confirmed citeturn3search0. |

> **Tip:** Keep this checklist versioned alongside the codebase and review it at each release or handover event citeturn3search8.