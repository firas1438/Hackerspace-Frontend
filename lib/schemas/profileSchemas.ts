import { z } from "zod";

export const profileSchema = z.object({
  email: z.string().email(),
  organizationName: z.string().max(160).optional().or(z.literal("")),
  bio: z.string().max(2000).optional().or(z.literal("")),
  logoUrl: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((value) => !value || value.startsWith("http") || value.startsWith("/"), {
      message: "Enter a valid logo URL",
    }),
  website: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((value) => !value || value.startsWith("http"), {
      message: "Website must start with http:// or https://",
    }),
});

export const profileResponseSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  organizationName: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  logoUrl: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type Profile = z.infer<typeof profileResponseSchema>;
