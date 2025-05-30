"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  getSavedWords,
  searchSavedWords,
  saveWord as saveWordApi,
  unsaveWord as unsaveWordApi,
} from "@/services/saved-words/saved-words";
import { WordData } from "@/services/dictionary-api/types";
import { useAuth } from "@/hooks/use-auth";
import { isAuthError, handleAuthError } from "@/lib/auth-error-handler";

interface SavedWordsContextValue {
  words: WordData[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  isSearching: boolean;
  isWordSaved: (word: string) => boolean;
  saveWord: (wordData: WordData) => Promise<void>;
  unsaveWord: (word: string) => Promise<void>;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  searchWords: (query: string) => Promise<void>;
  clearSearch: () => void;
  refreshSavedWords: () => Promise<void>;
}

const SavedWordsContext = createContext<SavedWordsContextValue | undefined>(
  undefined
);

export const SavedWordsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [words, setWords] = useState<WordData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Handle errors with proper auth error handling
  const handleError = useCallback((err: unknown) => {
    if (isAuthError(err)) {
      const authErrorResult = handleAuthError(err);
      setError(authErrorResult.userFriendlyMessage);

      if (authErrorResult.shouldSignOut) {
        // Clear local state when user needs to sign out
        setWords([]);
        setTotal(0);
        console.warn(
          "Auth error in saved words context:",
          authErrorResult.originalError
        );
      }
    } else {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Non-auth error in saved words context:", err);
    }
  }, []);

  const fetchWords = useCallback(async () => {
    if (!user) {
      setWords([]);
      setTotal(0);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const offset = (page - 1) * pageSize;
      const result = searchQuery
        ? await searchSavedWords(user.id, searchQuery, {
            limit: pageSize,
            offset,
          })
        : await getSavedWords(user.id, { limit: pageSize, offset });

      if (result.error) {
        handleError(new Error(result.error));
        setWords([]);
        setTotal(0);
      } else {
        setWords(result.words);
        setTotal(result.total);
        setError(null);
      }
    } catch (err) {
      handleError(err);
      setWords([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [user, page, pageSize, searchQuery, handleError]);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  const isWordSaved = useCallback(
    (word: string) => words.some((w) => w.word === word),
    [words]
  );

  const saveWord = useCallback(
    async (wordData: WordData) => {
      if (!user) {
        setError("You must be signed in to save words");
        return;
      }

      try {
        const result = await saveWordApi(user.id, wordData);

        if (result.error) {
          handleError(new Error(result.error));
          return;
        }

        if (result.success) {
          // If the word is not in the current page and the page is the first, prepend it
          setWords((prev) => {
            if (page === 1 && !searchQuery) {
              const newList = [wordData, ...prev];
              return newList.slice(0, pageSize);
            }
            return prev;
          });
          setTotal((prev) => prev + 1);
          setError(null);
        }
      } catch (err) {
        handleError(err);
      }
    },
    [user, page, pageSize, searchQuery, handleError]
  );

  const unsaveWord = useCallback(
    async (word: string) => {
      if (!user) {
        setError("You must be signed in to unsave words");
        return;
      }

      try {
        const result = await unsaveWordApi(user.id, word);

        if (result.error) {
          handleError(new Error(result.error));
          return;
        }

        if (result.success) {
          setWords((prev) => prev.filter((w) => w.word !== word));
          setTotal((prev) => Math.max(0, prev - 1));
          setError(null);
        }
      } catch (err) {
        handleError(err);
      }
    },
    [user, handleError]
  );

  const searchWords = useCallback(async (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page when searching
    setIsSearching(true);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setPage(1); // Reset to first page when clearing search
    setIsSearching(false);
  }, []);

  return (
    <SavedWordsContext.Provider
      value={{
        words,
        total,
        page,
        pageSize,
        loading,
        error,
        searchQuery,
        isSearching,
        isWordSaved,
        saveWord,
        unsaveWord,
        setPage,
        setPageSize,
        searchWords,
        clearSearch,
        refreshSavedWords: fetchWords,
      }}
    >
      {children}
    </SavedWordsContext.Provider>
  );
};

export function useSavedWordsContext() {
  const ctx = useContext(SavedWordsContext);
  if (!ctx)
    throw new Error(
      "useSavedWordsContext must be used within SavedWordsProvider"
    );
  return ctx;
}
