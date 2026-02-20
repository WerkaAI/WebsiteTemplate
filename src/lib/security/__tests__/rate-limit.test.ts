import { afterEach, describe, expect, it, vi } from 'vitest';
import { createRateLimiter } from '@/lib/security/rate-limit';

describe('createRateLimiter', () => {
  const originalUrl = process.env.UPSTASH_REDIS_REST_URL;
  const originalToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  afterEach(() => {
    process.env.UPSTASH_REDIS_REST_URL = originalUrl;
    process.env.UPSTASH_REDIS_REST_TOKEN = originalToken;
    vi.useRealTimers();
  });

  it('enforces limits in memory mode when Upstash is not configured', async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    const limiter = createRateLimiter({
      namespace: 'test-memory',
      maxRequests: 2,
      windowSeconds: 60,
    });

    const first = await limiter.limit('127.0.0.1');
    const second = await limiter.limit('127.0.0.1');
    const third = await limiter.limit('127.0.0.1');

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(third.allowed).toBe(false);
    expect(third.remaining).toBe(0);
  });

  it('resets quota after time window in memory mode', async () => {
    vi.useFakeTimers();

    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    const limiter = createRateLimiter({
      namespace: 'test-reset',
      maxRequests: 1,
      windowSeconds: 2,
    });

    const first = await limiter.limit('127.0.0.1');
    const blocked = await limiter.limit('127.0.0.1');

    vi.advanceTimersByTime(2100);

    const allowedAgain = await limiter.limit('127.0.0.1');

    expect(first.allowed).toBe(true);
    expect(blocked.allowed).toBe(false);
    expect(allowedAgain.allowed).toBe(true);
  });
});
