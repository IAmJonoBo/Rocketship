/**
 * © 2025 Rocketship Contributors
 * Licensed under the Apache-2.0 License.
 */
import CircuitBreaker from 'opossum';
export declare function createCircuitBreaker(action: () => Promise<any>): CircuitBreaker<[], any>;
export declare class RocketshipError extends Error {
    code: string;
    context: any;
    constructor(code: string, context: any, message?: string);
}
export declare class AdaptiveSemaphore {
}
//# sourceMappingURL=helpers.d.ts.map