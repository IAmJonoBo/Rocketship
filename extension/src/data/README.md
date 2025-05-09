# extension/src/data

This directory contains persistence logic and storage for the Rocketship extension, including:

- **StateStore**: Handles state snapshot and rollback using SQLite for resilience and disaster recovery.
- **Error Reports**: Stores error reports and related data for SupervisorService and agents.

See [docs/resilience.md](../../../../docs/resilience.md) and [docs/architecture.md](../../../../docs/architecture.md) for details.