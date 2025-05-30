import { Layers } from "lucide-react";
import { VOCABULARY_DATA, VocabularyLevel } from "@/types/vocabulary";
import { LevelCard } from "./level-card";

interface LevelGridProps {
  onLevelSelect: (level: VocabularyLevel) => void;
}

export function LevelGrid({ onLevelSelect }: LevelGridProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Layers className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">Flashcard Practice</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VOCABULARY_DATA.map((level) => (
          <LevelCard key={level.level} level={level} onSelect={onLevelSelect} />
        ))}
      </div>
    </div>
  );
}
