import { handleAuthError, isAuthError } from '../auth-error-handler';
import { AuthError } from '@supabase/supabase-js';

// Mock the Supabase client
jest.mock('../supabase-client', () => ({
  supabase: {
    auth: {
      signOut: jest.fn()
    }
  }
}));

describe('auth-error-handler', () => {
  describe('handleAuthError', () => {
    it('should handle refresh token not found error', () => {
      const error = new Error('Invalid Refresh Token: Refresh Token Not Found');
      const result = handleAuthError(error);
      
      expect(result.shouldSignOut).toBe(true);
      expect(result.userFriendlyMessage).toBe('Your session has expired. Please sign in again.');
      expect(result.originalError).toBe('Invalid Refresh Token: Refresh Token Not Found');
    });

    it('should handle invalid refresh token error', () => {
      const error = new Error('invalid refresh token');
      const result = handleAuthError(error);
      
      expect(result.shouldSignOut).toBe(true);
      expect(result.userFriendlyMessage).toBe('Your session has expired. Please sign in again.');
    });

    it('should handle session expired error', () => {
      const error = new Error('session expired');
      const result = handleAuthError(error);
      
      expect(result.shouldSignOut).toBe(true);
      expect(result.userFriendlyMessage).toBe('Your session has expired. Please sign in again.');
    });

    it('should handle JWT expired error', () => {
      const error = new Error('jwt expired');
      const result = handleAuthError(error);
      
      expect(result.shouldSignOut).toBe(true);
      expect(result.userFriendlyMessage).toBe('Your session has expired. Please sign in again.');
    });

    it('should handle invalid JWT error', () => {
      const error = new Error('invalid jwt');
      const result = handleAuthError(error);
      
      expect(result.shouldSignOut).toBe(true);
      expect(result.userFriendlyMessage).toBe('Authentication error. Please sign in again.');
    });

    it('should handle network errors without signing out', () => {
      const error = new Error('Network Error');
      const result = handleAuthError(error);
      
      expect(result.shouldSignOut).toBe(false);
      expect(result.userFriendlyMessage).toBe('Connection error. Please check your internet connection and try again.');
    });

    it('should handle unknown errors without signing out', () => {
      const error = new Error('Some unknown error');
      const result = handleAuthError(error);
      
      expect(result.shouldSignOut).toBe(false);
      expect(result.userFriendlyMessage).toBe('An authentication error occurred. Please try again.');
    });
  });

  describe('isAuthError', () => {
    it('should identify AuthError instances', () => {
      const authError = new AuthError('test error');
      expect(isAuthError(authError)).toBe(true);
    });

    it('should identify errors with auth-related messages', () => {
      const tokenError = new Error('invalid token');
      const sessionError = new Error('session expired');
      const authError = new Error('auth failed');
      
      expect(isAuthError(tokenError)).toBe(true);
      expect(isAuthError(sessionError)).toBe(true);
      expect(isAuthError(authError)).toBe(true);
    });

    it('should not identify non-auth errors', () => {
      const regularError = new Error('regular error');
      const networkError = new Error('network failed');
      
      expect(isAuthError(regularError)).toBe(false);
      expect(isAuthError(networkError)).toBe(false);
    });

    it('should handle non-Error objects', () => {
      expect(isAuthError('string error')).toBe(false);
      expect(isAuthError(null)).toBe(false);
      expect(isAuthError(undefined)).toBe(false);
      expect(isAuthError({})).toBe(false);
    });
  });
}); 