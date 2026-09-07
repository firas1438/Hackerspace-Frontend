"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import {
  profileResponseSchema,
  type Profile,
  type ProfileFormData,
} from "@/lib/schemas/profileSchemas";

export const fetchProfileApi = async (): Promise<Profile> => {
  const response = await apiClient.get("/profile");
  return profileResponseSchema.parse(response.data);
};

export const useProfile = (enabled = true) =>
  useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfileApi,
    enabled,
  });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileFormData): Promise<Profile> => {
      const response = await apiClient.put("/profile", {
        organizationName: data.organizationName?.trim() || null,
        bio: data.bio?.trim() || null,
        logoUrl: data.logoUrl?.trim() || null,
        website: data.website?.trim() || null,
      });
      return profileResponseSchema.parse(response.data);
    },
    onSuccess: (profile) => {
      queryClient.setQueryData(["profile"], profile);
      toast.success("Profile saved");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || "Could not save profile");
    },
  });
};
