// HybridRetrievalService provides data retrieval capabilities
// See docs/Data & Retrieval Pipeline Documentation.md
import { connect } from "@lancedb/lancedb";
export class HybridRetrievalService {
    db;
    constructor() {
        this.init();
    }
    async init() {
        this.db = await connect("data/rocketship-db");
    }
    /**
     * Retrieve context chunks via graph and vector search.
     */
    async retrieve(query, options) {
        // TODO: vectorize query, call vector_search, map to ContextChunk
        return [];
    }
}
