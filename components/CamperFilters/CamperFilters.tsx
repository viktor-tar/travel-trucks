"use client";

import { useState } from "react";
import { useFilterStore } from "@/lib/store/filterStore";
import {
  CamperFilters as ICamperFilters,
  CamperForm,
  Engine,
  Transmission,
} from "@/types/camper";
import { Icon } from "@/components/Icon/Icon";
import styles from "./CamperFilters.module.css";

const VEHICLE_TYPES: { id: CamperForm; label: string }[] = [
  { id: "alcove", label: "Alcove" },
  { id: "panel_van", label: "Panel Van" },
  { id: "integrated", label: "Integrated" },
  { id: "semi_integrated", label: "Semi Integrated" },
];

const ENGINE_TYPES: { id: Engine; label: string }[] = [
  { id: "diesel", label: "Diesel" },
  { id: "petrol", label: "Petrol" },
  { id: "hybrid", label: "Hybrid" },
  { id: "electric", label: "Electric" },
];

const TRANSMISSION_TYPES: { id: Transmission; label: string }[] = [
  { id: "automatic", label: "Automatic" },
  { id: "manual", label: "Manual" },
];

export function CamperFilters() {
  const { filters, setFilters, resetFilters } = useFilterStore();

  const [localFilters, setLocalFilters] = useState<ICamperFilters>({
    location: filters.location || "",
    form: filters.form,
    engine: filters.engine,
    transmission: filters.transmission,
  });

  const handleRadioChange = <K extends keyof ICamperFilters>(
    field: K,
    value: ICamperFilters[K],
  ) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: prev[field] === value ? undefined : value,
    }));
  };

  const handleSearch = () => {
    setFilters(localFilters);
  };

  const handleReset = () => {
    const cleared: ICamperFilters = {
      location: "",
      form: undefined,
      engine: undefined,
      transmission: undefined,
    };
    setLocalFilters(cleared);
    resetFilters();
  };

  return (
    <aside className={styles.filtersSidebar}>
      <div className={styles.filterGroup}>
        <label className={styles.groupLabel} htmlFor="location">
          Location
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="location"
            type="text"
            value={localFilters.location || ""}
            onChange={(e) =>
              setLocalFilters((prev) => ({ ...prev, location: e.target.value }))
            }
            placeholder="City"
            className={styles.locationInput}
          />
          <Icon id="map" width={18} height={18} className={styles.inputIcon} />
        </div>
      </div>

      <p className={styles.filtersHeading}>Filters</p>

      <div className={styles.filterGroup}>
        <h3 className={styles.subHeading}>Vehicle type</h3>
        <div className={styles.radioGroup}>
          {VEHICLE_TYPES.map((type) => (
            <label key={type.id} className={styles.radioLabel}>
              <input
                type="radio"
                name="form"
                checked={localFilters.form === type.id}
                onChange={() => handleRadioChange("form", type.id)}
                className={styles.radioInput}
              />
              <span>{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.subHeading}>Engine</h3>
        <div className={styles.radioGroup}>
          {ENGINE_TYPES.map((engine) => (
            <label key={engine.id} className={styles.radioLabel}>
              <input
                type="radio"
                name="engine"
                checked={localFilters.engine === engine.id}
                onChange={() => handleRadioChange("engine", engine.id)}
                className={styles.radioInput}
              />
              <span>{engine.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.subHeading}>Transmission</h3>
        <div className={styles.radioGroup}>
          {TRANSMISSION_TYPES.map((item) => (
            <label key={item.id} className={styles.radioLabel}>
              <input
                type="radio"
                name="transmission"
                checked={localFilters.transmission === item.id}
                onChange={() => handleRadioChange("transmission", item.id)}
                className={styles.radioInput}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={handleSearch}
          className={styles.searchButton}
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={styles.clearButton}
        >
          <Icon id="close" width={14} height={14} />
          <span>Clear filters</span>
        </button>
      </div>
    </aside>
  );
}
