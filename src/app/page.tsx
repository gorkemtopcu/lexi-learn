"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen } from "lucide-react";
import { WordDefinition, type WordData } from "@/components/word-definition";

// Example API response for demonstration
const exampleData: WordData = {
  word: "hello",
  phonetic: "həˈləʊ",
  phonetics: [
    {
      text: "həˈləʊ",
      audio: "//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3"
    },
    {
      text: "hɛˈləʊ"
    }
  ],
  origin: "early 19th century: variant of earlier hollo ; related to holla.",
  meanings: [
    {
      partOfSpeech: "exclamation",
      definitions: [
        {
          definition: "used as a greeting or to begin a phone conversation.",
          example: "hello there, Katie!",
          synonyms: [],
          antonyms: []
        }
      ]
    },
    {
      partOfSpeech: "noun",
      definitions: [
        {
          definition: "an utterance of 'hello'; a greeting.",
          example: "she was getting polite nods and hellos from people",
          synonyms: [],
          antonyms: []
        }
      ]
    },
    {
      partOfSpeech: "verb",
      definitions: [
        {
          definition: "say or shout 'hello'.",
          example: "I pressed the phone button and helloed",
          synonyms: [],
          antonyms: []
        }
      ]
    }
  ]
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<WordData | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);

    // In a real app, you would fetch from an API here
    // For now, we'll simulate an API call with a timeout
    setTimeout(() => {
      setSearchResult(exampleData);
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center">
        <div className={`flex flex-col items-center justify-center ${!searchResult ? 'min-h-[calc(100vh-10rem)]' : 'py-12'} text-center`}>
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
            />
            <Button type="submit" size="icon" disabled={isSearching}>
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {isSearching && (
            <div className="mt-8">
              <p>Searching...</p>
            </div>
          )}

          {/* Add a button to show example result for testing */}
          {!searchResult && !isSearching && (
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setSearchResult(exampleData)}
              size="sm"
            >
              Show Example Result
            </Button>
          )}
        </div>

        {searchResult && !isSearching && (
          <WordDefinition data={searchResult} />
        )}
      </div>
    </div>
  );
}
