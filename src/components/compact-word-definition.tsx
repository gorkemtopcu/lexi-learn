"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, Volume2, Info, ChevronDown, ChevronUp } from "lucide-react";
import { WordData } from "./word-definition";

interface CompactWordDefinitionProps {
  data: WordData;
  isSaved?: boolean;
  onSave?: () => void;
  onRemove?: () => void;
}

export function CompactWordDefinition({
  data,
  isSaved = true,
  onSave,
  onRemove
}: CompactWordDefinitionProps) {
  const [expanded, setExpanded] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);

  const playAudio = (audioUrl: string) => {
    if (audioUrl) {
      const audio = new Audio(`https:${audioUrl}`);
      audio.play().catch(error => console.error("Error playing audio:", error));
    }
  };

  // Find the first available audio
  const audioUrl = data.phonetics?.find(p => p.audio)?.audio;

  // Get the first definition for compact view
  const firstDefinition = data.meanings[0]?.definitions[0]?.definition;
  const partOfSpeech = data.meanings[0]?.partOfSpeech;

  return (
    <div className="w-full bg-card border rounded-lg overflow-hidden text-left relative">
      {/* Compact View */}
      <div className={`p-4 ${expanded ? "pb-4" : "pb-14"}`}>
        <div className="flex justify-between items-start mb-1">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">{data.word}</h3>
              {partOfSpeech && (
                <span className="text-xs bg-primary/10 px-2 py-0.5 rounded-full">
                  {partOfSpeech}
                </span>
              )}
            </div>
            {data.phonetic && <p className="text-sm text-muted-foreground">{data.phonetic}</p>}
          </div>
          <div className="flex gap-1">
          {expanded && data.origin && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowOrigin(!showOrigin)}
                title="Show word origin"
                className={`h-8 w-8 ${showOrigin && expanded ? "bg-primary/10" : ""}`}
              >
                <Info className="h-3.5 w-3.5" />
              </Button>
            )}
            {audioUrl && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => playAudio(audioUrl)}
                title="Listen to pronunciation"
                className="h-8 w-8"
              >
                <Volume2 className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              title={isSaved ? "Remove from My Words" : "Save to My Words"}
              className="h-8 w-8"
              onClick={isSaved ? onRemove : onSave}
            >
              <BookmarkIcon className={`h-3.5 w-3.5 ${isSaved ? "fill-primary" : ""}`} />
            </Button>
          </div>
        </div>

        {!expanded && (
          <div className="mt-0">
            <p className="text-sm line-clamp-2">{firstDefinition}</p>
          </div>
        )}

      </div>

      {/* Fixed button at the bottom of the component */}
      <div className="absolute bottom-0 left-0 right-0 bg-card py-2 px-4 border-t shadow-sm">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="w-full justify-center text-xs font-medium"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5 mr-1" /> Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5 mr-1" /> Show More
            </>
          )}
        </Button>
      </div>

      {/* Expanded View */}
      {expanded && (
        <div className="px-4 pb-16 pt-0 -mt-1 animate-in fade-in-50 duration-150">
          {showOrigin && data.origin && (
            <div className="mb-4 p-3 bg-muted/30 rounded-md border border-border/50">
              <h4 className="text-xs font-medium mb-1">Origin</h4>
              <p className="text-xs text-muted-foreground">{data.origin}</p>
            </div>
          )}

          <div className="space-y-2">
            {data.meanings.map((meaning, index) => (
              <div key={index} className={`${index === 0 ? "-mt-1 mb-2" : "mb-4"}`}>
                <h4 className="text-sm font-semibold mb-1 inline-block bg-primary/10 px-2 py-0.5 rounded-md">
                  {meaning.partOfSpeech}
                </h4>
                <ol className="list-decimal space-y-1 ml-5 text-sm">
                  {meaning.definitions.map((def, defIndex) => (
                    <li key={defIndex} className="pl-1 mb-2">
                      <span>{def.definition}</span>
                      {def.example && (
                        <p className="text-xs text-muted-foreground mt-1 pl-1 italic">
                          &quot;{def.example}&quot;
                        </p>
                      )}
                      {def.synonyms.length > 0 && (
                        <div className="mt-1 pl-1">
                          <span className="text-xs font-medium">Synonyms: </span>
                          <span className="text-xs text-muted-foreground">
                            {def.synonyms.join(", ")}
                          </span>
                        </div>
                      )}
                      {def.antonyms.length > 0 && (
                        <div className="mt-1 pl-1">
                          <span className="text-xs font-medium">Antonyms: </span>
                          <span className="text-xs text-muted-foreground">
                            {def.antonyms.join(", ")}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
