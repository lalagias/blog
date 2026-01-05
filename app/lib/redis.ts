import { Redis } from "@upstash/redis"

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

// Safe wrapper for Redis operations
export const safeRedis = {
  get: async <T = unknown>(key: string): Promise<T | null> => {
    if (!redis) return null
    try {
      return await redis.get<T>(key)
    } catch {
      return null
    }
  },
  set: async (
    key: string,
    value: unknown,
    options?: { nx: true; ex: number },
  ): Promise<string | null> => {
    if (!redis) return null
    try {
      const result = await redis.set(key, value, options)
      // With NX option, returns null if key exists, "OK" if set successfully
      return result as string | null
    } catch {
      return null
    }
  },
  incr: async (key: string): Promise<number | null> => {
    if (!redis) return null
    try {
      return await redis.incr(key)
    } catch {
      return null
    }
  },
}

export default redis
