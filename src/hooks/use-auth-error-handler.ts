import { useCallback } from 'react';
import { handleAuthError, performSafeSignOut, isAuthError } from '@/lib/auth-error-handler';
import { toast } from 'sonner';

/**
 * Custom hook for handling authentication errors in components
 * Provides consistent error handling and user feedback
 */
export function useAuthErrorHandler() {
  const handleError = useCallback(async (error: unknown, showToast = true) => {
    if (isAuthError(error)) {
      const authErrorResult = handleAuthError(error);
      
      if (authErrorResult.shouldSignOut) {
        // Perform safe sign out
        await performSafeSignOut();
        
        if (showToast) {
          toast.error('Session Expired', {
            description: authErrorResult.userFriendlyMessage,
            duration: 4000,
          });
        }
        
        console.warn('Authentication error requiring sign out:', authErrorResult.originalError);
        return { shouldSignOut: true, message: authErrorResult.userFriendlyMessage };
      } else {
        if (showToast) {
          toast.error('Authentication Error', {
            description: authErrorResult.userFriendlyMessage,
            duration: 4000,
          });
        }
        
        console.warn('Authentication error (recoverable):', authErrorResult.originalError);
        return { shouldSignOut: false, message: authErrorResult.userFriendlyMessage };
      }
    } else {
      // Handle non-auth errors
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      if (showToast) {
        toast.error('Error', {
          description: errorMessage,
          duration: 4000,
        });
      }
      
      console.error('Non-auth error:', error);
      return { shouldSignOut: false, message: errorMessage };
    }
  }, []);

  return { handleError };
} 