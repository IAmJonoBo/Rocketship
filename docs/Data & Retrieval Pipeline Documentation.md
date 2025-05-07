

# Data & Retrieval Pipeline Documentation

This document details the ingestion, indexing, and retrieval architecture for Rocketship’s hybrid RAG pipeline, combining a Programming Knowledge Graph (PKG) and vector embeddings to deliver precise, context-rich results.

---

## 1. Data Flow Specification

### 1.1 PKG Graph Ingestion
- **Source Extraction:** Parse the codebase ASTs with a language-agnostic parser (e.g., Tree-sitter) to extract:
  - **Nodes:** functions, classes, modules, variables.
  - **Edges:** call relationships, inheritance hierarchies, imports.
- **Graph Construction:** Store nodes and edges in a graph database (e.g., Neo4j or in-memory graph).
- **Metadata Enrichment:** Annotate each node with:
  - `filePath`, `tokenSpan`, `language`, `docstringSummary`.

### 1.2 Vector Embedding Process
- **Chunking:** Split code and comments into overlapping chunks (default 256 tokens, 50% overlap).
- **Embedding Model:** Use a preconfigured model (e.g., `text-embedding-ada-002` or local equivalent) to generate d-dimensional embeddings.
- **Indexing:** Insert embeddings into LanceDB with schema:
  - `id` (UUID)
  - `vector` (Float32[d])
  - `metadata`: `{ filePath, startLine, endLine, language, nodeIds }`

### 1.3 LanceDB Chunk Schema
- **Collection:** `rocketship_chunks`
- **Fields:**
  - `chunkId` (string, primary key)
  - `vector` (array of floats)
  - `sourceFile` (string)
  - `lineRange` (object: `{ start: number; end: number; }`)
  - `nodeIds` (array of strings)
  - `timestamp` (ISO 8601 string)

### 1.4 RAG Orchestration Loop
1. **Query Intake:** User triggers `HybridRetrievalService.retrieve(query)`.
2. **Graph Query:** Execute a subgraph search to identify top-k relevant nodes.
3. **Vector Search:** Perform ANN search against LanceDB for top-k nearest chunks.
4. **Context Assembly:** Merge graph node snippets and vector chunks in descending order of relevance.
5. **Model Invocation:** Call `InferenceService.callModel()` with the assembled context.
6. **Post-Processing:** Extract response, store in `MemoryService`, and emit telemetry.

---

## 2. Vector Store & Graph Schema

### 2.1 Vector Index Schema
- **Chunk Size:** 256 tokens (configurable via `rocketship.yaml`).
- **Embedding Dimension:** 1536 (or match chosen embedding model).
- **Metadata Tags:** `filePath`, `startLine`, `endLine`, `language`, `nodeIds`, `commitHash` (optional).

### 2.2 Graph Node & Edge Types
- **Node Types:**
  - `Function`
  - `Class`
  - `Module`
  - `Variable`
- **Edge Types:**
  - `calls` (Function → Function)
  - `inherits` (Class → Class)
  - `imports` (Module → Module)
  - `defines` (Module → Node)
- **Node Properties:**
  - `id`: UUID
  - `name`: string
  - `filePath`: string
  - `span`: `{ startLine, endLine }`
- **Edge Properties:**
  - `weight`: number (default 1.0)

---

## 3. RAG Prompt Templates

### 3.1 Base Retrieval-Augmented Prompt
```text
You are an AI coding assistant. Use the context below to answer the question precisely.

# Graph Context:
{{graph_snippets}}

# Code Context:
{{vector_snippets}}

# Question:
{{query}}

# Answer:
```

### 3.2 Refactoring Prompt
```text
You are a code refactoring assistant. Given the context below, propose improvements:

Graph definitions:
{{graph_snippets}}

Code excerpts:
{{vector_snippets}}

Provide a refactored version with explanations of each change.
```

### 3.3 Test Generation Prompt
```text
You are a test-generation agent. Using the context below, write unit tests:

Function signatures and documentation:
{{graph_snippets}}

Implementation details:
{{vector_snippets}}

Output test cases following the project’s testing conventions.
```