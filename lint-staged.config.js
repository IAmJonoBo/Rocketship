export default {
  '**/*.{ts,tsx}': [
    'eslint --fix',
    'npm test --workspaces --if-present'
  ]
};