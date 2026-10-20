import styles from "./Loader.module.css";

interface LoaderProps {
  title?: string;
  text?: string;
}

/** Spinner card from the design, shown over the page while data loads. */
export function Loader({
  title = "Loading trucks...",
  text = "Please wait while we fetch the best travel trucks for you",
}: LoaderProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.card} role="status" aria-live="polite">
        <svg
          className={styles.spinner}
          width="72"
          height="72"
          viewBox="0 0 72 72"
          aria-hidden="true"
        >
          <circle cx="36" cy="36" r="32.8" className={styles.track} />
          <path
            d="M68.56 32.06C70.32 31.85 71.58 30.25 71.21 28.52A36 36 0 0 0 34.86 0.02C33.1 0.07 31.85 1.68 32.06 3.44 32.27 5.19 33.87 6.42 35.63 6.4A29.6 29.6 0 0 1 64.84 29.3C65.24 31.02 66.81 32.27 68.56 32.06Z"
            className={styles.arc}
          />
        </svg>
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
}
