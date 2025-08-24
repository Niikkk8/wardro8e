import { AppDispatch } from './index';
import { clearUser } from './authSlice';
import { supabase } from '@/lib/supabase';

export const login = (email: string, password: string) => async (_dispatch: AppDispatch) => {
  console.log('authActions: Starting login for:', email);

  const response = await fetch('/api/auth/brand/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(error.message);
  }

  const data = await response.json();
  const accessToken: string | undefined = data?.access_token;
  const refreshToken: string | undefined = data?.refresh_token;

  if (!accessToken || !refreshToken) {
    throw new Error('Login succeeded but session tokens are missing');
  }

  // Persist Supabase session on the client so it survives reloads
  const { error: setErr } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  if (setErr) {
    console.error('authActions: Failed to set Supabase session', setErr);
    throw setErr;
  }

  console.log('authActions: Supabase session set; StoreProvider subscription will hydrate user');
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    dispatch(clearUser());
  }
};

export const refreshAuth = () => async (dispatch: AppDispatch) => {
  try {
    const { data: sessionRes } = await supabase.auth.getSession();
    const token = sessionRes.session?.access_token;

    if (!token) {
      dispatch(clearUser());
      return;
    }

    const response = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      dispatch(clearUser());
      return;
    }

    const data = await response.json();
    if (!data?.userId) {
      dispatch(clearUser());
    }
    // Note: user state will be hydrated by StoreProvider subscription as well
  } catch (error) {
    console.error('Failed to refresh auth:', error);
    dispatch(clearUser());
  }
};
