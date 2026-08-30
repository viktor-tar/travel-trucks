import Image from "next/image";
import { Icon } from "../Icon/Icon";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  onClearFilters?: () => void;
  onViewAll?: () => void;
}

export default function EmptyState({
  onClearFilters,
  onViewAll,
}: EmptyStateProps) {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.illustrationWrapper}>
        <Image
          src="/no-campers.png"
          alt="No campers found"
          width={240}
          height={140}
          priority
          style={{ objectFit: "contain" }}
        />
      </div>

      <h3 className={styles.title}>No campers found</h3>
      <p className={styles.text}>
        We couldn`t find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onClearFilters}
          className={styles.clearBtn}
        >
          <Icon id="close" width={16} height={16} />
          Clear filters
        </button>
        <button type="button" onClick={onViewAll} className={styles.viewAllBtn}>
          View all campers
        </button>
      </div>
    </div>
  );
}
