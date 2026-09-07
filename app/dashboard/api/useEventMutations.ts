"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { eventSchema, type Event, type EventFormData } from "@/lib/schemas/eventSchemas";

export function toEventPayload(data: EventFormData) {
  const tags = (data.tags ?? "")
    .split(",")
    .map((tag) => tag.trim().replace(/^#/, ""))
    .filter(Boolean);

  return {
    title: data.title.trim(),
    summary: data.summary.trim(),
    description: data.description.trim(),
    type: data.type,
    format: data.format,
    location: data.location.trim(),
    city: data.city.trim(),
    startDate: new Date(data.startDate).toISOString(),
    endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
    imageUrl: data.imageUrl?.trim() || null,
    registrationUrl: data.registrationUrl?.trim() || null,
    tags,
  };
}

const mutationErrorMessage = (error: unknown, fallback: string) => {
  const axiosError = error as { response?: { data?: { message?: string } } };
  return axiosError.response?.data?.message || fallback;
};

export const useCreateEvent = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EventFormData): Promise<Event> => {
      const response = await apiClient.post("/events", toEventPayload(data));
      return eventSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event created");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(mutationErrorMessage(error, "Could not create event"));
    },
  });
};

export const useUpdateEvent = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: EventFormData;
    }): Promise<Event> => {
      const response = await apiClient.put(`/events/${id}`, toEventPayload(data));
      return eventSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event updated");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(mutationErrorMessage(error, "Could not update event"));
    },
  });
};

export const useDeleteEvent = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(mutationErrorMessage(error, "Could not delete event"));
    },
  });
};
