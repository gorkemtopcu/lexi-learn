"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, PlusCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { CompactWordDefinition } from "@/components/compact-word-definition";
import { WordData } from "@/services/dictionary/types";
import { useAuth } from "@/contexts/auth-context";
import { getSavedWords, removeWord } from "@/services/words";
import { Spinner } from "@/components/ui/spinner";
import { AuthDialog } from "@/components/auth/auth-dialog";

export default function MyWordsPage() {
  const [savedWords, setSavedWords] = useState<WordData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch saved words when the component mounts or user changes
  useEffect(() => {
    const fetchSavedWords = async () => {
      setIsLoading(true);
      setError(null);

      if (!user) {
        setSavedWords([]);
        setIsLoading(false);
        return;
      }

      try {
        const words = await getSavedWords(user);
        setSavedWords(words);
      } catch (err) {
        console.error('Error fetching saved words:', err);
        setError('Failed to load your saved words. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedWords();
  }, [user]);

  const handleRemoveWord = async (wordId: string) => {
    if (!user) return;

    setIsRemoving(wordId);

    try {
      await removeWord(user, wordId);
      setSavedWords(savedWords.filter(word => (word as any).id !== wordId));
    } catch (err) {
      console.error('Error removing word:', err);
      setError('Failed to remove word. Please try again.');
    } finally {
      setIsRemoving(null);
    }
  };

  return (
    <>
      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
      />

      <div className="container py-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Words</h1>
          <Link href="/">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Add Word</span>
            </Button>
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 rounded-md flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Loading your saved words...</p>
          </div>
        ) : !user ? (
          <div className="p-12 text-center border rounded-lg bg-card">
            <BookmarkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">
              Sign in to save words
            </h3>
            <p className="text-muted-foreground mb-6">
              Create an account or sign in to save and access your words
            </p>
            <Button onClick={() => setIsAuthDialogOpen(true)}>
              Sign In to Continue
            </Button>
          </div>
        ) : savedWords.length > 0 ? (
          <div className="grid gap-4">
            {savedWords.map((word) => (
              <CompactWordDefinition
                key={(word as any).id}
                data={word}
                isSaved={true}
                onRemove={() => handleRemoveWord((word as any).id)}
                isRemoving={isRemoving === (word as any).id}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border rounded-lg bg-card">
            <BookmarkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">
              No saved words yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Words you save will appear here for quick reference
            </p>
            <Link href="/">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add your first word
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
