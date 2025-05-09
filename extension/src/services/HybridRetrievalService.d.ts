import { ContextChunk } from '@rocketship/shared';
export declare class HybridRetrievalService {
    private db;
    constructor();
    private init;
    /**
     * Retrieve context chunks via graph and vector search.
     */
    retrieve(query: string, options?: any): Promise<ContextChunk[]>;
}
//# sourceMappingURL=HybridRetrievalService.d.ts.map