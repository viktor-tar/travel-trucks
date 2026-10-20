"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/Button/Button";
import { FilterGroup } from "@/components/FilterGroup/FilterGroup";
import { Icon } from "@/components/Icon/Icon";
import { ENGINE_LABELS, FORM_LABELS, TRANSMISSION_LABELS } from "@/lib/camper";
import { useFilterStore } from "@/lib/store/filterStore";
import styles from "./CamperFilters.module.css";

export function CamperFilters() {
  const draft = useFilterStore((s) => s.draft);
  const setDraft = useFilterStore((s) => s.setDraft);
  const apply = useFilterStore((s) => s.apply);
  const reset = useFilterStore((s) => s.reset);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    apply();
  };

  return (
    <aside className={styles.sidebar} aria-label="Filters">
      <form className={styles.form} onSubmit={handleSubmit} role="search">
        <div className={styles.fields}>
          <div className={styles.location}>
            <label htmlFor="location" className={styles.label}>
              Location
            </label>
            <div className={styles.inputWrapper}>
              <Icon
                id="map"
                className={draft.location ? `${styles.mapIcon} ${styles.filled}` : styles.mapIcon}
              />
              <input
                id="location"
                name="location"
                type="text"
                placeholder="City"
                autoComplete="address-level2"
                value={draft.location}
                onChange={(e) => setDraft({ location: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.groups}>
            <h2 className={styles.heading}>Filters</h2>
            <FilterGroup
              legend="Camper form"
              name="form"
              options={FORM_LABELS}
              value={draft.form}
              onChange={(form) => setDraft({ form })}
            />
            <FilterGroup
              legend="Engine"
              name="engine"
              options={ENGINE_LABELS}
              value={draft.engine}
              onChange={(engine) => setDraft({ engine })}
            />
            <FilterGroup
              legend="Transmission"
              name="transmission"
              options={TRANSMISSION_LABELS}
              value={draft.transmission}
              onChange={(transmission) => setDraft({ transmission })}
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <Button type="submit" block>
            Search
          </Button>
          <Button variant="outline" block onClick={reset}>
            <Icon id="close" size={24} />
            Clear filters
          </Button>
        </div>
      </form>
    </aside>
  );
}
