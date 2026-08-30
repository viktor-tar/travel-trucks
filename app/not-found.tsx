import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Page Not Found</h2>
      <p className={styles.message}>
        Could not find the requested camper or page.
      </p>
      <Link href="/catalog" className={styles.link}>
        Back to Catalog
      </Link>
    </div>
  );
}
