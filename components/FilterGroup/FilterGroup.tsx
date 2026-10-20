import styles from "./FilterGroup.module.css";

interface FilterGroupProps<T extends string> {
  legend: string;
  name: string;
  options: Record<T, string>;
  value: T | undefined;
  onChange: (value: T | undefined) => void;
}

/**
 * One group of radio options. Clicking the chosen option again clears it,
 * so every group can go back to "any".
 */
export function FilterGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: FilterGroupProps<T>) {
  const entries = Object.entries(options) as [T, string][];

  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.options}>
        {entries.map(([id, label]) => (
          <label key={id} className={styles.option}>
            <input
              type="radio"
              name={name}
              value={id}
              checked={value === id}
              onChange={() => onChange(id)}
              onClick={() => value === id && onChange(undefined)}
              className={styles.radio}
            />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
