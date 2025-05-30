"use client";

import { useState } from "react";
import { VocabularyWord } from "@/types/vocabulary";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  word: VocabularyWord;
  className?: string;
}

export function Flashcard({ word, className }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={cn(
        "relative w-full h-64 sm:h-80 cursor-pointer perspective-1000",
        className
      )}
      onClick={handleFlip}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 transform-style-preserve-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* Front of card - Word */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-card border border-border rounded-lg shadow-lg">
          <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              {word.word}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Click to see definition
            </p>
          </div>
        </div>

        {/* Back of card - Definition and Example */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-card border border-border rounded-lg shadow-lg rotate-y-180">
          <div className="flex flex-col justify-center h-full p-4 sm:p-6 text-center">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">
                Definition
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {word.definition}
              </p>
            </div>
            <div className="mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">
                Example
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground italic leading-relaxed">
                &quot;{word.example}&quot;
              </p>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-4">
              Click to see word
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
