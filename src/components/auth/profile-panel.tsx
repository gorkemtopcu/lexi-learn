import * as React from "react";
import { Button } from "@/components/ui/button";

export interface ProfilePanelProps {
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  wordCount: number;
  wordGoal: number;
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full bg-muted rounded-full h-3 mt-4 mb-2">
      <div
        className="bg-primary h-3 rounded-full transition-all"
        style={{ width: `${percent}%` }}
        aria-valuenow={value}
        aria-valuemax={max}
        aria-valuemin={0}
        role="progressbar"
      />
    </div>
  );
}

export function ProfilePanel({
  loading,
  error,
  signOut,
  wordCount,
  wordGoal,
}: ProfilePanelProps) {
  async function handleSignOut() {
    await signOut();
  }

  return (
    <div className="space-y-6 text-center">
      <ProgressBar value={wordCount} max={wordGoal} />
      <div className="text-xs text-muted-foreground mb-2">
        {wordCount} / {wordGoal} words saved
      </div>
      <Button
        onClick={handleSignOut}
        className="w-full"
        disabled={loading}
        variant="outline"
      >
        {loading ? "Signing Out..." : "Sign Out"}
      </Button>
      {error && <div className="text-sm text-destructive mt-2">{error}</div>}
    </div>
  );
}
