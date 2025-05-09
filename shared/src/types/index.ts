// Barrel export for shared types
export type PlaceholderType = {};

// Shared types for Rocketship

export interface ContextChunk {
  id: string;
  snippet: string;
  sourceFile: string;
  lineRange: { start: number; end: number };
  score?: number;
}

export interface WorkflowResult {
  plan: any;
  code: any;
  critique: any;
  testResults: any;
}

export interface ReflectionReport {
  summary: string;
  insights?: string[];
  actions?: string[];
}

/** Defines an issue reported by CriticAgent */
export interface Issue {
  line: number;
  message: string;
  severity: 'info' | 'warning' | 'error';
}

export interface DebugReport {
  originalErrors: Issue[];
  testResults: Array<{ testName: string; passed: boolean; error?: string }>;
}

export interface Suggestion {
  description: string;
  severity: 'info' | 'warning' | 'critical';
  actionable: boolean;
}

export interface MonitorReport {
  insights: string;
  suggestions: Suggestion[];
}