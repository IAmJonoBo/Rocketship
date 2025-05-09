import { InferenceService } from '../services/InferenceService.js';
import { TelemetryService } from '../services/TelemetryService.js';
import { MemoryService } from '../services/MemoryService.js';
import { CancellationToken } from 'vscode';
import { Suggestion } from '../../../shared/src/types/index.js';

export class MonitorAgent {
  constructor(
    private inference: InferenceService,
    private telemetry: TelemetryService,
    private memory: MemoryService
  ) {}

  async execute(
    params: { logs: string; metrics: Record<string, number> },
    token: CancellationToken
  ): Promise<{ insights: string; suggestions: Suggestion[] }> {
    // 1. Pre-process logs/metrics:
    const input = JSON.stringify(params.metrics, null, 2) + '\n' + params.logs;
    // 2. Ask LLM to analyze for anomalies:
    const prompt = `Analyze the following application metrics and logs for performance or security anomalies:\n${input}\nProvide a bullet-list of findings and prioritized suggestions.`;
    const result = await this.inference.callModel({ prompt }, token);

    // 3. Parse into structured suggestions:
    const suggestions: Suggestion[] = JSON.parse(result.text);

    // 4. Cache insights and suggestions:
    await this.memory.appendMemory({ type: 'monitor', data: suggestions });

    this.telemetry.trackEvent('monitor.run', { count: suggestions.length });
    return { insights: result.text, suggestions };
  }
}