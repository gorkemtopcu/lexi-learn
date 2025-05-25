import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase-client";

export function useAuth() {
  const [user, setUser] = useState<null | { email: string }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get current user and listen for auth state changes
  useEffect(() => {
    let ignore = false;
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (!ignore) setUser(data.user ? { email: data.user.email ?? "" } : null);
    }
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { email: session.user.email ?? "" } : null);
    });
    return () => {
      ignore = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return false;
    }
    return true;
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return false;
    }
    return true;
  }, []);

  const signOut = useCallback(async () => {
    setError(null);
    setLoading(true);
    const { error: signOutError } = await supabase.auth.signOut();
    setLoading(false);
    if (signOutError) {
      setError(signOutError.message);
      return false;
    }
    return true;
  }, []);

  return {
    user,
    loading,
    error,
    setError,
    signIn,
    signUp,
    signOut,
  };
} 