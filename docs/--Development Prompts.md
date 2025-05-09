Below is a multi-stage integration and implementation strategy, distilled into crystal-clear, actionable prompts for your LLM agent. Each stage builds on the last, ensures no accidental deletions, and lays down both scaffolding and guidance so that the agent can begin coding immediately. Citations provide authoritative backing for each best practice.

⸻

Stage 1: Verify Monorepo Integrity & ESM Build

Prompt to Agent:
 1. Run:

git status --short

Confirm no source files under shared/src, packages/core/src, extension/src, or cli/src are missing or untracked.
If any are missing, restore:

git checkout HEAD -- <path/to/file>

 2. Purge all previous build outputs:

rm -rf shared/dist packages/core/dist extension/dist cli/dist

 3. Execute a composite build:

tsc --build --verbose

 4. Verify each project (shared, core, extension, cli) reports “built successfully” and that each dist/ directory contains both .js and .d.ts files.
 5. Ensure packages needing ESM (e.g., CLI, core, extension) have "type":"module" in their package.json.
 6. If any files still emit exports.Foo = Foo;, correct the closest tsconfig.json to:

{
  "compilerOptions": {
    "module": "nodenext",
    "target": "es2022",
    "moduleResolution": "nodenext",
    "rootDir": "src",
    "outDir": "dist",
    "declaration": true,
    "composite": true
  }
}

￼  ￼

⸻

Stage 2: Scaffold & Publish Shared and Core Packages

Prompt to Agent:
 1. In packages/core/:
 • Create package.json:

{
  "name": "@rocketship/core",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "type": "module"
}

 • Ensure tsconfig.json extends the root, with:

{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "rootDir": "src",
    "outDir": "dist",
    "module": "nodenext",
    "declaration": true
  },
  "include": ["src", "schemas"]
}

 • In src/index.ts, re-export:

export *from './OrchestratorService.js';
export* from './InferenceService.js';
export * from './helpers/CircuitBreakerFactory.js';
// …etc.

 2. In shared/:
 • Mirror the above for @rocketship/shared, include "resolveJsonModule": true.
 • Place JSON schemas under schemas/.
 3. Update tsconfig.base.json paths:

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@rocketship/shared": [
        "shared/dist/index.d.ts",
        "shared/src/index.ts"
      ],
      "@rocketship/core": [
        "packages/core/dist/index.js",
        "packages/core/src/index.ts"
      ]
    }
  }
}

 4. Build core and shared:

tsc -b shared
tsc -b packages/core

￼  ￼

⸻

Stage 3: Inject Circuit-Breaker & Retry

Prompt to Agent:
 1. Install opossum:

pnpm add -w packages/core opossum

 2. Create packages/core/src/helpers/CircuitBreakerFactory.ts:

import CircuitBreaker from 'opossum';
export function createCircuitBreaker<T>(
  fn: () => Promise<T>
) {
  const options = { timeout: 30_000, errorThresholdPercentage: 50, resetTimeout: 60_000 };
  return new CircuitBreaker(fn, options);
}

 3. In OrchestratorService, wrap each agent.execute:

import { createCircuitBreaker } from './helpers/CircuitBreakerFactory.js';
const breaker = createCircuitBreaker(() => agent.execute(params, token));
const result = await breaker.fire().catch(err => handleFallback(err));

 4. Standardise errors:

interface RocketshipError { code: string; message: string; context: any; }

⸻

Stage 4: Enforce JSON-Schema Validation

Prompt to Agent:
 1. Install ajv:

pnpm add -w packages/core ajv

 2. Create packages/core/schemas/plan.schema.json and error.schema.json with your specs.
 3. Build packages/core/src/helpers/Validator.ts:

import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });
const schemas = {
  plan: require('../schemas/plan.schema.json'),
  error: require('../schemas/error.schema.json')
};
export function validateOutput<T>(type: keyof typeof schemas, data: T): asserts data is T {
  const valid = ajv.compile(schemas[type])(data);
  if (!valid) throw new Error(`Validation failed: ${ajv.errorsText()}`);
}

 4. In each agent’s execute, invoke:

validateOutput('plan', output);

⸻

Stage 5: Hybrid Retrieval & Vector Store

Prompt to Agent:
 1. Install @lancedb/sdk:

