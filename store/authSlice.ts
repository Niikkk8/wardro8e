import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'brand' | 'user' | null;

export interface User {
  id: string;
  email: string;
  role: UserRole;
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
  user: User | null;
  loading: boolean;
  pendingSignup: PendingSignup | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  pendingSignup: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
    setBrand: (state, action: PayloadAction<{ brandName: string; brandLegalName: string; verified: boolean }>) => {
      if (state.user) {
        state.user.brandName = action.payload.brandName;
        state.user.brandLegalName = action.payload.brandLegalName;
        state.user.verified = action.payload.verified;
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
  setUser, 
  setLoading, 
  clearUser, 
  setBrand,
  setPendingSignup, 
  loadPendingSignup 
} = authSlice.actions;

export default authSlice.reducer;