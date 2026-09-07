import type { Event, EventFormData } from "@/lib/schemas/eventSchemas";

export function toDateTimeLocal(iso?: string | null) {
  if (!iso) {
    return "";
  }

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const pad = (value: number) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function eventToFormValues(event: Event): EventFormData {
  return {
    title: event.title,
    summary: event.summary ?? "",
    description: event.description,
    type: event.type,
    format: event.format,
    location: event.location,
    city: event.city,
    startDate: toDateTimeLocal(event.startDate),
    endDate: toDateTimeLocal(event.endDate) || undefined,
    imageUrl: event.imageUrl ?? "",
    registrationUrl: event.registrationUrl ?? "",
    tags: event.tags.join(", "),
  };
}

export const emptyEventFormValues: EventFormData = {
  title: "",
  summary: "",
  description: "",
  type: "HACKATHON",
  format: "IN_PERSON",
  location: "",
  city: "",
  startDate: "",
  endDate: "",
  imageUrl: "",
  registrationUrl: "",
  tags: "",
};
