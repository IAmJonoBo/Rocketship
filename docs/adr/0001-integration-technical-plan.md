# ADR 0001: Adoption of the Integration & Technical Plan
**Status:** Accepted
**Date:** 2024-06-10

## Context

Rocketship is an extensible, agent-based automation platform for VS Code. As the project matured, it became clear that a unified, research-driven, and best-practice-aligned technical plan was needed to guide all future development, ensure maintainability, and enable effortless onboarding and handover. The project had accumulated a variety of patterns, partial refactors, and evolving requirements, making a single source of architectural truth essential.

## Decision

The team has adopted the Integration & Technical Plan (see [Feature_Enhancements.md](../../Feature_Enhancements.md)) as the canonical implementation strategy for Rocketship. This plan synthesizes the latest research, best practices, and actionable recommendations for agentic AI, orchestration, memory, tool use, explainability, observability, and modularity. All documentation, roadmap, and TODOs are now aligned with this plan, and all future features, refactors, and reviews must reference it as the source of truth.

## Consequences

- All contributors and maintainers have a single, up-to-date reference for implementation details and priorities.
- The roadmap, TODOs, and all documentation are now consistent, actionable, and cross-referenced.
- The project is positioned for sustainable, high-quality growth, onboarding, and handover.
- Any major deviation from the plan must be proposed as a new ADR.
- The plan will be updated as new research and requirements emerge, with changes tracked via additional ADRs.

## History
- 2024-06-10: Created and accepted by the Steering Committee.
- Supersedes ad hoc architectural notes and previous partial refactor plans.