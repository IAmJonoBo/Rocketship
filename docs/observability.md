# Observability & Telemetry

> **Note:** This file consolidates and supersedes the previous 'Observability & Telemetry Guides.md'.

This document defines Rocketship's observability architecture, covering metrics instrumentation, telemetry sampling, and dashboard/alert runbooks to ensure reliable monitoring and incident response.

---

## 1. Metrics Service Specification

### 1.1 Tracked Events
Rocketship emits key events for each agent invocation, including **operation durations** (start/end timestamps), **error rates** (count and severity), and **model usage** metrics (token counts, model identifiers) via OpenTelemetry SDKs.

### 1.2 Prometheus Exporter Endpoints
Expose a `/metrics` HTTP endpoint instrumented with Prometheus-exported metrics using OpenTelemetry's HTTP exporter in `promhttp` format. External tools (e.g., `prometheus/prometheus-exporter`) can scrape at a scrape interval of 15s by default.

### 1.3 Retention & Storage
Configure Prometheus retention via flags:
```bash
--storage.tsdb.retention.time=30d
--storage.tsdb.retention.size=80GB
```
Limiting retention to 80–85% of disk capacity prevents OOM deletion delays.

---

## 2. Telemetry Sampling Policy

### 2.1 Sampling Strategies
Implement **head-based sampling** at 10% default and **tail-based sampling** for error or high-latency traces, retaining all error traces while downsampling normal workflows.

### 2.2 Aggregation Windows
Aggregate histograms in 1-minute buckets for operation durations and 5-minute windows for error rates, using Prometheus `histogram_quantile(0.95, ...)` for 95th-percentile latency calculations.

### 2.3 Back-Pressure Handling
Leverage the OpenTelemetry Collector with **batch processor** settings (max_queue_size=10000, scheduled_delay=500ms) and drop policies to prevent memory bloat under high load.

---

## 3. Dashboard & Alert Runbook

### 3.1 Grafana Dashboard JSON
Include a reusable panel JSON snippet for latency and error-rate metrics:
```json
{
  "panels": [
    {
      "type": "graph",
      "title": "95th-Percentile Latency",
      "targets": [
        {
          "expr": "histogram_quantile(0.95, sum(rate(rocketship_request_duration_seconds_bucket[5m])) by (le))",
          "legendFormat": "{{agent}}"
        }
      ]
    },
    {
      "type": "stat",
      "title": "Error Rate",
      "targets": [
        {
          "expr": "sum(rate(rocketship_errors_total[5m])) / sum(rate(rocketship_requests_total[5m])) * 100",
          "legendFormat": "Error %"
        }
      ]
    }
  ]
}
```

### 3.2 Alert Thresholds
Define Prometheus alert rules in `alert.rules.yml`:
```yaml
groups:
- name: rocketship-alerts
  rules:
  - alert: HighLatency
    expr: histogram_quantile(0.95, sum(rate(rocketship_request_duration_seconds_bucket[5m])) by (le)) > 2
    for: 5m
    labels:
      severity: page
  - alert: ElevatedErrorRate
    expr: (sum(rate(rocketship_errors_total[5m])) / sum(rate(rocketship_requests_total[5m])) * 100) > 5
    for: 10m
    labels:
      severity: ticket
```

### 3.3 Escalation Procedures
- **Initial Response:** On `HighLatency` firing, notify on-call team via Slack webhook and link to runbook.
- **Runbook Execution:** Follow documented steps: validate metrics endpoint, restart affected agent containers, check disk/network health.
- **Escalation:** If unresolved in 15 minutes, escalate to Engineering Manager and open incident in PagerDuty with severity mapping from `alert.labels.severity`.

---

By instrumenting detailed metrics, applying intelligent sampling, and codifying dashboards and runbooks, Rocketship achieves a robust observability foundation to maintain performance, detect anomalies, and accelerate incident resolution.

## See also
- architecture.md
- testing.md
- onboarding.md

---

## Accessibility & Mutation Testing Observability

- **Accessibility (a11y) Reports:**
  - Automated accessibility checks (axe-core) will be run on documentation and, in future, webviews.
  - Results will be surfaced in CI and summarized in the observability dashboard.
  - Remediation steps and a11y status will be tracked as part of release criteria.

- **Mutation Testing Reports:**
  - Stryker mutation testing results will be available in `reports/mutation/html` and summarized in CI.
  - Mutation score trends will be tracked over time to ensure test suite effectiveness.

See [testing.md](testing.md) for setup and usage details.

---

## 4. Observability Best Practices & Review Checklist

- [ ] All agent and service actions emit metrics (latency, error, usage) via MetricsService/TelemetryService
- [ ] Prometheus endpoint (`/metrics`) is enabled and documented
- [ ] Grafana dashboards are available and up-to-date (see dashboards/)
- [ ] Alert rules are defined and tested (see alert.rules.yml)
- [ ] Tracing is enabled for long-running or critical workflows (OpenTelemetry)
- [ ] Observability docs are reviewed and updated quarterly
- [ ] New agents/services are added to dashboards and alerting as they are introduced

---

## 5. Periodic Review & Continuous Improvement

- Schedule quarterly reviews of observability coverage and documentation
- Update dashboards and alert rules as new features/agents are added
- Solicit feedback from users and contributors on monitoring gaps or pain points
- Document all changes and improvements in the project brief and changelog