// defensiveMiddleware: Wraps agent execute methods with retries, schema validation, and error handling
// Configurable per agent via rocketship.yaml

export function defensiveMiddleware(agentName: string, config: any, executeFn: Function) {
  return async function(...args: any[]) {
    const defense = config.agents?.[agentName]?.defense || {};
    let attempts = 0;
    const maxRetries = defense.retries || 0;
    while (attempts <= maxRetries) {
      try {
        // TODO: Schema validation before/after if enabled
        return await executeFn(...args);
      } catch (err) {
        attempts++;
        if (attempts > maxRetries) {
          // TODO: Log error, escalate to SupervisorService
          throw err;
        }
      }
    }
  };
}