import { Icon } from "../Icon/Icon";
import styles from "./RatingStars.module.css";

interface RatingStarsProps {
  rating: number;
}

export default function RatingStars({ rating }: RatingStarsProps) {
  return (
    <div className={styles.starsWrapper}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          id={star <= rating ? "star-filled" : "star-empty"}
          width={16}
          height={16}
          className={star <= rating ? styles.starFilled : styles.starEmpty}
        />
      ))}
    </div>
  );
}
