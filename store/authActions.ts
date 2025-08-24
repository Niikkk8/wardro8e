import { AppDispatch } from './index';
import { setUser, clearUser } from './authSlice';
import { supabase } from '@/lib/supabase';

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
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

  console.log('authActions: Login API successful, fetching user data...');

  // Fetch updated user data after login
  const userResponse = await fetch('/api/auth/me', {
    credentials: 'include',
  });

  if (userResponse.ok) {
    const data = await userResponse.json();
    console.log('authActions: User data received:', data);
    
    if (data.userId && data.email) {
      console.log('authActions: Setting user in store:', data);
      dispatch(setUser({
        id: data.userId,
        email: data.email,
        role: data.role,
      }));
    }
  } else {
    console.error('authActions: Failed to fetch user data after login');
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await fetch('/api/auth/brand/login', { method: 'DELETE' });
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    dispatch(clearUser());
  }
};

export const refreshAuth = () => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch('/api/auth/me', {
      credentials: 'include',
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.userId && data.email) {
        dispatch(setUser({
          id: data.userId,
          email: data.email,
          role: data.role,
        }));
      } else {
        dispatch(clearUser());
      }
    } else {
      dispatch(clearUser());
    }
  } catch (error) {
    console.error('Failed to refresh auth:', error);
    dispatch(clearUser());
  }
};
