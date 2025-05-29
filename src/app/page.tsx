"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, AlertCircle } from "lucide-react";
import { WordDefinition } from "@/components/word-definition";
import { WordData } from "@/services/dictionary-api/types";
import { fetchWordDefinition } from "@/services/dictionary-api";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<WordData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous results
    setError(null);
    setSearchResult(null);

    // Validate search term
    if (!searchTerm.trim()) {
      setError("Please enter a word to search");
      return;
    }

    setIsSearching(true);

    try {
      // Use the dictionary service to fetch word definition
      const result = await fetchWordDefinition(searchTerm);

      // Update state based on the service result
      setSearchResult(result.data);
      setError(result.error);
    } catch {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex flex-col items-center justify-center ${
            !searchResult ? "min-h-[calc(100vh-10rem)]" : "py-8"
          } text-center`}
        >
          <div className="mb-8 flex items-center">
            <BookOpen className="h-10 w-10 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Lexi Learn
            </h1>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mb-10">
            Your personal language learning assistant
          </p>

          <form onSubmit={handleSearch} className="w-full max-w-md flex gap-2">
            <Input
              type="text"
              placeholder="Search for a word..."
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isSearching}
            />
            <Button type="submit" size="icon" disabled={isSearching}>
              {isSearching ? (
                <Spinner size="sm" color="currentColor" className="mx-auto" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </form>

          {error && !isSearching && (
            <div className="mt-6 p-4 border border-destructive/50 bg-destructive/10 rounded-md flex items-start gap-3 max-w-md animate-in fade-in-50 duration-300">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-left">{error}</p>
            </div>
          )}
        </div>

        {!isSearching && searchResult && (
          <div className="animate-in fade-in-50 duration-300 mb-8">
            <WordDefinition data={searchResult} />
          </div>
        )}
      </div>
    </div>
  );
}
