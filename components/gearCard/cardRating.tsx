
import { Star } from "lucide-react";


export interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  className?: string;
}

export function CardRating({
  rating = 0,
  reviewCount,
  className = "",
}: StarRatingProps) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full;
          const half = i === full && hasHalf;
          return (
            <Star
              key={i}
              className={
                filled || half
                  ? "h-4 w-4 fill-amber-400 text-amber-400"
                  : "h-4 w-4 fill-none text-muted-foreground/30"
              }
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      <span className="text-sm font-medium tabular-nums text-foreground">
        {rating.toFixed(1)}
      </span>
      {reviewCount != null && (
        <span className="text-xs text-muted-foreground">({reviewCount})</span>
      )}
    </div>
  );
}

export default CardRating;