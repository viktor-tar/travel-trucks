import { Button } from "@/components/Button/Button";
import { CamperCard } from "@/components/CamperCard/CamperCard";
import type { Camper } from "@/types/camper";
import styles from "./CamperList.module.css";

interface CamperListProps {
  campers: Camper[];
  hasNextPage: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
}

export function CamperList({ campers, hasNextPage, isLoadingMore, onLoadMore }: CamperListProps) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {campers.map((camper, index) => (
          <li key={camper.id}>
            <CamperCard camper={camper} priority={index < 2} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <Button
          variant="outline"
          onClick={onLoadMore}
          disabled={isLoadingMore}
          aria-busy={isLoadingMore}
        >
          {isLoadingMore && <span className={styles.spinner} aria-hidden="true" />}
          {isLoadingMore ? "Loading..." : "Load more"}
        </Button>
      )}
    </div>
  );
}
