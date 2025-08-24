const requests = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string, 
  maxRequests: number = 5, 
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const existing = requests.get(identifier);

  // Clean up expired entries occasionally (10% chance)
  if (Math.random() < 0.1) {
    for (const [key, data] of requests.entries()) {
      if (data.resetTime <= now) {
        requests.delete(key);
      }
    }
  }

  if (!existing || existing.resetTime <= now) {
    // First request or window expired
    const resetTime = now + windowMs;
    requests.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: maxRequests - 1, resetTime };
  }

  if (existing.count >= maxRequests) {
    // Rate limit exceeded
    return { allowed: false, remaining: 0, resetTime: existing.resetTime };
  }

  // Increment count
  existing.count += 1;
  requests.set(identifier, existing);

  return { allowed: true, remaining: maxRequests - existing.count, resetTime: existing.resetTime };
}

// Get client identifier from request
export function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 
             req.headers.get('x-real-ip') || 
             'unknown';
  return ip;
}