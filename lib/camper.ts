import type { Amenity, Camper, CamperForm, Engine, Transmission } from "@/types/camper";

export const FORM_LABELS: Record<CamperForm, string> = {
  alcove: "Alcove",
  panel_van: "Panel Van",
  integrated: "Integrated",
  semi_integrated: "Semi Integrated",
};

export const ENGINE_LABELS: Record<Engine, string> = {
  diesel: "Diesel",
  petrol: "Petrol",
  hybrid: "Hybrid",
  electric: "Electric",
};

export const TRANSMISSION_LABELS: Record<Transmission, string> = {
  automatic: "Automatic",
  manual: "Manual",
};

export const AMENITY_LABELS: Record<Amenity, string> = {
  ac: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  tv: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

/** Sprite icon for each camper form. Semi-integrated campers share the integrated icon. */
export const FORM_ICONS: Record<CamperForm, string> = {
  alcove: "alcove",
  panel_van: "panel-van",
  integrated: "integrated",
  semi_integrated: "integrated",
};

export interface BadgeData {
  id: string;
  label: string;
  icon?: string;
}

/** The three key features shown on a catalog card. */
export function cardBadges(camper: Camper): BadgeData[] {
  return [
    { id: "engine", label: ENGINE_LABELS[camper.engine], icon: "petrol" },
    {
      id: "transmission",
      label: TRANSMISSION_LABELS[camper.transmission],
      icon: "automatic",
    },
    { id: "form", label: FORM_LABELS[camper.form], icon: FORM_ICONS[camper.form] },
  ];
}

/** Every feature, for the details page. */
export function detailBadges(camper: Camper): BadgeData[] {
  return [
    { id: "transmission", label: TRANSMISSION_LABELS[camper.transmission] },
    { id: "engine", label: ENGINE_LABELS[camper.engine] },
    ...camper.amenities
      .filter((a) => a in AMENITY_LABELS)
      .map((a) => ({ id: a, label: AMENITY_LABELS[a] })),
    { id: "form", label: FORM_LABELS[camper.form] },
  ];
}

export const formatPrice = (price: number) => `€${Math.round(price)}`;

/** "Ukraine, Kyiv" from the API reads as "Kyiv, Ukraine". */
export const formatLocation = (location: string) =>
  location
    .split(",")
    .map((part) => part.trim())
    .reverse()
    .join(", ");

/** "6.8m" -> "6.8 m", "22l/100km" -> "22 l / 100km". */
export const formatMeasure = (value: string) =>
  value.replace(/(\d)\s*([a-z]+)/gi, "$1 $2").replace(/\s*\/\s*/g, " / ");

export const reviewsLabel = (rating: number, total: number) =>
  `${rating} (${total} ${total === 1 ? "Review" : "Reviews"})`;
