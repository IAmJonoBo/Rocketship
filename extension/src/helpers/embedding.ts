// TODO: Replace mock embedding with real embedding model integration (OpenAI, HuggingFace, or local).

/**
 * Mock embedFile helper: returns a random vector for each chunk.
 * TODO: Replace with real embedding model integration (e.g., OpenAI, HuggingFace, local model).
 */
export async function embedFile(chunks: { text: string, start: number, end: number }[]): Promise<{ embedding: number[], text: string, start: number, end: number }[]> {
  return chunks.map(chunk => ({
    ...chunk,
    embedding: Array.from({ length: 384 }, () => Math.random()) // 384-dim mock vector
  }));
}