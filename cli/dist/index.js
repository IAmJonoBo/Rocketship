"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// CLI entrypoint for Rocketship
// See docs/Agent & API Documentation.md for command details
const commander_1 = require("commander");
const OrchestratorService_1 = require("../../extension/src/services/OrchestratorService");
const ConfigService_1 = require("../../extension/src/services/ConfigService");
const HybridRetrievalService_1 = require("../../extension/src/services/HybridRetrievalService");
const InferenceService_1 = require("../../extension/src/services/InferenceService");
const MemoryService_1 = require("../../extension/src/services/MemoryService");
const TelemetryService_1 = require("../../extension/src/services/TelemetryService");
const MetaLearningController_1 = require("../../extension/src/services/MetaLearningController");
const PlannerAgent_1 = require("../../extension/src/agents/PlannerAgent");
const CoderAgent_1 = require("../../extension/src/agents/CoderAgent");
const CriticAgent_1 = require("../../extension/src/agents/CriticAgent");
const TesterAgent_1 = require("../../extension/src/agents/TesterAgent");
const program = new commander_1.Command();
const configSvc = new ConfigService_1.ConfigService();
const retrieval = new HybridRetrievalService_1.HybridRetrievalService();
const inference = new InferenceService_1.InferenceService();
const memory = new MemoryService_1.MemoryService();
const telemetry = new TelemetryService_1.TelemetryService();
const meta = new MetaLearningController_1.MetaLearningController();
const planner = new PlannerAgent_1.PlannerAgent(inference);
const coder = new CoderAgent_1.CoderAgent(inference);
const critic = new CriticAgent_1.CriticAgent(inference);
const tester = new TesterAgent_1.TesterAgent();
const orchestrator = new OrchestratorService_1.OrchestratorService(configSvc, retrieval, inference, memory, telemetry, meta, planner, coder, critic, tester);
program
    .name('rocketship')
    .description('Rocketship CLI Companion')
    .version('0.1.0');
program
    .command('plan')
    .description('Generate a plan from requirements')
    .requiredOption('-i, --input <file>', 'Markdown or text file with requirements')
    .action(async (opts) => {
    try {
        const req = await Promise.resolve().then(() => __importStar(require('fs/promises'))).then(fs => fs.readFile(opts.input, 'utf-8'));
        const token = { isCancellationRequested: false };
        const { plan } = await orchestrator.runWorkflow({ requirementText: req, language: 'ts', testFramework: 'jest' }, token);
        console.log(JSON.stringify(plan, null, 2));
    }
    catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
});
program
    .command('code')
    .description('Produce code stubs for a plan JSON')
    .requiredOption('-p, --plan <file>', 'Plan JSON file')
    .action(async (opts) => {
    try {
        const plan = JSON.parse(await Promise.resolve().then(() => __importStar(require('fs/promises'))).then(fs => fs.readFile(opts.plan, 'utf-8')));
        const token = { isCancellationRequested: false };
        for (const task of plan.tasks) {
            const { code } = await orchestrator.runWorkflow({ requirementText: '', language: 'ts', testFramework: 'jest' }, token);
            console.log(`// Task ${task.id}\n${code}\n`);
        }
    }
    catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
});
program
    .command('test')
    .description('Generate and run tests for a code file')
    .requiredOption('-f, --file <path>', 'Path to code file')
    .action(async (opts) => {
    try {
        const code = await Promise.resolve().then(() => __importStar(require('fs/promises'))).then(fs => fs.readFile(opts.file, 'utf-8'));
        const token = { isCancellationRequested: false };
        const { testResults } = await tester.execute({ code, testFramework: 'jest', sessionId: 'cli' }, token);
        console.table(testResults);
    }
    catch (err) {
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
