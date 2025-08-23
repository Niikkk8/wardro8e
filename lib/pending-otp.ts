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


