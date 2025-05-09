// CacheBackend: Abstract cache interface for model/adapters
// Supports Redis, in-memory, and NVMe (future)
// See docs/architecture.md and resilience.md

export interface CacheOptions {
  evictionPolicy: 'LRU' | 'LFU';
  maxEntries: number;
  ttlSecs: number;
}

export interface CacheBackend {
  get(key: string): Promise<any>;
  set(key: string, value: any, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
  has(key: string): Promise<boolean>;
  size(): Promise<number>;
}

// In-memory LRU cache implementation
export class InMemoryCache implements CacheBackend {
  private cache = new Map<string, any>();
  private options: CacheOptions;
  constructor(options: CacheOptions) {
    this.options = options;
    // TODO: Implement LRU/LFU logic, TTL expiry
  }
  async get(key: string) { return this.cache.get(key); }
  async set(key: string, value: any, ttl?: number) { this.cache.set(key, value); }
  async del(key: string) { this.cache.delete(key); }
  async has(key: string) { return this.cache.has(key); }
  async size() { return this.cache.size; }
}

// Redis cache implementation (stub)
export class RedisCache implements CacheBackend {
  constructor(private redisClient: any, private options: CacheOptions) {}
  async get(key: string) { /* TODO: Redis GET */ return null; }
  async set(key: string, value: any, ttl?: number) { /* TODO: Redis SETEX */ }
  async del(key: string) { /* TODO: Redis DEL */ }
  async has(key: string) { /* TODO: Redis EXISTS */ return false; }
  async size() { /* TODO: Redis DBSIZE or SCAN */ return 0; }
}