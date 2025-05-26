"use client";

import { useAuth } from "@/hooks/use-auth";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { BookmarkIcon, LogIn as LogInIcon } from "lucide-react";
import { useSavedWords } from "@/hooks/use-saved-words";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

export function MyWordsPage() {
  const { user } = useAuth();
  const { words, loading } = useSavedWords(user?.id);

  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <BookmarkIcon className="h-8 w-8 text-primary" />
        My Words
      </h1>
      {!user ? (
        <div className="flex flex-1 flex-col justify-center items-center min-h-[60vh]">
          <BookmarkIcon className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-lg font-semibold text-center">
            Sign in to save and view your words.
          </p>
          <p className="text-sm text-muted-foreground text-center">
            The My Words feature is available only to signed-in users.
          </p>
          <div className="mt-6 w-full max-w-xs">
            <AuthDialog
              trigger={
                <button
                  type="button"
                  className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition w-full flex items-center justify-center gap-2"
                >
                  <LogInIcon className="h-4 w-4" />
                  Sign in
                </button>
              }
            />
          </div>
        </div>
      ) : loading ? (
        <div className="flex flex-1 flex-col justify-center items-center min-h-[60vh]">
          <Spinner size="lg" />
          <span className="mt-4 text-muted-foreground text-sm font-medium">
            Loading your saved words...
          </span>
        </div>
      ) : words.length === 0 ? (
        <div className="flex flex-1 flex-col justify-center items-center min-h-[60vh]">
          <BookmarkIcon className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-lg font-semibold text-center">
            You have no saved words yet.
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Start saving words to see them here.
          </p>
          <Link href="/" className="mt-6 w-full max-w-xs">
            <button
              type="button"
              className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition w-full flex items-center justify-center gap-2"
            >
              Search for a word
            </button>
          </Link>
        </div>
      ) : (
        <div>{/* TODO: Render saved words list here */}</div>
      )}
    </div>
  );
}

export default MyWordsPage;
