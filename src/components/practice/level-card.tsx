import { VocabularyLevel } from "@/types/vocabulary";
import { cn } from "@/lib/utils";

interface LevelCardProps {
  level: VocabularyLevel;
  onSelect: (level: VocabularyLevel) => void;
}

export function LevelCard({ level, onSelect }: LevelCardProps) {
  return (
    <div
      onClick={() => onSelect(level)}
      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium",
            level.bgColor,
            level.color
          )}
        >
          {level.level}
        </div>
        <span className="text-sm text-muted-foreground">
          {level.words.length} words
        </span>
      </div>

      <h3 className="text-xl font-semibold mb-2">{level.title}</h3>

      <p className="text-muted-foreground mb-4 text-sm">{level.description}</p>

      <div className="text-sm text-primary font-medium">Start Practice →</div>
    </div>
  );
}
