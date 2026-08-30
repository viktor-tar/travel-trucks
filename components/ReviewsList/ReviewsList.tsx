import { Review } from "@/types/camper";
import RatingStars from "../RatingStars/RatingStars";
import styles from "./ReviewsList.module.css";

interface ReviewsListProps {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Reviews</h3>
      <div className={styles.list}>
        {reviews.map((rev, idx) => (
          <div key={idx} className={styles.reviewCard}>
            <div className={styles.userHeader}>
              <div className={styles.avatar}>
                {rev.reviewer_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className={styles.userName}>{rev.reviewer_name}</h4>
                <RatingStars rating={rev.reviewer_rating} />
              </div>
            </div>
            <p className={styles.comment}>{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
