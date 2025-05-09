// ApiServer: Exposes HTTP endpoints for model management
// Implements token-based auth for CLI/external tools
// See docs/architecture.md and resilience.md

import http from 'http';

export class ApiServer {
  constructor(private supervisor: any, private config: any) {}

  start(port = 8080) {
    // TODO: Start HTTP server, route requests
  }

  // --- Endpoint stubs ---
  async handleLoadModel(req: any, res: any) {
    // TODO: Auth check, parse model name, call supervisor.modelManager.loadModel
  }

  async handleUnloadModel(req: any, res: any) {
    // TODO: Auth check, parse model name, call supervisor.modelManager.unloadModel
  }

  async handleModelStatus(req: any, res: any) {
    // TODO: Auth check, return model status from supervisor.modelManager
  }

  // --- Auth helper ---
  isAuthorized(req: any): boolean {
    // TODO: Check X-Rocketship-Token header against config or env
    return true;
  }
}