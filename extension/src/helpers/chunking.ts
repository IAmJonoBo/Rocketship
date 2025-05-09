// TODO: Replace line-based chunking with token-based chunking for better embedding alignment.

import { promises as fs } from 'fs';

/**
 * Splits a file into chunks of N lines (default 50).
 * TODO: Replace with token-based chunking for better embedding alignment.
 */
export async function chunkFile(path: string, linesPerChunk = 50): Promise<{ text: string, start: number, end: number }[]> {
  const content = await fs.readFile(path, 'utf8');
  const lines = content.split('\n');
  const chunks = [];
  for (let i = 0; i < lines.length; i += linesPerChunk) {
    const chunkLines = lines.slice(i, i + linesPerChunk);
    chunks.push({
      text: chunkLines.join('\n'),
      start: i,
      end: Math.min(i + linesPerChunk, lines.length)
    });
  }
  return chunks;
}
