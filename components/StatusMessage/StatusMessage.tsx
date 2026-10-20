import type { ReactNode } from "react";
import { Container } from "@/components/Container/Container";
import styles from "./StatusMessage.module.css";

interface StatusMessageProps {
  title: string;
  text: string;
  eyebrow?: string;
  heading?: "h1" | "h2";
  children?: ReactNode;
}

/** Centred card for the 404 and error pages. */
export function StatusMessage({
  title,
  text,
  eyebrow,
  heading: Heading = "h2",
  children,
}: StatusMessageProps) {
  return (
    <Container className={styles.wrapper}>
      <div className={styles.card}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <Heading className={styles.title}>{title}</Heading>
        <p className={styles.text}>{text}</p>
        {children}
      </div>
    </Container>
  );
}
