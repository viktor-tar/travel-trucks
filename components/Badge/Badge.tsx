import { Icon } from "@/components/Icon/Icon";
import type { BadgeData } from "@/lib/camper";
import styles from "./Badge.module.css";

interface BadgeListProps {
  badges: BadgeData[];
  className?: string;
}

/** A row of feature pills (engine, transmission, amenities…). */
export function BadgeList({ badges, className }: BadgeListProps) {
  return (
    <ul className={className ? `${styles.list} ${className}` : styles.list}>
      {badges.map(({ id, label, icon }) => (
        <li key={id} className={styles.badge}>
          {icon && <Icon id={icon} />}
          {label}
        </li>
      ))}
    </ul>
  );
}
