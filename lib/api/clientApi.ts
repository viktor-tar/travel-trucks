import axios from "axios";
import {
  Camper,
  FetchCampersParams,
  FetchCampersResponse,
  BookingData,
  Review,
} from "@/types/camper";

const apiClient = axios.create({
  baseURL: "https://campers-api.goit.study",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCampers = async ({
  page = 1,
  perPage = 4,
  filters = {},
}: FetchCampersParams): Promise<FetchCampersResponse> => {
  const queryParams: Record<string, string | number | boolean> = {
    page,
    perPage,
  };

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== false) {
      queryParams[key] = value;
    }
  });

  const response = await apiClient.get<FetchCampersResponse>("/campers", {
    params: queryParams,
  });

  return response.data;
};

export const fetchCamperById = async (id: string): Promise<Camper> => {
  const response = await apiClient.get<Camper>(`/campers/${id}`);
  return response.data;
};

export const fetchCamperReviews = async (id: string): Promise<Review[]> => {
  const response = await apiClient.get<Review[]>(`/campers/${id}/reviews`);
  return response.data;
};

export const sendBookingRequest = async (
  camperId: string,
  bookingData: BookingData,
): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>(
    `/campers/${camperId}/booking-requests`,
    {
      name: bookingData.name,
      email: bookingData.email,
    },
  );
  return response.data;
};

export const createBooking = sendBookingRequest;
