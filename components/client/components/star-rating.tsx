import { Star } from "lucide-react";

interface StarRatingProps {
  rating?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({
  rating = 0,
  max = 5,
  size = "sm",
  className,
}: StarRatingProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`
            ${size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6"}
            ${
              i < Number(rating.toLocaleString().split(".")[0])
                ? "fill-[#fbbf24] text-[#fbbf24]"
                : "fill-muted text-muted-foreground"
            }
          `}
        />
      ))}
    </div>
  );
}
