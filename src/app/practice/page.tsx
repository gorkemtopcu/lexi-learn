"use client";

import { useState } from "react";
import { VocabularyLevel } from "@/types/vocabulary";
import { PracticeHeader, LevelGrid } from "@/components/practice";
import { FlashcardSession } from "@/components/practice/flashcard";

export default function PracticePage() {
  const [selectedLevel, setSelectedLevel] = useState<VocabularyLevel | null>(
    null
  );

  const handleLevelSelect = (level: VocabularyLevel) => {
    setSelectedLevel(level);
  };

  const handleCloseSession = () => {
    setSelectedLevel(null);
  };

  // If a level is selected, show the flashcard session
  if (selectedLevel) {
    return (
      <FlashcardSession
        vocabularyLevel={selectedLevel}
        onClose={handleCloseSession}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <PracticeHeader />
      <LevelGrid onLevelSelect={handleLevelSelect} />
    </div>
  );
}
