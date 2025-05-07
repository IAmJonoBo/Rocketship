import { OrchestratorService } from '../OrchestratorService';
import { ConfigService } from '../ConfigService';
import { HybridRetrievalService } from '../HybridRetrievalService';
import { InferenceService } from '../InferenceService';
import { MemoryService } from '../MemoryService';
import { TelemetryService } from '../TelemetryService';
import { MetaLearningController } from '../MetaLearningController';
import { PlannerAgent } from '../../agents/PlannerAgent';
import { CoderAgent } from '../../agents/CoderAgent';
import { CriticAgent } from '../../agents/CriticAgent';
import { TesterAgent } from '../../agents/TesterAgent';
import { CancellationToken } from 'vscode';

jest.mock('../ConfigService');
jest.mock('../HybridRetrievalService');
jest.mock('../InferenceService');
jest.mock('../MemoryService');
jest.mock('../TelemetryService');
jest.mock('../MetaLearningController');
jest.mock('../../agents/PlannerAgent');
jest.mock('../../agents/CoderAgent');
jest.mock('../../agents/CriticAgent');
jest.mock('../../agents/TesterAgent');

describe('OrchestratorService', () => {
  let orchestrator: OrchestratorService;
  let token: CancellationToken;

  beforeEach(() => {
    jest.clearAllMocks();
    orchestrator = new OrchestratorService(
      new ConfigService(),
      new HybridRetrievalService(),
      new InferenceService(),
      new MemoryService(),
      new TelemetryService(),
      new MetaLearningController(),
      new PlannerAgent(new InferenceService()),
      new CoderAgent(new InferenceService()),
      new CriticAgent(new InferenceService()),
      new TesterAgent()
    );
    token = { isCancellationRequested: false, onCancellationRequested: jest.fn() } as any;
  });

  it('should execute the full workflow and return results on happy path', async () => {
    (HybridRetrievalService.prototype.retrieve as jest.Mock).mockResolvedValue([{ id: '1', content: 'ctx' }]);
    (PlannerAgent.prototype.execute as jest.Mock).mockResolvedValue({ tasks: [{ id: 't1', description: 'desc' }] });
    (CoderAgent.prototype.execute as jest.Mock).mockResolvedValue({ code: 'code', diff: '' });
    (CriticAgent.prototype.execute as jest.Mock).mockResolvedValue({ feedback: '', issues: [] });
    (TesterAgent.prototype.execute as jest.Mock).mockResolvedValue({ testResults: [{ testName: 't', passed: true }] });

    const result = await orchestrator.runWorkflow(
      { requirementText: 'req', language: 'ts', testFramework: 'jest' },
      token
    );

    // Debug: print all calls to appendMemory
    // eslint-disable-next-line no-console
    console.log('appendMemory calls:', (MemoryService.prototype.appendMemory as jest.Mock).mock.calls);

    expect(result).toHaveProperty('plan');
    expect(result).toHaveProperty('code');
    expect(TelemetryService.prototype.trackEvent).toHaveBeenCalledWith('workflow.start', expect.any(Object));
    expect(MemoryService.prototype.appendMemory).toHaveBeenCalledTimes(5);
  });

  it('should stop execution when cancelled', async () => {
    token.isCancellationRequested = true;
    await expect(
      orchestrator.runWorkflow({ requirementText: '', language: 'ts', testFramework: 'jest' }, token)
    ).rejects.toThrow();
  });
});
