import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { campersKey, fetchCampers } from "@/lib/api/campers";
import { EMPTY_FILTERS } from "@/lib/store/filterStore";
import { CatalogClient } from "./CatalogClient";

export const metadata: Metadata = {
  title: "Camper catalog",
  description:
    "Browse campers for rent and filter them by location, body type, engine and transmission.",
  alternates: { canonical: "/catalog" },
};

// Refresh the prefetched first page at most every 10 minutes.
export const revalidate = 600;

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  // The first page renders on the server, so the catalog shows campers without a loading step.
  await queryClient.prefetchInfiniteQuery({
    queryKey: campersKey(EMPTY_FILTERS),
    queryFn: ({ pageParam }) => fetchCampers(pageParam, EMPTY_FILTERS),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
