import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import emptyImage from "@/public/no-campers.webp";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  /** Clears every filter, which brings back the full catalog. */
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className={styles.card}>
      <Image
        src={emptyImage}
        alt=""
        className={styles.image}
        sizes="(max-width: 767px) 80vw, 488px"
      />
      <div className={styles.text}>
        <h2 className={styles.title}>No campers found</h2>
        <p>
          We couldn&apos;t find any campers that match your filters. Try adjusting your search or
          clearing some filters.
        </p>
      </div>
      <div className={styles.actions}>
        <Button variant="outline" onClick={onReset}>
          <Icon id="close" size={24} />
          Clear filters
        </Button>
        <Button onClick={onReset}>View all campers</Button>
      </div>
    </div>
  );
}
