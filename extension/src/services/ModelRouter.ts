// ModelRouter: Handles model routing, cache lookup, async load, and device placement
// See docs/architecture.md and resilience.md

export interface ModelStatus {
  status: 'loaded' | 'loading' | 'failed';
  etaSeconds?: number;
  message?: string;
}

export class ModelRouter {
  constructor(private supervisor: any, private config: any) {}

  async routeInference(modelName: string, params: any): Promise<ModelStatus> {
    // TODO: Check supervisor.modelManager cache
    // If loaded, return { status: 'loaded' }
    // If loading, return { status: 'loading', etaSeconds, message }
    // If not loaded, trigger async load and return warming status
    return { status: 'loading', etaSeconds: 5, message: 'Model is warming up' };
  }

  async unloadModel(modelName: string): Promise<ModelStatus> {
    // TODO: Unload model via supervisor.modelManager
    return { status: 'unloaded', message: 'Model unloaded' } as any;
  }

  getModelStatus(modelName: string): ModelStatus {
    // TODO: Return current status from supervisor.modelManager
    return { status: 'loaded' };
  }

  // Support for whileLoading config
  getWhileLoadingAction(agentName: string): any {
    // TODO: Read from config.agents[agentName].whileLoading
    return null;
  }

  // Device placement logic
  getDevicePlacement(modelName: string): string[] {
    // TODO: Auto-detect or use config.devices
    return ['auto'];
  }
}