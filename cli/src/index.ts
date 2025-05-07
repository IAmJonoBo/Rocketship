// CLI entrypoint for Rocketship
// See docs/Agent & API Documentation.md for command details
import { Command } from 'commander';
import { OrchestratorService } from '../../extension/src/services/OrchestratorService';
import { ConfigService } from '../../extension/src/services/ConfigService';
import { HybridRetrievalService } from '../../extension/src/services/HybridRetrievalService';
import { InferenceService } from '../../extension/src/services/InferenceService';
import { MemoryService } from '../../extension/src/services/MemoryService';
import { TelemetryService } from '../../extension/src/services/TelemetryService';
import { MetaLearningController } from '../../extension/src/services/MetaLearningController';
import { PlannerAgent } from '../../extension/src/agents/PlannerAgent';
import { CoderAgent } from '../../extension/src/agents/CoderAgent';
import { CriticAgent } from '../../extension/src/agents/CriticAgent';
import { TesterAgent } from '../../extension/src/agents/TesterAgent';

const program = new Command();
const configSvc = new ConfigService();
const retrieval = new HybridRetrievalService();
const inference = new InferenceService();
const memory = new MemoryService();
const telemetry = new TelemetryService();
const meta = new MetaLearningController();
const planner = new PlannerAgent(inference);
const coder = new CoderAgent(inference);
const critic = new CriticAgent(inference);
const tester = new TesterAgent();
const orchestrator = new OrchestratorService(
  configSvc, retrieval, inference, memory, telemetry, meta,
  planner, coder, critic, tester
);

program
  .name('rocketship')
  .description('Rocketship CLI Companion')
  .version('0.1.0');

program
  .command('plan')
  .description('Generate a plan from requirements')
  .requiredOption('-i, --input <file>', 'Markdown or text file with requirements')
  .action(async opts => {
    try {
      const req = await import('fs/promises').then(fs => fs.readFile(opts.input, 'utf-8'));
      const token = { isCancellationRequested: false } as any;
      const { plan } = await orchestrator.runWorkflow({ requirementText: req, language: 'ts', testFramework: 'jest' }, token);
      console.log(JSON.stringify(plan, null, 2));
    } catch (err) {
      console.error('Error:', err);
      process.exit(1);
    }
  });

program
  .command('code')
  .description('Produce code stubs for a plan JSON')
  .requiredOption('-p, --plan <file>', 'Plan JSON file')
  .action(async opts => {
    try {
      const plan = JSON.parse(await import('fs/promises').then(fs => fs.readFile(opts.plan, 'utf-8')));
      const token = { isCancellationRequested: false } as any;
      for (const task of plan.tasks) {
        const { code } = await orchestrator.runWorkflow(
          { requirementText: '', language: 'ts', testFramework: 'jest' },
          token
        );
        console.log(`// Task ${task.id}\n${code}\n`);
      }
    } catch (err) {
      console.error('Error:', err);
      process.exit(1);
    }
  });

program
  .command('test')
  .description('Generate and run tests for a code file')
  .requiredOption('-f, --file <path>', 'Path to code file')
  .action(async opts => {
    try {
      const code = await import('fs/promises').then(fs => fs.readFile(opts.file, 'utf-8'));
      const token = { isCancellationRequested: false } as any;
      const { testResults } = await tester.execute({ code, testFramework: 'jest', sessionId: 'cli' }, token);
      console.table(testResults);
    } catch (err) {
      console.error('Error:', err);
      process.exit(1);
    }
  });

program
  .command('diagnose')
  .description('Run self-diagnostics checks')
  .action(async () => {
    // TODO: hook into DiagnosticService to validate config, connectivity, thresholds
    console.log('Diagnostics not yet implemented.');
  });

program.parse(process.argv);