// Re-export all TypeScript interfaces and types
export * from './types/index.js';
// (Optional) If you need to import the JSON schema at runtime,
// you can export it here. Otherwise, you can leave this out.
import schema from './schema/rocketship.schema.json' with { type: 'json' };
export { schema as rocketshipSchema };
