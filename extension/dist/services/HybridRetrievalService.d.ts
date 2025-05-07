import { ContextChunk } from '@rocketship/shared';
export declare class HybridRetrievalService {
    constructor();
    /**
     * Retrieve context chunks via graph and vector search.
     */
    retrieve(query: string, options?: any): Promise<ContextChunk[]>;
}
//# sourceMappingURL=HybridRetrievalService.d.ts.map