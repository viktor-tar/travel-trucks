"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCampers } from "@/lib/api/clientApi";
import CamperList from "@/components/CamperList/CamperList";
import { CamperFilters } from "@/components/CamperFilters/CamperFilters";
import EmptyState from "@/components/CamperList/EmptyState";
import { Container } from "@/components/Container/Container";
import { useFilterStore } from "@/lib/store/filterStore";
import { Camper } from "@/types/camper";
import styles from "./CatalogPage.module.css";

const PER_PAGE = 4;

export default function CatalogPage() {
  const { filters, resetFilters } = useFilterStore();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchCampers({ page: pageParam, perPage: PER_PAGE, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.length * PER_PAGE;
      return loadedCount < lastPage.total ? allPages.length + 1 : undefined;
    },
  });

  if (isError) {
    return (
      <main className={styles.catalogSection}>
        <Container>
          <div style={{ textAlign: "center", padding: "48px", color: "red" }}>
            Помилка завантаження даних. Спробуйте пізніше.
          </div>
        </Container>
      </main>
    );
  }

  const campers: Camper[] = data?.pages.flatMap((page) => page.campers) || [];

  return (
    <main className={styles.catalogSection}>
      <Container>
        <div className={styles.catalogContainer}>
          <CamperFilters />

          <section style={{ flexGrow: 1 }}>
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "48px" }}>
                Завантаження...
              </div>
            ) : campers.length === 0 ? (
              <EmptyState
                onClearFilters={resetFilters}
                onViewAll={resetFilters}
              />
            ) : (
              <CamperList
                campers={campers}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                onLoadMore={() => fetchNextPage()}
              />
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}
