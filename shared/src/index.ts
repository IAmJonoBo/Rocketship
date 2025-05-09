// Re-export all TypeScript interfaces and types
export * from './types/index.js';

// (Optional) If you need to import the JSON schema at runtime,
// you can export it here. Otherwise, you can leave this out.
import schema from './schema/rocketship.schema.json' with { type: 'json' };
export { schema as rocketshipSchema };

// Export available agent schemas (add more as they are created)
import criticSchema from './schema/critic.schema.json' with { type: 'json' };
import issueSchema from './schema/issue.schema.json' with { type: 'json' };
export { criticSchema, issueSchema };
// TODO: Add plannerSchema, coderSchema, scaffolderSchema, testerSchema as they are created