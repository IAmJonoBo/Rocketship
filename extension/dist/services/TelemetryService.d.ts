export declare class TelemetryService {
    constructor();
    logEvent(event: string, data?: any): void;
    /**
     * Track a named event with optional properties.
     */
    trackEvent(name: string, properties?: Record<string, any>): void;
    /**
     * Flush any buffered telemetry events.
     */
    flush(): Promise<void>;
}
//# sourceMappingURL=TelemetryService.d.ts.map