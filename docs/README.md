# Rocketship Documentation Index

> **Accessibility & Navigation:**
> - All diagrams/images include descriptive alt text.
> - Heading structure and link text are optimized for screen readers.
> - For feedback or accessibility requests, open an issue or email the maintainers. We strive for WCAG 2.1 AA compliance in all docs.

## Table of Contents
- [Start Here](#start-here)
- [Core Documentation](#core-documentation)
- [Advanced & Supporting Docs](#advanced--supporting-docs)
- [How to Use This Documentation](#how-to-use-this-documentation)
- [Contributing to Docs](#contributing-to-docs)
- [See Also](#see-also)

Welcome to the Rocketship documentation! This index provides an overview of all major documentation files, their purposes, and recommended reading order for new contributors and users.

## Start Here
- **[Project Roadmap](roadmap.md):** Vision, objectives, personas, use-cases, and acceptance criteria.
- **[Onboarding & Handover](onboarding.md):** Quickstart, environment setup, ADRs, and handover checklist.

## Core Documentation
- **[Architecture](architecture.md):** High-level architecture, diagrams, ADRs, service contracts, and data flows.
- **[Agents & API](agents.md):** All agent types, APIs, interactions, and extension/CLI commands.
- **[Configuration](configuration.md):** Config schema, merge strategy, validation, and sample configs.
- **[Testing & QA](testing.md):** Test strategy, coverage, security, regression, and metrics.
- **[Requirements & Scope](requirements.md):** Vision, objectives, use cases, scope boundaries, and acceptance criteria.

## Advanced & Supporting Docs
- **[Security & Compliance](security.md):** Threat model, sandboxing, GDPR/SOC 2, and dependency provenance.
- **[Observability & Telemetry](observability.md):** Metrics, telemetry, dashboards, and alerting.
- **[Prompt Engineering](prompts.md):** Prompt design, templates, and best practices.
- **[Data & Retrieval Pipeline](data-retrieval.md):** RAG pipeline, PKG, vector store, and retrieval orchestration.
- **[CI/CD & Deployment](ci-cd.md):** CI/CD workflows, CLI runbook, and release management.

## How to Use This Documentation
- **New contributors:** Start with onboarding.md, then roadmap.md, then architecture.md and agents.md.
- **Feature development:** Reference agents.md, configuration.md, and testing.md.
- **Security, observability, and deployment:** See security.md, observability.md, and ci-cd.md.
- **Prompt/AI work:** See prompts.md and data-retrieval.md.

## Contributing to Docs
- All docs are linted automatically via GitHub Actions (see .github/workflows/docs-lint.yml).
- To propose changes, open a pull request and follow the CONTRIBUTING.md guidelines.
- For major changes, consider proposing an ADR (see onboarding.md).

## See Also
- [Root README](../README.md) for project overview and quick start.
- [AI TODO List](../ROCKETSHIP_PROJECT_BRIEF.md) for ongoing improvements and priorities.