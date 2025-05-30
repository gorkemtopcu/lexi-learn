import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { VocabularyLevel, getLevelConfig } from "@/types/vocabulary";
import { cn } from "@/lib/utils";

interface CompletionScreenProps {
  vocabularyLevel: VocabularyLevel;
  totalWords: number;
  onRestart: () => void;
  onClose: () => void;
}

export function CompletionScreen({
  vocabularyLevel,
  totalWords,
  onRestart,
  onClose,
}: CompletionScreenProps) {
  const levelConfig = getLevelConfig(vocabularyLevel.level);

  return (
    <div className="text-center p-6 sm:p-8 bg-muted/40 rounded-lg border border-border/60">
      <div className="mb-4">
        <div
          className={cn(
            "w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4",
            levelConfig.bgColor
          )}
        >
          <Check className="h-8 w-8 text-white" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">🎉 Session Complete!</h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-6">
        You&apos;ve successfully reviewed all {totalWords} words in the{" "}
        {vocabularyLevel.title} level.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onRestart} variant="outline" className="text-sm">
          Practice Again
        </Button>
        <Button onClick={onClose} className="text-sm">
          Back to Practice
        </Button>
      </div>
    </div>
  );
}
