"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import {
  EVENTS_PAGE_SIZE,
  eventFilterOptionsSchema,
  eventPageSchema,
  eventSchema,
  type Event,
  type EventFilterOptions,
  type EventFilters,
  type EventPage,
} from "@/lib/schemas/eventSchemas";

export interface EventQueryParams {
  q: string;
  filters: EventFilters;
  page: number;
}

const appendList = (
  params: URLSearchParams,
  key: string,
  values: string[],
) => {
  values.forEach((value) => params.append(key, value));
};

export const fetchEventsApi = async ({
  q,
  filters,
  page,
}: EventQueryParams): Promise<EventPage> => {
  const params = new URLSearchParams();

  if (q.trim()) {
    params.set("q", q.trim());
  }

  appendList(params, "types", filters.types);
  appendList(params, "formats", filters.formats);
  appendList(params, "cities", filters.cities);
  appendList(params, "statuses", filters.statuses);
  appendList(params, "tags", filters.tags);

  params.set("page", String(page));
  params.set("size", String(EVENTS_PAGE_SIZE));

  const response = await apiClient.get(`/events?${params.toString()}`);
  return eventPageSchema.parse(response.data);
};

export const fetchEventFilterOptionsApi =
  async (): Promise<EventFilterOptions> => {
    const response = await apiClient.get("/events/filters");
    return eventFilterOptionsSchema.parse(response.data);
  };

export const fetchEventByIdApi = async (
  id: number | string,
): Promise<Event> => {
  const response = await apiClient.get(`/events/${id}`);
  return eventSchema.parse(response.data);
};

export const useEvents = (params: EventQueryParams) =>
  useQuery({
    queryKey: ["events", params],
    queryFn: () => fetchEventsApi(params),
    placeholderData: keepPreviousData,
  });

export const useEvent = (id: number | string) =>
  useQuery({
    queryKey: ["event", String(id)],
    queryFn: () => fetchEventByIdApi(id),
    enabled: Boolean(id),
  });

export const useEventFilterOptions = () =>
  useQuery({
    queryKey: ["events", "filters"],
    queryFn: fetchEventFilterOptionsApi,
  });
