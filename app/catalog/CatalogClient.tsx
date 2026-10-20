"use client";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { CamperFilters } from "@/components/CamperFilters/CamperFilters";
import { CamperList } from "@/components/CamperList/CamperList";
import { EmptyState } from "@/components/CamperList/EmptyState";
import { Container } from "@/components/Container/Container";
import { Loader } from "@/components/Loader/Loader";
import { StatusMessage } from "@/components/StatusMessage/StatusMessage";
import { Button } from "@/components/Button/Button";
import { campersKey, fetchCampers } from "@/lib/api/campers";
import { useFilterStore } from "@/lib/store/filterStore";
import styles from "./Catalog.module.css";

export function CatalogClient() {
  const filters = useFilterStore((s) => s.applied);
  const reset = useFilterStore((s) => s.reset);

  const {
    data,
    isPending,
    isError,
    isPlaceholderData,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: campersKey(filters),
    queryFn: ({ pageParam }) => fetchCampers(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page < last.totalPages ? last.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];
  // Overlay only while a new filter loads; a quiet background refresh of the same list doesn't need one.
  const showLoader = isPending || isPlaceholderData;

  let content;
  if (isError && !data) {
    content = (
      <StatusMessage
        title="Couldn't load campers"
        text="Something went wrong while loading the catalog. Please try again."
      >
        <Button onClick={() => refetch()}>Try again</Button>
      </StatusMessage>
    );
  } else if (data && campers.length === 0) {
    content = <EmptyState onReset={reset} />;
  } else {
    content = (
      <CamperList
        campers={campers}
        hasNextPage={hasNextPage}
        isLoadingMore={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
      />
    );
  }

  return (
    <Container className={styles.catalog}>
      <h1 className="visually-hidden">Camper catalog</h1>
      <CamperFilters />
      <section className={styles.results} aria-label="Campers" aria-busy={showLoader}>
        {content}
      </section>
      {showLoader && <Loader />}
    </Container>
  );
}
