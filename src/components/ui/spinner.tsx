import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string; // Accepts any valid CSS color
}

export function Spinner({
  className,
  size = "md",
  color = "currentColor",
}: SpinnerProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <span
      className={cn(
        "flex items-center justify-center",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="w-full h-full animate-spin block"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-20"
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="6"
          fill="none"
        />
        <path
          d="M45 25c0-11.046-8.954-20-20-20"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="spinner-gradient"
            x1="0"
            y1="0"
            x2="50"
            y2="50"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
        </defs>
      </svg>
      <span className="sr-only">Loading...</span>
    </span>
  );
}
