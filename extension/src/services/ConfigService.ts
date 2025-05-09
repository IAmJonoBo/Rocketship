// ConfigService manages configuration loading and validation
// See docs/Configuration & Schema Documentation.md
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import AjvModule from 'ajv';
import schema from '../../../shared/src/schema/rocketship.schema.json' assert { type: 'json' };

const DEFAULT_CONFIG = {
  global: {
    modelProvider: 'local',
    maxConcurrentAgents: 2,
    requestTimeoutMs: 120000,
    enableTelemetry: true,
  },
  agents: {
    PlannerAgent: { enabled: true },
    CoderAgent: { enabled: true },
    CriticAgent: { enabled: true },
    TesterAgent: { enabled: true },
  },
  retrieval: {
    vector: { chunkSize: 256, overlap: 128 },
    graph: { parser: 'tree-sitter' },
  },
};

const Ajv = (AjvModule as any).default || AjvModule;

export class ConfigService {
  private config: any = DEFAULT_CONFIG;
  private configPath: string;
  private ajv = new Ajv({ allErrors: true });
  private validate = this.ajv.compile(schema);

  constructor(configPath?: string) {
    this.configPath = configPath || path.resolve(process.cwd(), 'rocketship.yaml');
    this.loadConfig();
  }

  loadConfig() {
    let loadedConfig = {};
    try {
      if (fs.existsSync(this.configPath)) {
        const file = fs.readFileSync(this.configPath, 'utf8');
        loadedConfig = yaml.load(file) || {};
      }
    } catch (err: any) {
      console.warn(`[ConfigService] Failed to load config: ${err.message}`);
      this.config = DEFAULT_CONFIG;
      return this.config;
    }
    // Validate config
    if (!this.validate(loadedConfig)) {
      console.warn('[ConfigService] Config validation failed:', this.validate.errors);
      // Soft fallback: merge valid parts, fallback to defaults for invalid
      this.config = this.mergeWithDefaults(loadedConfig, DEFAULT_CONFIG);
    } else {
      this.config = loadedConfig;
    }
    return this.config;
  }

  getConfig() {
    return this.config;
  }

  // Recursively merge loaded config with defaults, using defaults for missing/invalid fields
  private mergeWithDefaults(loaded: any, defaults: any): any {
    if (typeof defaults !== 'object' || defaults === null) return loaded;
    const merged: any = Array.isArray(defaults) ? [] : {};
    for (const key of Object.keys(defaults)) {
      if (loaded && Object.prototype.hasOwnProperty.call(loaded, key)) {
        if (typeof defaults[key] === 'object' && defaults[key] !== null) {
          merged[key] = this.mergeWithDefaults(loaded[key], defaults[key]);
        } else {
          merged[key] = loaded[key];
        }
      } else {
        merged[key] = defaults[key];
      }
    }
    return merged;
  }
}