import { ConfigService } from './services/ConfigService.js';
import { HybridRetrievalService } from './services/HybridRetrievalService.js';
import { InferenceService } from './services/InferenceService.js';
import { MemoryService } from './services/MemoryService.js';
import { TelemetryService } from './services/TelemetryService.js';
import { MetaLearningController } from './services/MetaLearningController.js';
import { ScaffolderAgent } from './agents/ScaffolderAgent.js';
import { CoderAgent } from './agents/CoderAgent.js';
import { CriticAgent } from './agents/CriticAgent.js';
import { TesterAgent } from './agents/TesterAgent.js';
import { DeployerAgent } from './agents/DeployerAgent.js';
import { DebugAgent } from './agents/DebugAgent.js';
import { MonitorAgent } from './agents/MonitorAgent.js';
import { PlannerAgent } from './agents/PlannerAgent.js';
import { OrchestratorService } from './services/OrchestratorService.js';

// Mocks / placeholders until real implementations are wired:
const vectorStore = {};
const serviceConfig = { latencyTarget: 1000 };
const workspaceRoot = process.cwd();

const configService = new ConfigService();
const retrieval = new HybridRetrievalService(vectorStore, serviceConfig, workspaceRoot);
const inference = new InferenceService();
const memory = new MemoryService();
const telemetry = new TelemetryService();
const metaLearning = new MetaLearningController();
const scaffolder = new ScaffolderAgent(/* TODO: pass configService if needed */);
const planner = new PlannerAgent(inference /* TODO: pass configService if needed */);
const coder = new CoderAgent(inference /* TODO: pass configService if needed */);
const critic = new CriticAgent(inference /* TODO: pass configService if needed */);
const tester = new TesterAgent(/* TODO: pass configService if needed */);
const deployer = new DeployerAgent(/* TODO: pass configService if needed */);

const debug = new DebugAgent(inference, tester, telemetry /* TODO: pass configService if needed */);
const monitor = new MonitorAgent(inference, telemetry, memory /* TODO: pass configService if needed */);

const orchestrator = new OrchestratorService(
  configService,
  retrieval,
  inference,
  memory,
  telemetry,
  metaLearning,
  planner,
  coder,
  critic,
  tester
);

// VS Code Extension Entrypoint
// See docs/Agent & API Documentation.md and docs/Onboarding & Handover Documentation.md
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Register commands and initialize services here
  vscode.window.showInformationMessage('Rocketship extension activated!');
}

export function deactivate() {
  // Cleanup resources if needed
}