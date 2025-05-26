import { useEffect, useState } from "react";

export function useSavedWords(userId?: string) {
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setWords([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    // Mock fetch logic: replace with real API call
    const timeout = setTimeout(() => {
      setWords([]); // Simulate no saved words
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [userId]);

  return { words, loading };
} 