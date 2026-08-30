import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container/Container";
import { Icon } from "@/components/Icon/Icon";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import ReviewsList from "@/components/ReviewsList/ReviewsList";
import { BookingForm } from "@/components/BookingForm/BookingForm";
import { fetchCamperById, fetchCamperReviews } from "@/lib/api/clientApi";
import { Review } from "@/types/camper";
import styles from "./CamperDetails.module.css";

interface PageProps {
  params: Promise<{
    camperId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { camperId } = await params;
    const camper = await fetchCamperById(camperId);
    return {
      title: `TravelTrucks — ${camper.name}`,
      description: camper.description
        ? camper.description.slice(0, 150)
        : "Camper details",
    };
  } catch {
    return {
      title: "TravelTrucks — Camper Details",
    };
  }
}

export default async function CamperDetailsPage({ params }: PageProps) {
  const { camperId } = await params;

  let camper;
  let reviews: Review[] = [];

  try {
    const [camperData, reviewsData] = await Promise.all([
      fetchCamperById(camperId),
      fetchCamperReviews(camperId).catch(() => []),
    ]);
    camper = camperData;
    reviews = reviewsData.length > 0 ? reviewsData : camperData.reviews || [];
  } catch {
    notFound();
  }

  const amenitiesList: string[] = Array.isArray(camper.amenities)
    ? camper.amenities
    : typeof camper.amenities === "string"
      ? [camper.amenities]
      : [];

  return (
    <section className={styles.section}>
      <Container>
        {/* Верхній ряд: Галерея (зліва) та Інформація/Характеристики (справа) */}
        <div className={styles.topGrid}>
          <div className={styles.leftColumn}>
            <ImageGallery gallery={camper.gallery || []} name={camper.name} />
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.infoCard}>
              <h1 className={styles.title}>{camper.name}</h1>
              <div className={styles.meta}>
                <div className={styles.rating}>
                  <Icon id="star-filled" width={16} height={16} />
                  <span>
                    {camper.rating} ({reviews.length} Reviews)
                  </span>
                </div>
                <div className={styles.location}>
                  <Icon id="map" width={16} height={16} />
                  <span>{camper.location}</span>
                </div>
              </div>
              <div className={styles.price}>€{camper.price}</div>
              <p className={styles.description}>{camper.description}</p>
            </div>

            <div className={styles.specsCard}>
              <h2 className={styles.specsTitle}>Vehicle details</h2>
              <ul className={styles.badges}>
                <li className={styles.badge}>{camper.transmission}</li>
                <li className={styles.badge}>{camper.engine}</li>
                {amenitiesList.map((amenity) => (
                  <li key={amenity} className={styles.badge}>
                    {amenity}
                  </li>
                ))}
              </ul>

              <div className={styles.specsList}>
                <div className={styles.specItem}>
                  <span>Form</span>
                  <span>{camper.form}</span>
                </div>
                <div className={styles.specItem}>
                  <span>Length</span>
                  <span>{camper.length}</span>
                </div>
                <div className={styles.specItem}>
                  <span>Width</span>
                  <span>{camper.width}</span>
                </div>
                <div className={styles.specItem}>
                  <span>Height</span>
                  <span>{camper.height}</span>
                </div>
                <div className={styles.specItem}>
                  <span>Tank</span>
                  <span>{camper.tank}</span>
                </div>
                <div className={styles.specItem}>
                  <span>Consumption</span>
                  <span>{camper.consumption}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Нижній ряд: Відгуки (зліва) та Форма бронювання (справа) */}
        <div className={styles.bottomGrid}>
          <div className={styles.reviewsColumn}>
            <ReviewsList reviews={reviews} />
          </div>
          <div className={styles.formColumn}>
            <BookingForm camperId={camperId} />
          </div>
        </div>
      </Container>
    </section>
  );
}
