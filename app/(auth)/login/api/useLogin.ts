"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";
import { LoginFormData } from "@/lib/schemas/authSchemas";

export const loginUserApi = async (data: LoginFormData): Promise<string> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const useLogin = (onServerError?: (msg: string) => void) => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (data: LoginFormData) => loginUserApi(data),
    onSuccess: () => {
      login();
      router.push("/");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Invalid email or password. Please try again.";
      if (onServerError) {
        onServerError(typeof message === "string" ? message : "Login failed");
      }
    },
  });
};
