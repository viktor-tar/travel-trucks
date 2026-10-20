import { Icon } from "@/components/Icon/Icon";
import { formatLocation, reviewsLabel } from "@/lib/camper";
import type { Camper } from "@/types/camper";
import styles from "./CamperMeta.module.css";

type CamperMetaProps = Pick<Camper, "rating" | "totalReviews" | "location">;

/** Rating and location line, shared by the catalog card and the details page. */
export function CamperMeta({ rating, totalReviews, location }: CamperMetaProps) {
  return (
    <p className={styles.meta}>
      <span className={styles.item}>
        <Icon id="star" size={16} className={styles.star} />
        {reviewsLabel(rating, totalReviews)}
      </span>
      <span className={styles.item}>
        <Icon id="map" size={16} />
        {formatLocation(location)}
      </span>
    </p>
  );
}
