# Disaster Recovery & Automated Failover

> **For actionable tasks and implementation phases, see:**
> - [docs/roadmap.md](roadmap.md#phase-45-disaster-recovery-drills--automated-failover-tests)
> - [TODO.md](../TODO.md)

This document describes Rocketship's disaster recovery (DR) and failover automation for critical data stores, including LanceDB (vector DB) and audit logs. It covers rationale, procedures, CI integration, health checks, observability, and runbooks.

---

## Why Disaster Recovery?
- **Resilience:** Ensure Rocketship can recover from data loss, corruption, or infrastructure failure.
- **Compliance:** Meet audit, security, and reliability requirements.
- **Confidence:** Regularly test and validate backup/restore processes.

---

## Scope
- **LanceDB (Vector DB):** Embeddings, context, and memory.
- **Audit Logs:** Agent actions, tool invocations, decision traces.

---

## DR Procedures

### 1. Backup Automation
- Schedule regular backups for LanceDB and audit logs (e.g., nightly, before upgrades).
- Store backups in versioned, offsite storage (e.g., S3, GCS, Azure Blob).

### 2. Restore & Failover Drills
- Simulate failure by moving/deleting live DB/log files.
- Restore from latest backup.
- Run health checks to verify data integrity and completeness.
- Emit telemetry and alert on failure.

### 3. Health Check Scripts
- `scripts/drill-lancedb.sh`: Simulate LanceDB failure, restore, and verify.
- `scripts/drill-auditlog.sh`: Simulate audit log loss, restore, and verify.
- Health check commands (e.g., `npx rocketship --ci check-vector-db`, `npx rocketship --ci check-audit-log`).

### 4. CI/CD Integration
- `.github/workflows/dr-drill.yml` runs DR drills on schedule (e.g., weekly).
- Fails workflow and alerts on any restore or health check failure.

### 5. Observability & Alerting
- Emit metrics/logs for each DR drill (success/failure, duration, errors).
- Integrate with Prometheus/Grafana dashboards and alert rules.
- Optionally, send Slack/email alerts on failure.

---

## Example CI Workflow
```yaml
name: Disaster Recovery Drill
on:
  schedule:
    - cron: '0 3 * * 0' # Weekly at 3am UTC
jobs:
  dr-drill:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Simulate and Restore LanceDB
        run: ./scripts/drill-lancedb.sh
      - name: Simulate and Restore Audit Log
        run: ./scripts/drill-auditlog.sh
      - name: Health Check
        run: npx rocketship --ci check-dr-integrity
```

---

## Runbooks
- **LanceDB Restore:**
  1. Stop Rocketship services.
  2. Move/rename corrupted `data/rocketship-db`.
  3. Copy latest backup to `data/rocketship-db`.
  4. Start Rocketship and run health check.
- **Audit Log Restore:**
  1. Stop Rocketship services.
  2. Move/rename corrupted `logs/audit.log`.
  3. Copy latest backup to `logs/audit.log`.
  4. Start Rocketship and run health check.

---

## References
- [scripts/drill-lancedb.sh](../scripts/drill-lancedb.sh)
- [scripts/drill-auditlog.sh](../scripts/drill-auditlog.sh)
- [docs/roadmap.md](roadmap.md#phase-45-disaster-recovery-drills--automated-failover-tests)
- [TODO.md](../TODO.md)