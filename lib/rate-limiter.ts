// Simple in-memory rate limiter (replace with Redis in production)

interface RateLimitData {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private static requests = new Map<string, RateLimitData>();

  static async isAllowed(
    identifier: string, 
    maxRequests: number = 5, 
    windowMs: number = 15 * 60 * 1000 // 15 minutes
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const now = Date.now();
    const existing = this.requests.get(identifier);

    // Clean up expired entries periodically
    if (Math.random() < 0.1) { // 10% chance to cleanup
      this.cleanup();
    }

    if (!existing || existing.resetTime <= now) {
      // First request or window expired
      const resetTime = now + windowMs;
      this.requests.set(identifier, { count: 1, resetTime });
      return { allowed: true, remaining: maxRequests - 1, resetTime };
    }

    if (existing.count >= maxRequests) {
      // Rate limit exceeded
      return { 
        allowed: false, 
        remaining: 0, 
        resetTime: existing.resetTime 
      };
    }

    // Increment count
    existing.count += 1;
    this.requests.set(identifier, existing);

    return { 
      allowed: true, 
      remaining: maxRequests - existing.count, 
      resetTime: existing.resetTime 
    };
  }

  private static cleanup() {
    const now = Date.now();
    for (const [key, data] of this.requests.entries()) {
      if (data.resetTime <= now) {
        this.requests.delete(key);
      }
    }
  }

  // Get client identifier from request
  static getClientIdentifier(req: Request): string {
    // In production, you might want to use a combination of IP + user agent
    // For now, we'll use a simple approach
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 
               req.headers.get('x-real-ip') || 
               'unknown';
    return `${ip}`;
  }
}

export default RateLimiter;
