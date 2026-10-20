import { Icon } from "@/components/Icon/Icon";
import styles from "./RatingStars.module.css";

export function RatingStars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);

  return (
    <span className={styles.stars} role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          id="star"
          size={16}
          className={star <= rounded ? styles.filled : styles.empty}
        />
      ))}
    </span>
  );
}
