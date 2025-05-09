/**
 * © 2025 Rocketship Contributors
 * Licensed under the Apache-2.0 License.
 */

import { createCircuitBreaker } from './helpers/circuitBreaker.js';
import { RocketshipError } from './helpers.js';
import { Validator } from './Validator.js';
import plannerSchema from 'shared/src/schema/planner.schema.json' assert { type: 'json' };
import scaffolderSchema from 'shared/src/schema/scaffolder.schema.json' assert { type: 'json' };
import monitorSchema from 'shared/src/schema/monitor.schema.json' assert { type: 'json' };
import debugSchema from 'shared/src/schema/debug.schema.json' assert { type: 'json' };
import criticSchema from 'shared/src/schema/critic.schema.json' assert { type: 'json' };

export class OrchestratorService {
  private agents: any[] = [];

  constructor(
    private inference: any,
    private memory: any,
    private telemetry: any,
    private metaLearning: any
  ) {}

  public registerAfter(agentName: string, instance: any) {
    if (!this.postAgents) this.postAgents = new Map();
    this.postAgents.set(agentName, [...(this.postAgents.get(agentName) || []), instance]);
  }
  private postAgents: Map<string, any[]> = new Map();

  private agentSchemas: Record<string, object> = {
    PlannerAgent: plannerSchema,
    ScaffolderAgent: scaffolderSchema,
    MonitorAgent: monitorSchema,
    DebuggerAgent: debugSchema,
    CriticAgent: criticSchema,
  };

  async executeAgent(agent: any, params: any, token: any) {
    const breaker = createCircuitBreaker(() => agent.execute(params, token));
    breaker.on('open', () => this.telemetry.trackEvent('breaker.state', { agent: agent.constructor.name, state: 'open' }));
    breaker.on('halfOpen', () => this.telemetry.trackEvent('breaker.state', { agent: agent.constructor.name, state: 'halfOpen' }));
    breaker.on('close', () => this.telemetry.trackEvent('breaker.state', { agent: agent.constructor.name, state: 'close' }));
    let result;
    try {
      result = await breaker.fire();
    } catch (err) {
      this.telemetry.trackEvent('breaker.fallback', { agent: agent.constructor.name, error: (err && typeof err === 'object' && 'message' in err) ? (err as any).message : String(err) });
      result = { result: 'fallback' };
    }
    // Expanded schema validation for all agents with schemas
    const schema = this.agentSchemas[agent.constructor.name];
    if (schema) {
      const validator = new Validator();
      const validate = validator.compile(schema);
      if (!validate(result)) {
        this.telemetry.trackEvent('validation.error', { agent: agent.constructor.name, errors: validate.errors });
        const msg = agent.constructor.name === 'CriticAgent'
          ? 'CriticAgent output failed schema validation'
          : `${agent.constructor.name} output failed schema validation`;
        throw new RocketshipError('ValidationFailed', validate.errors, msg);
      } else {
        this.telemetry.trackEvent('validation.success', { agent: agent.constructor.name });
      }
    }
    return result;
  }

  async runWorkflow(def: any, token: any): Promise<any> {
    for (const agent of this.agents) {
      await agent.execute(def, token);
      const post = this.postAgents.get(agent.constructor.name) || [];
      for (const a of post) await a.execute(def, token);
    }
    throw new Error('runWorkflow not yet implemented');
  }
}
