import CircuitBreaker from 'opossum';

export function createCircuitBreaker<T>(fn: () => Promise<T>) {
  return new CircuitBreaker(fn, {
    timeout: 30000,
    errorThresholdPercentage: 50,
    resetTimeout: 60000,
    maxFailures: 5
  });
}