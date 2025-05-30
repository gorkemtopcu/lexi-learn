import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface NavigationControlsProps {
  currentIndex: number;
  totalCards: number;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export function NavigationControls({
  currentIndex,
  totalCards,
  onPrevious,
  onNext,
  onFinish,
}: NavigationControlsProps) {
  const isLastCard = currentIndex === totalCards - 1;
  const isFirstCard = currentIndex === 0;

  return (
    <div className="flex items-center justify-between">
      {/* Previous Button */}
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstCard}
        className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
      >
        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </Button>

      {/* Next/Finish Button */}
      {isLastCard ? (
        <Button
          onClick={onFinish}
          className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
        >
          <Check className="h-3 w-3 sm:h-4 sm:w-4" />
          Finish
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={onNext}
          className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">Next</span>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      )}
    </div>
  );
}
