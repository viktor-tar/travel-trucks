import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { isAxiosError } from "axios";
import { BadgeList } from "@/components/Badge/Badge";
import { BookingForm } from "@/components/BookingForm/BookingForm";
import { CamperMeta } from "@/components/CamperMeta/CamperMeta";
import { Container } from "@/components/Container/Container";
import { ImageGallery } from "@/components/ImageGallery/ImageGallery";
import { ReviewsList } from "@/components/ReviewsList/ReviewsList";
import { fetchCamperById, fetchCamperReviews } from "@/lib/api/campers";
import { detailBadges, FORM_LABELS, formatMeasure, formatPrice } from "@/lib/camper";
import styles from "./CamperDetails.module.css";

interface PageProps {
  params: Promise<{ camperId: string }>;
}

/** One request per page render, shared by the metadata and the page. */
const getCamper = cache(async (id: string) => {
  try {
    return await fetchCamperById(id);
  } catch (error) {
    if (isAxiosError(error) && (error.response?.status === 404 || error.response?.status === 400)) {
      notFound();
    }
    throw error;
  }
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { camperId } = await params;
  const camper = await getCamper(camperId);
  const description =
    camper.description.length > 155
      ? `${camper.description.slice(0, 154).trimEnd()}…`
      : camper.description;

  return {
    title: camper.name,
    description,
    alternates: { canonical: `/catalog/${camper.id}` },
    openGraph: {
      title: `${camper.name} | TravelTrucks`,
      description,
      url: `/catalog/${camper.id}`,
      images: [{ url: camper.coverImage, alt: camper.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${camper.name} | TravelTrucks`,
      description,
      images: [camper.coverImage],
    },
  };
}

export default async function CamperDetailsPage({ params }: PageProps) {
  const { camperId } = await params;
  const [camper, reviews] = await Promise.all([
    getCamper(camperId),
    fetchCamperReviews(camperId).catch(() => []),
  ]);

  const specs = [
    { label: "Form", value: FORM_LABELS[camper.form] },
    { label: "Length", value: formatMeasure(camper.length) },
    { label: "Width", value: formatMeasure(camper.width) },
    { label: "Height", value: formatMeasure(camper.height) },
    { label: "Tank", value: formatMeasure(camper.tank) },
    { label: "Consumption", value: formatMeasure(camper.consumption) },
  ];

  return (
    <Container className={styles.page}>
      <div className={styles.top}>
        <ImageGallery images={camper.gallery ?? []} name={camper.name} />

        <div className={styles.info}>
          <section className={styles.card} aria-labelledby="camper-name">
            <div className={styles.summary}>
              <h1 id="camper-name" className={styles.title}>
                {camper.name}
              </h1>
              <CamperMeta
                rating={camper.rating}
                totalReviews={camper.totalReviews}
                location={camper.location}
              />
              <p className={styles.price}>{formatPrice(camper.price)}</p>
            </div>
            <p className={styles.description}>{camper.description}</p>
          </section>

          <section className={`${styles.card} ${styles.details}`} aria-labelledby="vehicle-details">
            <h2 id="vehicle-details" className={styles.title}>
              Vehicle details
            </h2>
            <BadgeList badges={detailBadges(camper)} />
            <dl className={styles.specs}>
              {specs.map(({ label, value }) => (
                <div key={label} className={styles.spec}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      <section className={styles.bottom} aria-labelledby="reviews">
        <h2 id="reviews" className={styles.title}>
          Reviews
        </h2>
        <div className={styles.bottomGrid}>
          <ReviewsList reviews={reviews} />
          <BookingForm camperId={camper.id} camperName={camper.name} />
        </div>
      </section>
    </Container>
  );
}
