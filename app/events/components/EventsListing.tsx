"use client";

import { useEffect, useState } from "react";
import Wrapper from "@/components/wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { defaultEventFilters } from "@/lib/schemas/eventSchemas";
import { useEventFilterOptions, useEvents } from "../api/useEvents";
import { useDebouncedValue } from "../lib/useDebouncedValue";
import { EventCard } from "./EventCard";
import { EventFiltersSidebar } from "./EventFiltersSidebar";
import { EventsPageHeader } from "./EventsPageHeader";
import { EventsPagination } from "./EventsPagination";

function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-md ring-1 ring-foreground/5">
      <Skeleton className="aspect-16/10 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-4 h-4 w-1/2" />
      </div>
    </div>
  );
}

export function EventsListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(defaultEventFilters);
  const [page, setPage] = useState(0);
  const debouncedSearch = useDebouncedValue(searchQuery, 400);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, filters]);

  const { data, isLoading, isError, isFetching } = useEvents({
    q: debouncedSearch,
    filters,
    page,
  });
  const { data: filterOptions } = useEventFilterOptions();

  const events = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  const handleFiltersChange = (nextFilters: typeof filters) => {
    setFilters(nextFilters);
  };

  return (
    <>
      <EventsPageHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <section className="w-full bg-background text-foreground">
        <Wrapper className="py-10 lg:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            <div className="w-full shrink-0 lg:w-64 xl:w-72">
              <EventFiltersSidebar
                filters={filters}
                cities={filterOptions?.cities ?? []}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-6 flex items-end justify-between gap-4">
                <p className="text-lg text-muted-foreground">
                  {isLoading
                    ? "Loading events..."
                    : `${totalElements} event${totalElements === 1 ? "" : "s"} found`}
                </p>
              </div>

              {isError && (
                <div className="mb-6 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  Could not load events, Please try again later.
                </div>
              )}

              {isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <EventCardSkeleton key={index} />
                  ))}
                </div>
              ) : events.length > 0 ? (
                <>
                  <div
                    className={`grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 ${isFetching ? "opacity-70" : ""}`}
                  >
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                  <EventsPagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-md bg-muted/40 px-6 py-16 text-center ring-1 ring-foreground/5">
                  <h3 className="text-xl font-medium tracking-tight">
                    No events found!
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Try adjusting your filters or search terms to discover more
                    events in your area.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Wrapper>
      </section>
    </>
  );
}
