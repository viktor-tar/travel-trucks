import Image from "next/image";
import { BadgeList } from "@/components/Badge/Badge";
import { Button } from "@/components/Button/Button";
import { CamperMeta } from "@/components/CamperMeta/CamperMeta";
import { cardBadges, formatPrice } from "@/lib/camper";
import type { Camper } from "@/types/camper";
import styles from "./CamperCard.module.css";

interface CamperCardProps {
  camper: Camper;
  /** The first cards are visible straight away, so their photos load first. */
  priority?: boolean;
}

export function CamperCard({ camper, priority = false }: CamperCardProps) {
  return (
    <article className={styles.card}>
      <Image
        src={camper.coverImage}
        alt={camper.name}
        width={219}
        height={240}
        sizes="(max-width: 767px) 100vw, 219px"
        priority={priority}
        className={styles.image}
      />

      <div className={styles.info}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>{camper.name}</h2>
            <p className={styles.price}>{formatPrice(camper.price)}</p>
          </div>
          <CamperMeta
            rating={camper.rating}
            totalReviews={camper.totalReviews}
            location={camper.location}
          />
        </div>

        <p className={styles.description}>{camper.description}</p>

        <BadgeList badges={cardBadges(camper)} />

        <Button
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Show more
          <span className="visually-hidden">about {camper.name} (opens in a new tab)</span>
        </Button>
      </div>
    </article>
  );
}
