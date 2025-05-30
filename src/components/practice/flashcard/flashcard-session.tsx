"use client";

import { useState } from "react";
import { VocabularyLevel } from "@/types/vocabulary";
import { Flashcard } from "./flashcard";
import { SessionHeader } from "./session-header";
import { ProgressBar } from "./progress-bar";
import { NavigationControls } from "./navigation-controls";
import { CompletionScreen } from "./completion-screen";

interface FlashcardSessionProps {
  vocabularyLevel: VocabularyLevel;
  onClose: () => void;
}

export function FlashcardSession({
  vocabularyLevel,
  onClose,
}: FlashcardSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const words = vocabularyLevel.words;
  const currentWord = words[currentIndex];

  const goToNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  const finishSession = () => {
    setIsCompleted(true);
  };

  // Progress calculation: 0% at start, 100% when completed
  const progress = isCompleted ? 100 : (currentIndex / words.length) * 100;

  // Show completion screen
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background p-2 sm:p-4">
        <div className="max-w-2xl mx-auto">
          <SessionHeader
            vocabularyLevel={vocabularyLevel}
            onClose={onClose}
            onRestart={restart}
            showRestart={false}
          />
          <ProgressBar
            vocabularyLevel={vocabularyLevel}
            currentIndex={currentIndex}
            totalCards={words.length}
            progress={progress}
            isCompleted={true}
          />
          <CompletionScreen
            vocabularyLevel={vocabularyLevel}
            totalWords={words.length}
            onRestart={restart}
            onClose={onClose}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4">
      <div className="max-w-2xl mx-auto">
        <SessionHeader
          vocabularyLevel={vocabularyLevel}
          onClose={onClose}
          onRestart={restart}
        />
        <ProgressBar
          vocabularyLevel={vocabularyLevel}
          currentIndex={currentIndex}
          totalCards={words.length}
          progress={progress}
        />
        <div className="mb-4 sm:mb-6">
          <Flashcard word={currentWord} />
        </div>
        <NavigationControls
          currentIndex={currentIndex}
          totalCards={words.length}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onFinish={finishSession}
        />
      </div>
    </div>
  );
}
