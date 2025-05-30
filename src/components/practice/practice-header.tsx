import { Target } from "lucide-react";

export function PracticeHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Target className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold text-foreground">Practice</h1>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Practice vocabulary with interactive flashcards organized by CEFR levels
      </p>
    </div>
  );
}
