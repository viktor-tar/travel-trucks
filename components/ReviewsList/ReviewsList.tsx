import { RatingStars } from "@/components/RatingStars/RatingStars";
import type { Review } from "@/types/camper";
import styles from "./ReviewsList.module.css";

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className={styles.empty}>No reviews yet. Be the first to travel in this camper!</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li key={review.id}>
          <article className={styles.review}>
            <div className={styles.person}>
              <span className={styles.avatar} aria-hidden="true">
                {review.reviewer_name.charAt(0).toUpperCase()}
              </span>
              <div className={styles.nameBlock}>
                <h3 className={styles.name}>{review.reviewer_name}</h3>
                <RatingStars rating={review.reviewer_rating} />
              </div>
            </div>
            <p className={styles.comment}>{review.comment}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
