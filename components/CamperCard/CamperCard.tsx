import Image from "next/image";
import Link from "next/link";
import { Camper } from "@/types/camper";
import { Icon } from "../Icon/Icon";
import styles from "./CamperCard.module.css";

interface CamperCardProps {
  camper: Camper;
}

interface BadgeItem {
  id: string;
  label: string;
  iconId: string;
}

const FORM_LABELS: Record<string, string> = {
  panelVan: "Panel Van",
  fullyIntegrated: "Fully Integrated",
  alcove: "Alcove",
  panel_van: "Panel Van",
  integrated: "Fully Integrated",
};

const AMENITIES_MAP: Record<string, { label: string; iconId: string }> = {
  kitchen: { label: "Kitchen", iconId: "kitchen" },
  ac: { label: "AC", iconId: "AC" },
  bathroom: { label: "Bathroom", iconId: "bathroom" },
  tv: { label: "TV", iconId: "TV" },
  radio: { label: "Radio", iconId: "radio" },
  refrigerator: { label: "Refrigerator", iconId: "refrigerator" },
  microwave: { label: "Microwave", iconId: "microwave" },
  gas: { label: "Gas", iconId: "gas" },
  water: { label: "Water", iconId: "water" },
};

export default function CamperCard({ camper }: CamperCardProps) {
  const formattedPrice = `€${Math.floor(camper.price).toLocaleString("en-US")}`;

  const imageSrc =
    camper.coverImage ||
    camper.gallery?.[0]?.thumb ||
    camper.gallery?.[0]?.original ||
    "/images/Hero.png";

  const getBadges = (): BadgeItem[] => {
    const list: BadgeItem[] = [];

    if (camper.transmission) {
      list.push({
        id: "transmission",
        label:
          camper.transmission.charAt(0).toUpperCase() +
          camper.transmission.slice(1),
        iconId: "transmission",
      });
    }

    if (camper.engine) {
      list.push({
        id: "engine",
        label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1),
        iconId: "engine",
      });
    }

    if (camper.form) {
      // Явно вказуємо string для iconId, щоб TS не обмежував його типом CamperForm
      let iconId: string = camper.form;
      if (camper.form === "panel_van") iconId = "panelVan";
      if (camper.form === "integrated") iconId = "fullyIntegrated";

      list.push({
        id: "form",
        label: FORM_LABELS[camper.form] || camper.form,
        iconId: iconId,
      });
    }

    Object.keys(AMENITIES_MAP).forEach((key) => {
      let isPresent = false;

      if (Array.isArray(camper.amenities)) {
        isPresent = camper.amenities.includes(key);
      } else if (typeof camper.amenities === "string") {
        isPresent = (camper.amenities as string).includes(key);
      } else {
        isPresent = Boolean(camper[key as keyof Camper]);
      }

      if (isPresent) {
        list.push({
          id: key,
          label: AMENITIES_MAP[key].label,
          iconId: AMENITIES_MAP[key].iconId,
        });
      }
    });

    return list;
  };

  const badges = getBadges();

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={camper.name}
          width={292}
          height={320}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{camper.name}</h2>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>{formattedPrice}</span>
            <button
              type="button"
              className={styles.heartBtn}
              aria-label="Add to favorites"
            >
              <Icon id="heart" width={24} height={24} />
            </button>
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.rating}>
            <Icon id="star-filled" width={16} height={16} />
            <span>
              {camper.rating} (
              {camper.totalReviews ?? camper.reviews?.length ?? 0} Reviews)
            </span>
          </div>
          <div className={styles.location}>
            <Icon id="map" width={16} height={16} />
            <span>{camper.location}</span>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <ul className={styles.badges}>
          {badges.map((badge) => (
            <li key={badge.id} className={styles.badge}>
              <Icon id={badge.iconId} width={20} height={20} />
              <span className={styles.badgeText}>{badge.label}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.showMoreBtn}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
