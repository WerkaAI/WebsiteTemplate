import { Redis } from '@upstash/redis';
import { createHash } from 'crypto';

export interface RateLimitDecision {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
}

export interface RateLimiter {
  limit(identifier: string): Promise<RateLimitDecision>;
}

interface RateLimiterOptions {
  namespace: string;
  maxRequests: number;
  windowSeconds: number;
}

class MemoryRateLimiter implements RateLimiter {
  private readonly store = new Map<string, { count: number; resetAt: number }>();

  constructor(private readonly options: RateLimiterOptions) {}

  async limit(identifier: string): Promise<RateLimitDecision> {
    const now = Date.now();
    const key = this.keyFor(identifier);
    const windowMs = this.options.windowSeconds * 1000;
    const record = this.store.get(key);

    if (!record || now >= record.resetAt) {
      this.store.set(key, { count: 1, resetAt: now + windowMs });
      return {
        allowed: true,
        limit: this.options.maxRequests,
        remaining: Math.max(0, this.options.maxRequests - 1),
        retryAfterSeconds: this.options.windowSeconds,
      };
    }

    record.count += 1;
    this.store.set(key, record);

    const retryAfterSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
    const remaining = Math.max(0, this.options.maxRequests - record.count);

    return {
      allowed: record.count <= this.options.maxRequests,
      limit: this.options.maxRequests,
      remaining,
      retryAfterSeconds,
    };
  }

  private keyFor(identifier: string): string {
    return `${this.options.namespace}:${hashIdentifier(identifier)}`;
  }
}

class UpstashRateLimiter implements RateLimiter {
  private readonly redis: Redis;

  constructor(private readonly options: RateLimiterOptions) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
      throw new Error('Missing Upstash Redis credentials');
    }

    this.redis = new Redis({ url, token });
  }

  async limit(identifier: string): Promise<RateLimitDecision> {
    const key = this.keyFor(identifier);
    const current = await this.redis.incr(key);

    if (current === 1) {
      await this.redis.expire(key, this.options.windowSeconds);
    }

    const ttl = await this.redis.ttl(key);
    const retryAfterSeconds = ttl > 0 ? ttl : this.options.windowSeconds;
    const remaining = Math.max(0, this.options.maxRequests - current);

    return {
      allowed: current <= this.options.maxRequests,
      limit: this.options.maxRequests,
      remaining,
      retryAfterSeconds,
    };
  }

  private keyFor(identifier: string): string {
    return `${this.options.namespace}:${hashIdentifier(identifier)}`;
  }
}

class FallbackRateLimiter implements RateLimiter {
  constructor(
    private readonly primary: RateLimiter,
    private readonly fallback: RateLimiter,
  ) {}

  async limit(identifier: string): Promise<RateLimitDecision> {
    try {
      return await this.primary.limit(identifier);
    } catch (error) {
      console.error('Primary rate limiter failed; using fallback:', error);
      return this.fallback.limit(identifier);
    }
  }
}

export function createRateLimiter(options: RateLimiterOptions): RateLimiter {
  const memoryLimiter = new MemoryRateLimiter(options);

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return memoryLimiter;
  }

  try {
    const upstashLimiter = new UpstashRateLimiter(options);
    return new FallbackRateLimiter(upstashLimiter, memoryLimiter);
  } catch {
    return memoryLimiter;
  }
}

export function getClientIdentifier(ip: string): string {
  return hashIdentifier(ip);
}

function hashIdentifier(identifier: string): string {
  return createHash('sha256').update(identifier).digest('hex');
}
