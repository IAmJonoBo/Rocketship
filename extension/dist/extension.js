// VS Code Extension Entrypoint
// See docs/Agent & API Documentation.md and docs/Onboarding & Handover Documentation.md
import * as vscode from 'vscode';
import { OrchestratorService } from '@rocketship/core';
import { InferenceService } from './services/InferenceService.js';
import { HybridRetrievalService } from './services/HybridRetrievalService.js';
import { PlannerAgent } from './agents/PlannerAgent.js';
import { CoderAgent } from './agents/CoderAgent.js';
import { CriticAgent } from './agents/CriticAgent.js';
import { TesterAgent } from './agents/TesterAgent.js';
import { MemoryService } from './services/MemoryService.js';
import { TelemetryService } from './services/TelemetryService.js';
import { MetaLearningController } from './services/MetaLearningController.js';
export function activate(context) {
    // Register commands and initialize services here
    const inference = new InferenceService();
    const orchestrator = new OrchestratorService(new HybridRetrievalService(), new PlannerAgent(inference), new CoderAgent(inference), new CriticAgent(inference), new TesterAgent(), new MemoryService(), new TelemetryService(), new MetaLearningController());
    vscode.window.showInformationMessage('Rocketship extension activated!');
}
export function deactivate() {
    // Cleanup resources if needed
}
