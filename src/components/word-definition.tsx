"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, Volume2, Info } from "lucide-react";
import { WordData } from "@/services/dictionary/types";
import { useAudioPlayer } from "@/hooks";

// Re-export WordData for backward compatibility
export type { WordData };

interface WordDefinitionProps {
  data: WordData | null;
  error?: string | null;
}

export function WordDefinition({ data }: WordDefinitionProps) {
  const [showOrigin, setShowOrigin] = React.useState(false);
  const { audioError, handlePlayAudio } = useAudioPlayer();

  // If data is null or undefined, don't render anything
  // The error will be shown in the page component
  if (!data) {
    return null;
  }

  // Find the first available audio
  const audioUrl = data.phonetics?.find(p => p.audio)?.audio;

  // Check if meanings array exists and has content
  const hasMeanings = data.meanings && data.meanings.length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto bg-card border rounded-lg p-6 pb-8 mt-4 text-left">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-3xl font-bold">{data.word}</h2>
          {data.phonetic && <p className="text-muted-foreground">{data.phonetic}</p>}
        </div>
        <div className="flex gap-2">
        {data.origin && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowOrigin(!showOrigin)}
              title="Show word origin"
              className={showOrigin ? "bg-primary/10" : ""}
            >
              <Info className="h-4 w-4" />
            </Button>
          )}
          {audioUrl && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePlayAudio(audioUrl)}
              title="Listen to pronunciation"
              aria-label="Play pronunciation"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            title="Save to My Words"
            aria-label="Save to My Words"
          >
            <BookmarkIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Display audio error if any */}
      {audioError && (
        <div className="mb-4 p-2 bg-destructive/10 border border-destructive/30 rounded text-sm text-destructive animate-in fade-in-50 duration-150">
          {audioError}
        </div>
      )}

      {showOrigin && data.origin && (
        <div className="mb-6 p-3 bg-muted/30 rounded-md border border-border/50 animate-in fade-in-50 duration-150">
          <h3 className="text-sm font-medium mb-1">Origin</h3>
          <p className="text-muted-foreground">{data.origin}</p>
        </div>
      )}

      {!hasMeanings && (
        <div className="py-6 text-center">
          <p className="text-muted-foreground">
            No definitions available for this word.
          </p>
        </div>
      )}

      {hasMeanings && (
        <div className="space-y-5">
          {data.meanings.map((meaning, index) => (
            <div key={index} className={index > 0 ? "mt-6" : ""}>
              <h3 className="text-lg font-semibold mb-3 inline-block bg-primary/10 px-3 py-1 rounded-md">
                {meaning.partOfSpeech}
              </h3>
              {meaning.definitions && meaning.definitions.length > 0 ? (
                <ol className="list-decimal space-y-3 ml-5">
                  {meaning.definitions.map((def, defIndex) => (
                    <li key={defIndex} className="pl-1 pb-1">
                      <span>{def.definition}</span>
                      {def.example && (
                        <p className="text-muted-foreground mt-1 pl-1 italic">
                          &quot;{def.example}&quot;
                        </p>
                      )}
                      {def.synonyms && def.synonyms.length > 0 && (
                        <div className="mt-2 pl-1">
                          <span className="text-sm font-medium">Synonyms: </span>
                          <span className="text-sm text-muted-foreground">
                            {def.synonyms.join(", ")}
                          </span>
                        </div>
                      )}
                      {def.antonyms && def.antonyms.length > 0 && (
                        <div className="mt-1 pl-1">
                          <span className="text-sm font-medium">Antonyms: </span>
                          <span className="text-sm text-muted-foreground">
                            {def.antonyms.join(", ")}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-muted-foreground ml-5">No definitions available for this part of speech.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
