"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { z } from "zod";

const citiesSchema = z.array(z.string());

const fetchCities = async (): Promise<string[]> => {
  const response = await apiClient.get("/cities");
  return citiesSchema.parse(response.data);
};

export const useCities = () =>
  useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
    staleTime: 1000 * 60 * 60,
  });
