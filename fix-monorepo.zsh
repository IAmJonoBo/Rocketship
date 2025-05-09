#!/usr/bin/env zsh
set -euo pipefail

echo "🔍 Checking for required commands..."
for cmd in yarn rm grep; do
  if ! command -v $cmd &>/dev/null; then
    echo "‼️  $cmd not found. Please install it and ensure it's in your PATH."
    exit 1
  fi
done

echo "🛠  Fixing barrel exports in extension/src/agents/index.ts..."
AGENTS_BARREL="extension/src/agents/index.ts"
cat > "$AGENTS_BARREL" <<EOF
export { PlannerAgent } from './PlannerAgent.js';
export { CoderAgent } from './CoderAgent.js';
export { CriticAgent } from './CriticAgent.js';
export { TesterAgent } from './TesterAgent.js';
export { ScaffolderAgent } from './ScaffolderAgent.js';
export { DeployerAgent } from './DeployerAgent.js';
export { DebugAgent } from './DebugAgent.js';
export { MonitorAgent } from './MonitorAgent.js';
EOF
echo "✅  Agents barrel exports fixed."

echo "🧹 Cleaning CLI exports in cli/src/index.ts (removing unnecessary agent exports)..."
# Remove any export lines for DebugAgent or MonitorAgent in cli/src/index.ts
sed -i '' '/export { DebugAgent }/d' cli/src/index.ts
sed -i '' '/export { MonitorAgent }/d' cli/src/index.ts
echo "✅  CLI exports cleaned."

echo "🧼 Cleaning build artifacts..."
rm -rf shared/dist packages/core/dist extension/dist cli/dist
find . -name '*.tsbuildinfo' -delete

echo "🔄 Building, linting, and testing the monorepo..."
yarn install
yarn workspaces foreach --topological run tsc --build --verbose
yarn workspaces run lint
yarn workspaces run test --detectOpenHandles

echo "🎉 All issues resolved and pipeline complete!"