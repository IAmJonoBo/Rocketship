/**
 * © 2025 Rocketship Contributors
 * Licensed under the Apache-2.0 License.
 */

import CircuitBreaker from 'opossum';

export function createCircuitBreaker(action: () => Promise<any>) {
  const options = { errorThresholdPercentage: 50, resetTimeout: 30_000, timeout: 60_000 };
  const breaker = new CircuitBreaker(action, options);
  // TODO: Add fallback, telemetry, and lazy-load localLoRAModel
  return breaker;
}

export class RocketshipError extends Error {
  code: string;
  context: any;
  constructor(code: string, context: any, message: string) {
    super(message);
    this.name = 'RocketshipError';
    this.code = code;
    this.message = message;
    this.context = context;
  }
}

// AdaptiveSemaphore stub
export class AdaptiveSemaphore {
  // TODO: Implement adaptive concurrency logic
}

// Also export the interface for type safety
export interface IRocketshipError {
  code: string;
  message: string;
  context: any;
}
