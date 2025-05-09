# Architectural Decision Records (ADRs)

ADRs document important architectural and technical decisions for Rocketship. They provide context, rationale, and consequences for major changes, ensuring the project's history and reasoning are transparent and discoverable.

---

## When to Write an ADR
- When introducing a new architecture, technology, or major dependency
- When making a significant change to an existing pattern or workflow
- When deprecating or removing a core feature
- When resolving a major technical debate or trade-off

## ADR Process
1. Copy the template below into a new file: `docs/adr/NNNN-title.md` (where NNNN is the next available number).
2. Fill in all sections: Context, Decision, Consequences, and Status.
3. Open a pull request and request review from the Steering Committee (see [GOVERNANCE.md](../../GOVERNANCE.md)).
4. Discuss and revise as needed. Once accepted, update Status to "Accepted".
5. Link superseded ADRs in the "History" section.

## ADR Template

```
# ADR NNNN: Title
**Status:** Proposed | Accepted | Superseded | Deprecated
**Date:** YYYY-MM-DD

## Context
Describe the issue, background, and why this decision is needed.

## Decision
State the chosen approach and explain why it was selected over alternatives.

## Consequences
List the trade-offs, risks, and follow-up actions. What will change? What are the impacts?

## History
- YYYY-MM-DD: Created
- YYYY-MM-DD: Reviewed/Accepted
- Supersedes/links to: [ADR NNNN](NNNN-previous.md)
```

---

See also: [onboarding.md](../onboarding.md), [GOVERNANCE.md](../../GOVERNANCE.md), [CONTRIBUTING.md](../../CONTRIBUTING.md)