"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import {
  EVENTS_PAGE_SIZE,
  eventPageSchema,
  type EventPage,
} from "@/lib/schemas/eventSchemas";

export const fetchMyEventsApi = async (page: number): Promise<EventPage> => {
  const params = new URLSearchParams({
    page: String(page),
    size: String(EVENTS_PAGE_SIZE),
  });
  const response = await apiClient.get(`/events/mine?${params.toString()}`);
  return eventPageSchema.parse(response.data);
};

export const useMyEvents = (page: number) =>
  useQuery({
    queryKey: ["events", "mine", page],
    queryFn: () => fetchMyEventsApi(page),
    placeholderData: keepPreviousData,
  });
