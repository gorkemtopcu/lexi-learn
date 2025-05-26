import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  getCurrentAchievement,
  getNextAchievement,
  getProgressToNext,
} from "@/types/achievements";

export interface ProfilePanelProps {
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  wordCount: number;
}

function AchievementBadge({
  achievement,
  isEarned = false,
  size = "default",
}: {
  achievement: {
    title: string;
    icon: string;
    color: string;
    bgColor: string;
    description: string;
  };
  isEarned?: boolean;
  size?: "default" | "compact";
}) {
  const sizeClasses =
    size === "compact"
      ? "px-2 py-1 text-xs gap-1.5"
      : "px-3 py-2 text-sm gap-2";

  return (
    <div
      className={`inline-flex items-center rounded-full font-medium transition-all ${sizeClasses} ${
        isEarned
          ? `${achievement.color} ${achievement.bgColor} shadow-sm`
          : "text-muted-foreground bg-muted/50"
      }`}
    >
      <span className={size === "compact" ? "text-sm" : "text-base"}>
        {achievement.icon}
      </span>
      <span className="font-semibold">{achievement.title}</span>
    </div>
  );
}

function ProgressBar({
  current,
  target,
  percentage,
}: {
  current: number;
  target: number;
  percentage: number;
}) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-muted-foreground">
          {current}/{target}
        </span>
        <span className="text-xs text-muted-foreground font-medium">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-1.5">
        <div
          className="bg-gradient-to-r from-primary to-primary/80 h-1.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          aria-valuenow={current}
          aria-valuemax={target}
          aria-valuemin={0}
          role="progressbar"
        />
      </div>
    </div>
  );
}

export function ProfilePanel({
  loading,
  error,
  signOut,
  wordCount,
}: ProfilePanelProps) {
  const currentAchievement = getCurrentAchievement(wordCount);
  const nextAchievement = getNextAchievement(wordCount);
  const progress = getProgressToNext(wordCount);

  async function handleSignOut() {
    await signOut();
  }

  return (
    <div className="space-y-4">
      {/* Header with Current Achievement and Word Count */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border">
        <div className="flex-1">
          <AchievementBadge
            achievement={currentAchievement}
            isEarned={true}
            size="compact"
          />
          <p className="text-xs text-muted-foreground mt-1 italic">
            {currentAchievement.description}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-primary">{wordCount}</div>
          <div className="text-xs text-muted-foreground">
            {wordCount === 1 ? "word" : "words"}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      {nextAchievement ? (
        <div className="space-y-3 p-3 bg-muted/20 rounded-lg border border-dashed">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Next Goal
            </span>
            <span className="text-xs text-muted-foreground">
              {nextAchievement.wordCount - wordCount} more needed
            </span>
          </div>

          <AchievementBadge
            achievement={nextAchievement}
            isEarned={false}
            size="compact"
          />

          <ProgressBar
            current={progress.current}
            target={progress.target}
            percentage={progress.percentage}
          />
        </div>
      ) : (
        <div className="p-3 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="text-center">
            <div className="text-lg mb-1">🎉</div>
            <div className="text-xs font-medium text-amber-700 dark:text-amber-300">
              Maximum Level Achieved!
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
              You&apos;ve mastered all achievement levels!
            </p>
          </div>
        </div>
      )}

      {/* Sign Out Button */}
      <Button
        onClick={handleSignOut}
        className="w-full"
        disabled={loading}
        variant="outline"
        size="sm"
      >
        {loading ? "Signing Out..." : "Sign Out"}
      </Button>

      {error && (
        <div className="text-xs text-destructive bg-destructive/10 p-2 rounded border border-destructive/20">
          {error}
        </div>
      )}
    </div>
  );
}
