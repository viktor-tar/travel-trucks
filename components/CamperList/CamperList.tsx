import CamperCard from "../CamperCard/CamperCard";
import { Camper } from "@/types/camper";
import styles from "./CamperList.module.css";

interface CamperListProps {
  campers: Camper[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

export default function CamperList({
  campers,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: CamperListProps) {
  return (
    <div className={styles.listContainer}>
      <div className={styles.cardsWrapper}>
        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>

      {hasNextPage && (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={isFetchingNextPage}
          className={styles.loadMoreBtn}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
