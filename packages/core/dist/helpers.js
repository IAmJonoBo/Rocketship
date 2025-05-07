/**
 * © 2025 Rocketship Contributors
 * Licensed under the Apache-2.0 License.
 */
import CircuitBreaker from 'opossum';
export function createCircuitBreaker(action) {
    const options = { errorThresholdPercentage: 50, resetTimeout: 30_000, timeout: 60_000 };
    const breaker = new CircuitBreaker(action, options);
    // TODO: Add fallback, telemetry, and lazy-load localLoRAModel
    return breaker;
}
export class RocketshipError extends Error {
    code;
    context;
    constructor(code, context, message) {
        super(message);
        this.code = code;
        this.context = context;
        this.name = 'RocketshipError';
    }
}
// AdaptiveSemaphore stub
export class AdaptiveSemaphore {
}
