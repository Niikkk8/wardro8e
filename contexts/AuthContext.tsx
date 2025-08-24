'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import ClientCrypto from '@/lib/crypto';

export interface PendingBrandSignup {
  brandName: string;
  brandLegalName: string;
  email: string;
  password: string;
  otp: string;
  expiresAt: number;
}

interface AuthContextType {
  pendingSignup: PendingBrandSignup | null;
  setPendingSignup: (signup: PendingBrandSignup | null) => Promise<void>;
  clearExpiredSignup: () => void;
  isOTPExpired: () => boolean;
  sessionKey: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [pendingSignup, setPendingSignupState] = useState<PendingBrandSignup | null>(null);
  const [sessionKey] = useState(() => ClientCrypto.generateSessionKey());

  // Load from localStorage on mount (with decryption)
  useEffect(() => {
    const loadStoredData = async () => {
      const stored = localStorage.getItem('wardro8e_pending');
      if (stored) {
        try {
          const decrypted = await ClientCrypto.decrypt(stored, sessionKey);
          const parsed = JSON.parse(decrypted) as PendingBrandSignup;
          // Check if it's expired
          if (parsed.expiresAt > Date.now()) {
            setPendingSignupState(parsed);
          } else {
            localStorage.removeItem('wardro8e_pending');
          }
        } catch {
          // Decryption failed or data corrupted, remove it
          localStorage.removeItem('wardro8e_pending');
        }
      }
    };
    loadStoredData();
  }, [sessionKey]);

  const setPendingSignup = async (signup: PendingBrandSignup | null) => {
    setPendingSignupState(signup);
    if (signup) {
      try {
        const encrypted = await ClientCrypto.encrypt(JSON.stringify(signup), sessionKey);
        localStorage.setItem('wardro8e_pending', encrypted);
      } catch (error) {
        console.error('Failed to encrypt signup data:', error);
        // Fallback: don't store if encryption fails
        localStorage.removeItem('wardro8e_pending');
      }
    } else {
      localStorage.removeItem('wardro8e_pending');
    }
  };

  const clearExpiredSignup = () => {
    if (pendingSignup && pendingSignup.expiresAt <= Date.now()) {
      setPendingSignup(null);
    }
  };

  const isOTPExpired = () => {
    if (!pendingSignup) return true;
    return pendingSignup.expiresAt <= Date.now();
  };

  // Auto cleanup expired signups every minute
  useEffect(() => {
    const interval = setInterval(clearExpiredSignup, 60000);
    return () => clearInterval(interval);
  }, [pendingSignup]);

  return (
    <AuthContext.Provider value={{
      pendingSignup,
      setPendingSignup,
      clearExpiredSignup,
      isOTPExpired,
      sessionKey
    }}>
      {children}
    </AuthContext.Provider>
  );
}
