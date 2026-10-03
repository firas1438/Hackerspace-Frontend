import { z } from "zod";

export const eventTypeSchema = z.enum([
  "HACKATHON",
  "COMPETITION",
  "WORKSHOP",
  "BOOTCAMP",
  "CONFERENCE",
]);

export const eventFormatSchema = z.enum(["IN_PERSON", "ONLINE", "HYBRID"]);

export const eventStatusSchema = z.enum(["UPCOMING", "ONGOING", "PAST"]);

export const eventSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  summary: z.string().default(""),
  description: z.string().min(1),
  type: eventTypeSchema,
  format: eventFormatSchema,
  status: eventStatusSchema,
  location: z.string().min(1),
  city: z.string().min(1),
  startDate: z.string(),
  endDate: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  registrationUrl: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  createdById: z.number().nullable().optional(),
  organizerName: z.string().nullable().optional(),
  organizerEmail: z.string().nullable().optional(),
  organizerLogoUrl: z.string().nullable().optional(),
  organizerWebsite: z.string().nullable().optional(),
  organizerBio: z.string().nullable().optional(),
});

export const eventPageSchema = z.object({
  content: z.array(eventSchema),
  page: z.number(),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});

export const eventFilterOptionsSchema = z.object({
  cities: z.array(z.string()),
  tags: z.array(z.string()),
});

export const eventFiltersSchema = z.object({
  types: z.array(eventTypeSchema),
  formats: z.array(eventFormatSchema),
  cities: z.array(z.string()),
  statuses: z.array(eventStatusSchema),
  tags: z.array(z.string()),
});

export type Event = z.infer<typeof eventSchema>;
export type EventPage = z.infer<typeof eventPageSchema>;
export type EventFilterOptions = z.infer<typeof eventFilterOptionsSchema>;
export type EventType = z.infer<typeof eventTypeSchema>;
export type EventFormat = z.infer<typeof eventFormatSchema>;
export type EventStatus = z.infer<typeof eventStatusSchema>;
export type EventFilters = z.infer<typeof eventFiltersSchema>;

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  HACKATHON: "Hackathon",
  COMPETITION: "Competition",
  WORKSHOP: "Workshop",
  BOOTCAMP: "Bootcamp",
  CONFERENCE: "Conference",
};

export const EVENT_FORMAT_LABELS: Record<EventFormat, string> = {
  IN_PERSON: "In person",
  ONLINE: "Online",
  HYBRID: "Hybrid",
};

export const EVENT_STATUS_LABELS: Record<EventStatus, string> = {
  UPCOMING: "Upcoming",
  ONGOING: "Ongoing",
  PAST: "Past",
};

export const defaultEventFilters: EventFilters = {
  types: [],
  formats: [],
  cities: [],
  statuses: [],
  tags: [],
};

export const EVENTS_PAGE_SIZE = 9;

export const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(150, "Summary must be 150 characters or less"),
  description: z.string().min(1, "Description is required").max(5000),
  type: eventTypeSchema,
  format: eventFormatSchema,
  location: z.string().min(1, "Location is required").max(200),
  city: z.string().min(1, "Select a city"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  imageUrl: z
    .string()
    .optional()
    .refine((value) => !value || value.startsWith("http") || value.startsWith("/"), {
      message: "Enter a valid image URL",
    }),
  registrationUrl: z
    .string()
    .optional()
    .refine((value) => !value || value.startsWith("http://") || value.startsWith("https://"), {
      message: "Registration link must start with http:// or https://",
    }),
  tags: z.string().optional(),
});

export type EventFormData = z.infer<typeof eventFormSchema>;
