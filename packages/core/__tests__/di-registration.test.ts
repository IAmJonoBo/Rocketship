import fs from 'fs';
import path from 'path';

describe('DI Registration Audit', () => {
  const coreSrc = path.resolve(__dirname, '../src');
  const agentClasses = [
    'PlannerAgent',
    'CoderAgent',
    'CriticAgent',
    'TesterAgent',
    'ScaffolderAgent',
    'DeployerAgent',
    'DebuggerAgent',
    'MonitorAgent',
    'DocsAgent',
  ];

  it('should not directly instantiate core agents/services (use DI)', () => {
    const files = fs.readdirSync(coreSrc).filter(f => f.endsWith('.ts'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(coreSrc, file), 'utf8');
      for (const agent of agentClasses) {
        expect(content).not.toMatch(new RegExp(`new ${agent}\\s*\(`));
      }
    }
  });
});