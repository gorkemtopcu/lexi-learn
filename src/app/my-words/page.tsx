"use client";

import { useAuth } from "@/hooks/use-auth";
import { AuthDialog } from "@/components/auth/auth-dialog";
import {
  BookmarkIcon,
  LogIn as LogInIcon,
  Trophy,
  Search,
  X,
} from "lucide-react";
import { useSavedWords } from "@/hooks/use-saved-words";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { CompactWordDefinition } from "@/components/compact-word-definition";
import { AchievementsShowcase } from "@/components/achievements-showcase";
import { getPageList } from "@/utils/pagination";
import { WordData } from "@/services/dictionary-api/types";
import { useState } from "react";

export function MyWordsPage() {
  const { user } = useAuth();
  const {
    words,
    loading,
    page,
    pageSize,
    total,
    setPage,
    searchQuery,
    searchWords,
    clearSearch,
  } = useSavedWords();
  const [showAchievements, setShowAchievements] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const totalPages = Math.ceil(total / pageSize);
  const pageList = getPageList(page, totalPages);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      await searchWords(searchInput.trim());
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    clearSearch();
  };

  return (
    <div className="container py-10 max-w-4xl mx-auto px-2 sm:px-4">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 px-1 sm:px-0">
        <BookmarkIcon className="h-8 w-8 text-primary" />
        My Words
        {user && (
          <button
            onClick={() => setShowAchievements(!showAchievements)}
            className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-background text-foreground font-medium shadow-sm transition hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            title={showAchievements ? "Hide Achievements" : "Show Achievements"}
          >
            <Trophy className="h-4 w-4" />
            {showAchievements ? "Hide Achievements" : "Show Achievements"}
          </button>
        )}
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
      ) : (
        <>
          {/* Achievements Showcase */}
          {showAchievements && (
            <div className="mb-8">
              <AchievementsShowcase userWordCount={total} />
            </div>
          )}

          {/* Search Bar - Only show if there are words */}
          {words.length > 0 && (
            <div className="mb-6 px-1 sm:px-0">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search your saved words..."
                    className="w-full px-4 py-2 pr-10 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition"
                      title="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!searchInput.trim()}
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </form>
              {searchQuery && (
                <div className="mt-2 text-sm text-muted-foreground">
                  Showing results for &ldquo;{searchQuery}&rdquo; ({total}{" "}
                  {total === 1 ? "word" : "words"} found)
                </div>
              )}
            </div>
          )}

          {words.length === 0 ? (
            <div className="flex flex-1 flex-col justify-center items-center min-h-[40vh]">
              <BookmarkIcon className="h-10 w-10 text-muted-foreground mb-2" />
              {searchQuery ? (
                <>
                  <p className="text-lg font-semibold text-center">
                    No words found for &ldquo;{searchQuery}&rdquo;.
                  </p>
                  <p className="text-sm text-muted-foreground text-center">
                    Try a different search term or clear the search to see all
                    your words.
                  </p>
                  <button
                    onClick={handleClearSearch}
                    className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition"
                  >
                    Clear Search
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          ) : (
            <>
              {/* Words List */}
              <div className="space-y-6 w-full max-w-4xl mx-auto px-1 sm:px-0">
                {words.map((word: WordData) => (
                  <CompactWordDefinition key={word.word} data={word} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-2 mt-8 p-3 rounded-lg bg-muted/40 border border-border/60 w-full max-w-full sm:w-fit sm:flex-row sm:justify-center sm:items-center mx-auto">
                  <button
                    className="px-3 py-1.5 rounded-md border border-border bg-background text-foreground font-medium shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  <div className="flex gap-1 flex-nowrap overflow-x-auto scrollbar-hide px-1 w-full max-w-full sm:w-auto justify-center">
                    {pageList.map((p, idx) =>
                      p === "..." ? (
                        <span
                          key={"ellipsis-" + idx}
                          className="px-2 py-1 text-lg text-muted-foreground select-none"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={p}
                          className={`min-w-[2.5rem] px-3 py-1.5 rounded-md border border-border font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm sm:text-base ${
                            p === page
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground hover:bg-primary/10"
                          }`}
                          onClick={() => setPage(Number(p))}
                          aria-current={p === page ? "page" : undefined}
                        >
                          {p}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    className="px-3 py-1.5 rounded-md border border-border bg-background text-foreground font-medium shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MyWordsPage;
