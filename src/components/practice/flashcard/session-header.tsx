import { Button } from "@/components/ui/button";
import { RotateCcw, X } from "lucide-react";
import { VocabularyLevel, getLevelConfig } from "@/types/vocabulary";
import { cn } from "@/lib/utils";

interface SessionHeaderProps {
  vocabularyLevel: VocabularyLevel;
  onClose: () => void;
  onRestart: () => void;
  showRestart?: boolean;
}

export function SessionHeader({
  vocabularyLevel,
  onClose,
  onRestart,
  showRestart = true,
}: SessionHeaderProps) {
  const levelConfig = getLevelConfig(vocabularyLevel.level);

  return (
    <div className="flex items-start justify-between mb-4 sm:mb-6 gap-2">
      <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 flex-shrink-0 mt-1"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-lg sm:text-xl font-semibold leading-tight">
              {vocabularyLevel.title}
            </h1>
            <span
              className={cn(
                "inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium",
                levelConfig.bgColor,
                levelConfig.color
              )}
            >
              {vocabularyLevel.level}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {vocabularyLevel.description}
          </p>
        </div>
      </div>
      {showRestart && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRestart}
          className="gap-1 sm:gap-2 flex-shrink-0 text-xs sm:text-sm px-2 sm:px-3"
        >
          <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Restart</span>
        </Button>
      )}
    </div>
  );
}
