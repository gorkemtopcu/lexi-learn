import * as React from "react";
import { ACHIEVEMENTS, getCurrentAchievement } from "@/types/achievements";

interface AchievementsShowcaseProps {
  userWordCount: number;
  className?: string;
}

function AchievementCard({
  achievement,
  isEarned,
  isCurrent,
}: {
  achievement: (typeof ACHIEVEMENTS)[0];
  isEarned: boolean;
  isCurrent: boolean;
}) {
  return (
    <div
      className={`
      relative p-4 rounded-lg border transition-all duration-200 hover:shadow-md
      ${
        isEarned
          ? `${achievement.bgColor} border-current shadow-sm`
          : "bg-muted/30 border-muted-foreground/20"
      }
      ${isCurrent ? "ring-2 ring-primary ring-offset-2" : ""}
    `}
    >
      {isCurrent && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
          Current
        </div>
      )}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{achievement.icon}</span>
        <div className="flex-1">
          <h3
            className={`font-semibold text-sm ${
              isEarned ? achievement.color : "text-muted-foreground"
            }`}
          >
            {achievement.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {achievement.wordCount}{" "}
            {achievement.wordCount === 1 ? "word" : "words"}
          </p>
        </div>
      </div>
      <p
        className={`text-xs ${
          isEarned ? "text-foreground/80" : "text-muted-foreground"
        }`}
      >
        {achievement.description}
      </p>
    </div>
  );
}

export function AchievementsShowcase({
  userWordCount,
  className = "",
}: AchievementsShowcaseProps) {
  const currentAchievement = getCurrentAchievement(userWordCount);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-2">Achievement Levels</h2>
        <p className="text-sm text-muted-foreground">
          Track your vocabulary journey and unlock new achievements
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((achievement) => {
          const isEarned = userWordCount >= achievement.wordCount;
          const isCurrent = currentAchievement.id === achievement.id;

          return (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              isEarned={isEarned}
              isCurrent={isCurrent}
            />
          );
        })}
      </div>

      <div className="text-center pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          Keep saving words to unlock higher achievement levels!
        </p>
      </div>
    </div>
  );
}