pnpm add -w extension @lancedb/sdk

 2. In extension/src/services/HybridRetrievalService.ts:

import { connect } from '@lancedb/sdk';
export class HybridRetrievalService {
  private db = await connect('data/embeddings');
  async retrieve(query: string, options?: { k?: number }) {
    const embed = await this.embedder.embed(query);
    const table = await this.db.table('chunks');
    const res = await table.search(embed, { limit: options?.k ?? 10 });
    return res.hits.map(h => ({ id: h.id, snippet: h.source.snippet }));
  }
}

 3. Implement FS watcher to update on-save and prune >90% similarity.

⸻

Stage 6: Sandboxed Inference with Testcontainers

Prompt to Agent:
 1. Install testcontainers:

pnpm add -w extension testcontainers

 2. Create extension/src/helpers/TestSandbox.ts:

import { GenericContainer } from 'testcontainers';
export async function withSandbox<T>(fn: (cwd: string)=>Promise<T>): Promise<T> {
  const container = await new GenericContainer('node:18')
    .withBindMount(process.cwd(), '/workspace', { mode: 'rw' })
    .start();
  try { return await fn('/workspace'); }
  finally { await container.stop(); }
}

 3. Wrap TesterAgent and DebugAgent calls inside withSandbox.

⸻

Stage 7: Introduce Standalone Agents

Prompt to Agent:
 1. ScaffolderAgent in extension/src/agents/ScaffolderAgent.ts:

export class ScaffolderAgent {
  async execute(tasks: Task[], token: CancellationToken) {
    // generate folder/file skeleton
    return { createdFiles: tasks.map(t => `src/${t.id}.ts`) };
  }
}

 2. DeployerAgent in extension/src/agents/DeployerAgent.ts:

export class DeployerAgent {
  async execute(artifact: CodeArtifact, token: CancellationToken) {
    // emit Dockerfile, CI YAML
    return { deploymentPlan: `docker run ${artifact.image}` };
  }
}

 3. Add JSON schemas and unit tests under __tests__.

⸻

Stage 8: Prompt Template Governance

Prompt to Agent:
 1. Ensure extension/.template-lintrc.js has:

module.exports = {
  rules: { 'no-unbound-raw-mustaches': true, 'no-userinput-in-system': true }
};

 2. In .github/workflows/ci.yml, add:

- name: Lint prompt templates
  run: npx handlebars-lint "extension/src/prompts/**/*.tpl"

 3. Embed {{gitSHA}} in each .tpl header and emit via TelemetryService.trackEvent('prompt.version', { gitSHA }).

⸻

Stage 9: CI/CD, Observability & Telemetry

Prompt to Agent:
 1. ci.yml enhancements:

- name: Generate mocks
  run: pnpm exec ts-node packages/core/scripts/gen-mocks.ts
- name: Validate mocks
  run: pnpm exec ts-node packages/core/scripts/validate-mocks.ts

 2. bench.yml:

- run: pnpm exec bench
  id: bench
  continue-on-error: true

 3. release.yml:

- run: pnpm exec semantic-release

 4. Populate observability/dashboards/ with per-agent Grafana JSON and AlertRules:

- alert: PlanLatencyHigh
  expr: histogram_quantile(0.95, sum(rate(agent_duration_seconds_bucket{agent="Planner"}[5m])) by (le))
  for: 5m
  labels: { severity: warning }

⸻

Stage 10: Update Roadmap & Next Milestones

Prompt to Agent:
 1. In docs/Project_Roadmap.md, append new milestones and dependencies:
 • M9: Circuit-Breaker & Retry (Week 14)
 • M10: JSON-Schema Validation (Week 15)
 • M11: HybridRetrieval & LanceDB (Week 16)
 • M12: Testcontainers Sandbox (Week 17)
 • M13: Scaffolder & Deployer Agents (Week 18)
 • M14: Prompt Governance in CI (Week 19)
 • M15: Observability & Alerts (Week 20)
 2. Ensure each entry lists objective, deliverable, dependencies, and owner.
 3. Commit changes and push to main.
￼

⸻

Feeding each prompt sequentially, validating output and tests before moving on, will guide your LLM agent to implement Rocketship’s advanced feature set robustly, incrementally, and in alignment with your architectural vision—without bloat or missing dependencies.
