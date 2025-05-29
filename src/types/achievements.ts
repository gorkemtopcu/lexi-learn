export interface Achievement {
  id: string;
  title: string;
  description: string;
  wordCount: number;
  icon: string;
  color: string;
  bgColor: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "lexical-starter",
    title: "Lexical Starter",
    description: "Your vocabulary journey begins!",
    wordCount: 1,
    icon: "🌱",
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    id: "word-explorer",
    title: "Word Explorer",
    description: "Discovering new words",
    wordCount: 5,
    icon: "🔍",
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    id: "lexical-enthusiast",
    title: "Lexical Enthusiast",
    description: "Building vocabulary momentum",
    wordCount: 10,
    icon: "📚",
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    id: "vocabulary-builder",
    title: "Vocabulary Builder",
    description: "Steadily expanding knowledge",
    wordCount: 25,
    icon: "🏗️",
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    id: "word-collector",
    title: "Word Collector",
    description: "Amassing linguistic treasures",
    wordCount: 50,
    icon: "💎",
    color: "text-cyan-600",
    bgColor: "bg-cyan-100 dark:bg-cyan-900/20",
  },
  {
    id: "lexical-scholar",
    title: "Lexical Scholar",
    description: "Demonstrating serious dedication",
    wordCount: 100,
    icon: "🎓",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/20",
  },
  {
    id: "vocabulary-master",
    title: "Vocabulary Master",
    description: "Achieving linguistic excellence",
    wordCount: 200,
    icon: "👑",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
  },
  {
    id: "lexical-legend",
    title: "Lexical Legend",
    description: "Reaching legendary status",
    wordCount: 500,
    icon: "⭐",
    color: "text-amber-600",
    bgColor: "bg-amber-100 dark:bg-amber-900/20",
  },
  {
    id: "word-sage",
    title: "Word Sage",
    description: "Ultimate vocabulary wisdom",
    wordCount: 1000,
    icon: "🧙‍♂️",
    color: "text-violet-600",
    bgColor: "bg-violet-100 dark:bg-violet-900/20",
  },
];

// Default achievement for users with 0 words
const DEFAULT_ACHIEVEMENT: Achievement = {
  id: "getting-started",
  title: "Getting Started",
  description: "Ready to begin your vocabulary journey!",
  wordCount: 0,
  icon: "🚀",
  color: "text-gray-600",
  bgColor: "bg-gray-100 dark:bg-gray-900/20",
};

export function getCurrentAchievement(wordCount: number): Achievement {
  // Find the highest achievement the user has earned
  const earned = ACHIEVEMENTS.filter(achievement => wordCount >= achievement.wordCount);
  return earned.length > 0 ? earned[earned.length - 1] : DEFAULT_ACHIEVEMENT;
}

export function getNextAchievement(wordCount: number): Achievement | null {
  // Find the next achievement to work towards
  return ACHIEVEMENTS.find(achievement => wordCount < achievement.wordCount) || null;
}

export function getProgressToNext(wordCount: number): { current: number; target: number; percentage: number } {
  const nextAchievement = getNextAchievement(wordCount);
  const currentAchievement = getCurrentAchievement(wordCount);
  
  if (!nextAchievement) {
    // User has achieved the highest level
    return {
      current: wordCount,
      target: currentAchievement.wordCount,
      percentage: 100,
    };
  }
  
  // Determine thresholds to avoid division by zero and negative progress
  const nextTarget = nextAchievement.wordCount;
  // For users below the first threshold, previousTarget should be 0
  const previousTarget =
    wordCount < currentAchievement.wordCount
      ? 0
      : currentAchievement.wordCount;
  const progressInCurrentLevel = wordCount - previousTarget;
  const totalLevelRange = nextTarget - previousTarget;
  // Calculate percentage safely, defaulting to 0 if range is non-positive
  const percentage =
    totalLevelRange > 0
      ? Math.min(100, Math.round((progressInCurrentLevel / totalLevelRange) * 100))
      : 0;
  
  return {
    current: progressInCurrentLevel,
    target: totalLevelRange,
    percentage,
  };
} 