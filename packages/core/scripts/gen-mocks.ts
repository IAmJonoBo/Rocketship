/**
 * © 2025 Rocketship Contributors
 * Licensed under the Apache-2.0 License.
 */

// CI: Run this script nightly to refresh plan mocks and validate against schema
import jsf from 'json-schema-faker';
import fs from 'fs';
import planSchema from '../schemas/plan.schema.json' with { type: "json" };

const mock = jsf.generate(planSchema as any);
fs.writeFileSync('../__fixtures__/plan.mock.json', JSON.stringify(mock, null, 2));
// TODO: Validate generated mock against schema and fail if invalid
