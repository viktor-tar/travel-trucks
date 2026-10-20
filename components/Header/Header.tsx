"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container/Container";
import { Logo } from "@/components/Logo/Logo";
import styles from "./Header.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
];

export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo />
        <nav aria-label="Main">
          <ul className={styles.menu}>
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={isActive(href) ? `${styles.link} ${styles.active}` : styles.link}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
