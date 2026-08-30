"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// Обов'язкові стилі Swiper
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  gallery: { thumb: string; original: string }[];
  name: string;
}

export default function ImageGallery({ gallery, name }: ImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  if (!gallery || gallery.length === 0) return null;

  // Вимикаємо loop, якщо картинок менше або дорівнює 1, щоб уникнути попереджень Swiper
  const isLoopEnabled = gallery.length > 1;

  return (
    <div className={styles.galleryContainer}>
      {/* Головний слайдер великого зображення */}
      <Swiper
        loop={isLoopEnabled}
        spaceBetween={10}
        navigation={true}
        observer={true}
        observeParents={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mainSwiper}
      >
        {gallery.map((item, index) => (
          <SwiperSlide key={index} className={styles.mainSlide}>
            <div className={styles.mainImageWrapper}>
              <Image
                src={item.original}
                alt={`${name} photo ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 1440px) 50vw, 600px"
                className={styles.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Нижня галерея мініатюр (Thumbs) */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={16}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        observer={true}
        observeParents={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.thumbsSwiper}
      >
        {gallery.map((item, index) => (
          <SwiperSlide key={index} className={styles.thumbSlide}>
            <div className={styles.thumbImageWrapper}>
              <Image
                src={item.thumb}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                sizes="120px"
                className={styles.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
