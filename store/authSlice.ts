import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'brand' | 'user' | null;

export interface AuthState {
  status: 'unknown' | 'authenticated' | 'anonymous';
  userId: string | null;
  email: string | null;
  role: UserRole;
}

const initialState: AuthState = {
  status: 'unknown',
  userId: null,
  email: null,
  role: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ userId: string; email: string; role: UserRole }>
    ) => {
      state.status = 'authenticated';
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    clearAuth: (state) => {
      state.status = 'anonymous';
      state.userId = null;
      state.email = null;
      state.role = null;
    },
    setUnknown: (state) => {
      state.status = 'unknown';
    },
  },
});

export const { setAuth, clearAuth, setUnknown } = authSlice.actions;
export default authSlice.reducer;