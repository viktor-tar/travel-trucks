"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "@/types/camper";
import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: GalleryItem[];
  name: string;
}

/** Large photo with a row of thumbnails underneath; a thumbnail swaps the large photo. */
export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const sorted = [...images].sort((a, b) => a.order - b.order);

  if (sorted.length === 0) return null;
  const current = sorted[Math.min(active, sorted.length - 1)];

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <Image
          key={current.id}
          src={current.original}
          alt={`${name}, photo ${active + 1} of ${sorted.length}`}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 638px"
          className={styles.image}
        />
      </div>

      {sorted.length > 1 && (
        <ul className={styles.thumbs} aria-label="Photos">
          {sorted.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={index === active ? `${styles.thumb} ${styles.active}` : styles.thumb}
                onClick={() => setActive(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={index === active}
              >
                <Image
                  src={item.thumb}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 25vw, 136px"
                  className={styles.image}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
