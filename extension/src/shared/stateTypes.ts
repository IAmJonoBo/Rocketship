// Shared types for state snapshot and error reports
// Used by StateStore, SupervisorService, and agents

export interface StateSnapshot {
  timestamp: number;
  state: any; // TODO: Replace 'any' with a more specific type as needed
}

export interface ErrorReport {
  id?: string;
  agentName: string;
  error: string;
  stack?: string;
  timestamp: number;
  context?: any;
  resolved?: boolean;
  fixScript?: string;
}