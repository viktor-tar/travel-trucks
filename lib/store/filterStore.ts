import { create } from "zustand";
import type { CamperFilters } from "@/types/camper";

export const EMPTY_FILTERS: CamperFilters = {
  location: "",
  form: undefined,
  engine: undefined,
  transmission: undefined,
};

interface FilterState {
  /** What the sidebar shows while the user is choosing. */
  draft: CamperFilters;
  /** What the catalog is filtered by (after "Search"). */
  applied: CamperFilters;
  setDraft: (patch: Partial<CamperFilters>) => void;
  apply: () => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  draft: EMPTY_FILTERS,
  applied: EMPTY_FILTERS,
  setDraft: (patch) => set((state) => ({ draft: { ...state.draft, ...patch } })),
  apply: () => set((state) => ({ applied: { ...state.draft } })),
  reset: () => set({ draft: EMPTY_FILTERS, applied: EMPTY_FILTERS }),
}));
