import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AccountRole = 'brand' | 'user' | null;

export interface AuthAccount {
  id: string;
  email: string;
  role: AccountRole;
  brandName?: string;
  brandLegalName?: string;
  verified?: boolean;
}

export interface PendingSignup {
  brandName: string;
  brandLegalName: string;
  email: string;
  password: string;
  otp: string;
  expiresAt: number;
}

export interface AuthState {
  account: AuthAccount | null;
  loading: boolean;
  pendingSignup: PendingSignup | null;
}

const initialState: AuthState = {
  account: null,
  loading: true,
  pendingSignup: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthAccount: (state, action: PayloadAction<AuthAccount | null>) => {
      state.account = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearAuth: (state) => {
      state.account = null;
      state.loading = false;
    },
    setBrandProfile: (state, action: PayloadAction<{ brandName: string; brandLegalName: string; verified: boolean }>) => {
      if (state.account) {
        state.account.brandName = action.payload.brandName;
        state.account.brandLegalName = action.payload.brandLegalName;
        state.account.verified = action.payload.verified;
      }
    },
    setPendingSignup: (state, action: PayloadAction<PendingSignup | null>) => {
      state.pendingSignup = action.payload;
      
      // Handle localStorage
      if (action.payload) {
        localStorage.setItem('wardro8e_pending', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('wardro8e_pending');
      }
    },
    loadPendingSignup: (state) => {
      const stored = localStorage.getItem('wardro8e_pending');
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as PendingSignup;
          if (parsed.expiresAt > Date.now()) {
            state.pendingSignup = parsed;
          } else {
            localStorage.removeItem('wardro8e_pending');
          }
        } catch {
          localStorage.removeItem('wardro8e_pending');
        }
      }
    },
  },
});

export const { 
  setAuthAccount, 
  setLoading, 
  clearAuth, 
  setBrandProfile,
  setPendingSignup, 
  loadPendingSignup 
} = authSlice.actions;

export default authSlice.reducer;