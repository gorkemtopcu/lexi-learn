import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase-client";
import { handleAuthError, performSafeSignOut, isAuthError } from "@/lib/auth-error-handler";

export function useAuth() {
  const [user, setUser] = useState<null | { id: string; email: string }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle authentication errors with proper recovery
  const handleAuthErrorWithRecovery = useCallback(async (error: unknown) => {
    if (isAuthError(error)) {
      const errorResult = handleAuthError(error);
      
      if (errorResult.shouldSignOut) {
        // Perform safe sign out and clear user state
        await performSafeSignOut();
        setUser(null);
        setError(errorResult.userFriendlyMessage);
        
        // Log the error for debugging
        console.warn('Authentication error requiring sign out:', errorResult.originalError);
      } else {
        setError(errorResult.userFriendlyMessage);
        console.warn('Authentication error (recoverable):', errorResult.originalError);
      }
    } else {
      // Handle non-auth errors
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Non-auth error:', error);
    }
  }, []);

  // Restore session and listen for auth state changes
  useEffect(() => {
    let ignore = false;
    
    async function restoreSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          await handleAuthErrorWithRecovery(error);
          return;
        }
        
        if (!ignore) {
          setUser(session?.user ? { 
            id: session.user.id, 
            email: session.user.email ?? "" 
          } : null);
        }
      } catch (error) {
        if (!ignore) {
          await handleAuthErrorWithRecovery(error);
        }
      }
    }
    
    restoreSession();
    
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setError(null);
      } else if (event === 'SIGNED_IN') {
        setError(null);
      }
      
      setUser(session?.user ? { 
        id: session.user.id, 
        email: session.user.email ?? "" 
      } : null);
    });
    
    return () => {
      ignore = true;
      listener.subscription.unsubscribe();
    };
  }, [handleAuthErrorWithRecovery]);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      
      if (signInError) {
        await handleAuthErrorWithRecovery(signInError);
        setLoading(false);
        return false;
      }
      
      setLoading(false);
      return true;
    } catch (error) {
      await handleAuthErrorWithRecovery(error);
      setLoading(false);
      return false;
    }
  }, [handleAuthErrorWithRecovery]);

  const signUp = useCallback(async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    
    try {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      
      if (signUpError) {
        await handleAuthErrorWithRecovery(signUpError);
        setLoading(false);
        return false;
      }
      
      setLoading(false);
      return true;
    } catch (error) {
      await handleAuthErrorWithRecovery(error);
      setLoading(false);
      return false;
    }
  }, [handleAuthErrorWithRecovery]);

  const signOut = useCallback(async () => {
    setError(null);
    setLoading(true);
    
    try {
      await performSafeSignOut();
      setLoading(false);
      return true;
    } catch (error) {
      await handleAuthErrorWithRecovery(error);
      setLoading(false);
      return false;
    }
  }, [handleAuthErrorWithRecovery]);

  const resetPassword = useCallback(async (email: string) => {
    setError(null);
    setLoading(true);
    
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (resetError) {
        await handleAuthErrorWithRecovery(resetError);
        setLoading(false);
        return false;
      }
      
      setLoading(false);
      return true;
    } catch (error) {
      await handleAuthErrorWithRecovery(error);
      setLoading(false);
      return false;
    }
  }, [handleAuthErrorWithRecovery]);

  return {
    user,
    loading,
    error,
    setError,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
} 