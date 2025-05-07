

# Observability & Telemetry Guides

This document defines Rocketship’s observability architecture, covering metrics instrumentation, telemetry sampling, and dashboard/alert runbooks to ensure reliable monitoring and incident response.

---

## 1. Metrics Service Specification

### 1.1 Tracked Events  
Rocketship emits key events for each agent invocation, including **operation durations** (start/end timestamps), **error rates** (count and severity), and **model usage** metrics (token counts, model identifiers) via OpenTelemetry SDKs citeturn0search15.  

### 1.2 Prometheus Exporter Endpoints  
Expose a `/metrics` HTTP endpoint instrumented with Prometheus-exported metrics using OpenTelemetry’s HTTP exporter in `promhttp` format citeturn0search0. External tools (e.g., `prometheus/prometheus-exporter`) can scrape at  scrape interval of 15s by default citeturn0search10.  

### 1.3 Retention & Storage  
Configure Prometheus retention via flags:  
```bash
--storage.tsdb.retention.time=30d
--storage.tsdb.retention.size=80GB
```  
Limiting retention to 80–85% of disk capacity prevents OOM deletion delays citeturn0search4.  

---

## 2. Telemetry Sampling Policy

### 2.1 Sampling Strategies  
Implement **head-based sampling** at 10% default and **tail-based sampling** for error or high-latency traces, retaining all error traces while downsampling normal workflows citeturn0search6.  

### 2.2 Aggregation Windows  
Aggregate histograms in 1-minute buckets for operation durations and 5-minute windows for error rates, using Prometheus `histogram_quantile(0.95, ...)` for 95th-percentile latency calculations citeturn0search2.  

### 2.3 Back-Pressure Handling  
Leverage the OpenTelemetry Collector with **batch processor** settings (max_queue_size=10000, scheduled_delay=500ms) and drop policies to prevent memory bloat under high load citeturn0search21.  

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
citeturn0search17

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
citeturn0search2turn0search7

### 3.3 Escalation Procedures  
- **Initial Response:** On `HighLatency` firing, notify on-call team via Slack webhook and link to runbook citeturn0search3.  
- **Runbook Execution:** Follow documented steps: validate metrics endpoint, restart affected agent containers, check disk/network health citeturn0search8.  
- **Escalation:** If unresolved in 15 minutes, escalate to Engineering Manager and open incident in PagerDuty with severity mapping from `alert.labels.severity` citeturn0search23.  

---

By instrumenting detailed metrics, applying intelligent sampling, and codifying dashboards and runbooks, Rocketship achieves a robust observability foundation to maintain performance, detect anomalies, and accelerate incident resolution.