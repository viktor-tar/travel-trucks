"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "../Container/Container";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Link href="/" className={styles.logo}>
          TravelTrucks
        </Link>
        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`${styles.link} ${pathname.startsWith("/catalog") ? styles.active : ""}`}
          >
            Catalog
          </Link>
        </nav>
      </Container>
    </header>
  );
}
