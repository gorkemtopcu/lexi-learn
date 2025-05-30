import { AuthError } from '@supabase/supabase-js';
import { supabase } from './supabase-client';

export interface AuthErrorResult {
  shouldSignOut: boolean;
  userFriendlyMessage: string;
  originalError: string;
}

/**
 * Handles authentication errors and determines appropriate action
 * @param error - The authentication error from Supabase
 * @returns AuthErrorResult with action to take and user-friendly message
 */
export function handleAuthError(error: AuthError | Error): AuthErrorResult {
  const errorMessage = error.message.toLowerCase();
  
  // Handle refresh token errors
  if (errorMessage.includes('refresh token not found') || 
      errorMessage.includes('invalid refresh token') ||
      errorMessage.includes('refresh_token_not_found')) {
    return {
      shouldSignOut: true,
      userFriendlyMessage: 'Your session has expired. Please sign in again.',
      originalError: error.message
    };
  }
  
  // Handle session expired errors
  if (errorMessage.includes('session expired') || 
      errorMessage.includes('jwt expired')) {
    return {
      shouldSignOut: true,
      userFriendlyMessage: 'Your session has expired. Please sign in again.',
      originalError: error.message
    };
  }
  
  // Handle invalid JWT errors
  if (errorMessage.includes('invalid jwt') || 
      errorMessage.includes('jwt malformed')) {
    return {
      shouldSignOut: true,
      userFriendlyMessage: 'Authentication error. Please sign in again.',
      originalError: error.message
    };
  }
  
  // Handle network/connection errors
  if (errorMessage.includes('network') || 
      errorMessage.includes('fetch')) {
    return {
      shouldSignOut: false,
      userFriendlyMessage: 'Connection error. Please check your internet connection and try again.',
      originalError: error.message
    };
  }
  
  // Default case - don't sign out for unknown errors
  return {
    shouldSignOut: false,
    userFriendlyMessage: 'An authentication error occurred. Please try again.',
    originalError: error.message
  };
}

/**
 * Safely signs out the user and clears any stored session data
 */
export async function performSafeSignOut(): Promise<void> {
  try {
    await supabase.auth.signOut({ scope: 'local' });
  } catch (error) {
    // If sign out fails, clear local storage manually
    console.warn('Failed to sign out properly:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.removeItem('supabase.auth.token');
    }
  }
}

/**
 * Checks if an error is an authentication-related error
 */
export function isAuthError(error: unknown): error is AuthError {
  return error instanceof Error && 
         (error.name === 'AuthError' || 
          error.message.includes('auth') ||
          error.message.includes('token') ||
          error.message.includes('session'));
} 