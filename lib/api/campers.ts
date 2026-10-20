import axios from "axios";
import type {
  BookingRequest,
  Camper,
  CamperFilters,
  CampersResponse,
  Review,
} from "@/types/camper";

export const PER_PAGE = 4;

const api = axios.create({
  baseURL: "https://campers-api.goit.study",
  headers: { "Content-Type": "application/json" },
});

/** Query key for the catalog list; the server prefetch and the client must agree on it. */
export const campersKey = (filters: CamperFilters) => ["campers", filters] as const;

export async function fetchCampers(page: number, filters: CamperFilters): Promise<CampersResponse> {
  const params: Record<string, string | number> = { page, perPage: PER_PAGE };
  const location = filters.location.trim();
  if (location) params.location = location;
  if (filters.form) params.form = filters.form;
  if (filters.engine) params.engine = filters.engine;
  if (filters.transmission) params.transmission = filters.transmission;

  const { data } = await api.get<CampersResponse>("/campers", { params });
  return data;
}

export async function fetchCamperById(id: string): Promise<Camper> {
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return data;
}

export async function fetchCamperReviews(id: string): Promise<Review[]> {
  const { data } = await api.get<Review[]>(`/campers/${id}/reviews`);
  return data;
}

export async function sendBookingRequest(
  camperId: string,
  booking: BookingRequest,
): Promise<{ message?: string }> {
  const { data } = await api.post<{ message?: string }>(
    `/campers/${camperId}/booking-requests`,
    booking,
  );
  return data;
}
