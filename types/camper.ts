export type CamperForm =
  "alcove" | "panel_van" | "integrated" | "semi_integrated";
export type Transmission = "automatic" | "manual";
export type Engine = "diesel" | "petrol" | "hybrid" | "electric";

export interface GalleryItem {
  id?: string;
  camperId?: string;
  thumb: string;
  original: string;
  order?: number;
}

export interface Reviewer {
  id?: string;
  camperId?: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt?: string;
}

export type Review = Reviewer;

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: Transmission;
  engine: Engine;
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  gallery: GalleryItem[];
  reviews?: Reviewer[];
  coverImage?: string;
  totalReviews?: number;
  amenities?: string[] | string;
}

export interface CamperFilters {
  location?: string;
  form?: CamperForm;
  engine?: Engine;
  transmission?: Transmission;
}

export type FilterParams = CamperFilters;

export interface FetchCampersParams {
  page?: number;
  perPage?: number;
  filters?: CamperFilters;
}

export interface FetchCampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface BookingData {
  name: string;
  email: string;
}
