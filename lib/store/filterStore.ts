import { create } from "zustand";
import { FilterParams, CamperForm, Engine, Transmission } from "@/types/camper";

export interface FilterState {
  filters: FilterParams;
  setFilters: (filters: FilterParams) => void;
  setLocation: (location: string) => void;
  setForm: (form?: CamperForm) => void;
  setEngine: (engine?: Engine) => void;
  setTransmission: (transmission?: Transmission) => void;
  resetFilters: () => void;
}

const initialFilters: FilterParams = {
  location: "",
  form: undefined,
  engine: undefined,
  transmission: undefined,
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: initialFilters,
  setFilters: (newFilters) => set({ filters: newFilters }),
  setLocation: (location) =>
    set((state) => ({ filters: { ...state.filters, location } })),
  setForm: (form) => set((state) => ({ filters: { ...state.filters, form } })),
  setEngine: (engine) =>
    set((state) => ({ filters: { ...state.filters, engine } })),
  setTransmission: (transmission) =>
    set((state) => ({ filters: { ...state.filters, transmission } })),
  resetFilters: () => set({ filters: initialFilters }),
}));
