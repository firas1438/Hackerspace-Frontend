"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";
import { RegisterFormData } from "@/lib/schemas/authSchemas";
import { loginUserApi } from "../../login/api/useLogin";

export const registerUserApi = async (data: RegisterFormData): Promise<string> => {
  await apiClient.post("/auth/register", {
    email: data.email,
    password: data.password,
  });

  return loginUserApi({
    email: data.email,
    password: data.password,
  });
};

export const useRegister = (onServerError?: (msg: string) => void) => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (data: RegisterFormData) => registerUserApi(data),
    onSuccess: () => {
      login();
      router.push("/");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Registration failed. Please try again.";
      if (onServerError) {
        onServerError(typeof message === "string" ? message : "Registration failed");
      }
    },
  });
};
