// HybridRetrievalService provides data retrieval capabilities
// See docs/Data & Retrieval Pipeline Documentation.md

import { connect } from "@lancedb/lancedb";
import { ContextChunk } from '@rocketship/shared';
import { watch } from 'chokidar';
import { pruneDuplicates } from '../helpers/duplication.js';
import { chunkFile } from '../helpers/chunking.js';
import { embedFile } from '../helpers/embedding.js';

export class HybridRetrievalService {
  private db: any;
  constructor(private vectorStore: any, private serviceConfig: { latencyTarget: number }, private workspaceRoot: string, private telemetry?: any) {
    this.init();
    // Watch for new/changed .ts and .js files
    watch(['**/*.ts', '**/*.js'], { cwd: this.workspaceRoot })
      .on('add', path => this.ingestFile(path))
      .on('change', path => this.ingestFile(path));
  }

  private async init() {
    this.db = await connect("data/rocketship-db");
  }

  /**
   * Retrieve context chunks via graph and vector search.
   */
  async retrieve(query: string): Promise<ContextChunk[]> {
    // Compute K based on latency target
    const k = this.serviceConfig.latencyTarget < 1000 ? 3 : 5;
    let chunks = await this.vectorStore.retrieve(query, k);
    const before = chunks.length;
    chunks = pruneDuplicates(chunks, 0.9);
    const after = chunks.length;
    if (this.telemetry) {
      this.telemetry.trackEvent('retrieval', { query, k, before, after, deduped: before - after });
    }
    return chunks;
  }

  async ingestFile(path: string) {
    try {
      const chunks = await chunkFile(path); // [{ text, start, end }]
      const embeddings = await embedFile(chunks); // [{ embedding, text, start, end }]
      // Upsert into LanceDB
      for (const chunk of embeddings) {
        await this.db.upsert({
          id: `${path}:${chunk.start}-${chunk.end}`,
          embedding: chunk.embedding,
          text: chunk.text,
          path,
          start: chunk.start,
          end: chunk.end
        });
      }
      if (this.telemetry) {
        this.telemetry.trackEvent('ingest.success', { path, chunks: embeddings.length });
      }
    } catch (err) {
      if (this.telemetry) {
        this.telemetry.trackEvent('ingest.error', { path, error: (err as any)?.message || String(err) });
      }
    }
  }
}