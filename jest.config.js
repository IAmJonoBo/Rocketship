import preset from 'ts-jest/presets/default-esm/jest-preset.js';

export default {
  ...preset,
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(test|spec).+(ts|mts)'],
  moduleFileExtensions: ['ts','mts','tsx','js','jsx','mjs'],
  extensionsToTreatAsEsm: ['.ts','.mts','.tsx'],
  testPathIgnorePatterns: ['/dist/'],
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
};