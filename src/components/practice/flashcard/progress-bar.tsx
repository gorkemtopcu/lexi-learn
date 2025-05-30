import { VocabularyLevel, getLevelConfig } from "@/types/vocabulary";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  vocabularyLevel: VocabularyLevel;
  currentIndex: number;
  totalCards: number;
  progress: number;
  isCompleted?: boolean;
}

export function ProgressBar({
  vocabularyLevel,
  currentIndex,
  totalCards,
  progress,
  isCompleted = false,
}: ProgressBarProps) {
  const levelConfig = getLevelConfig(vocabularyLevel.level);

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-medium">
          {isCompleted
            ? "Session Complete"
            : `Card ${currentIndex + 1} of ${totalCards}`}
        </span>
        <span className="text-xs sm:text-sm text-muted-foreground">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
        <div
          className={cn(
            "h-1.5 sm:h-2 rounded-full transition-all duration-300",
            levelConfig.progressColor
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
