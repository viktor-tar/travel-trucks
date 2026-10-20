import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import heroImage from "@/public/hero.jpg";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className={styles.background}
      />
      <Container className={styles.inner}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.subtitle}>You can find everything you want in our catalog</p>
        <Button href="/catalog">View Now</Button>
      </Container>
    </section>
  );
}
