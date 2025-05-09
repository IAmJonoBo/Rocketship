import { ContextChunk } from '@rocketship/shared';

// Dummy cosine similarity for illustration; replace with real implementation
function cosineSimilarity(a: string, b: string): number {
  // TODO: Use a real embedding/cosine similarity function
  return a === b ? 1 : 0;
}

export function pruneDuplicates(chunks: ContextChunk[], threshold: number): ContextChunk[] {
  const unique: ContextChunk[] = [];
  for (const chunk of chunks) {
    if (!unique.some(u => cosineSimilarity(u.snippet, chunk.snippet) > threshold)) {
      unique.push(chunk);
    }
  }
  return unique;
}