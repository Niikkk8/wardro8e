export type PendingBrandSignup = {
  brandName: string;
  brandLegalName: string;
  email: string;
  password: string;
  otp: string;
  expiresAt: number;
};

// In-memory store (replace with Redis in production)
export const pendingBrandSignups = new Map<string, PendingBrandSignup>();

// Cleanup expired entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [email, signup] of pendingBrandSignups.entries()) {
    if (signup.expiresAt <= now) {
      pendingBrandSignups.delete(email);
    }
  }
}, 5 * 60 * 1000);


