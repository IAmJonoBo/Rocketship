import { WorkflowResult, ReflectionReport } from '@rocketship/shared';
export declare class MetaLearningController {
    constructor();
    /**
     * Record feedback for learning (e.g., bandits, LoRA updates).
     */
    recordFeedback(context: any): void;
    /**
     * Run reflexion loops to generate reflection reports.
     */
    runReflexion(result: WorkflowResult): Promise<ReflectionReport>;
}
