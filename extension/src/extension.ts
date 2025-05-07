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