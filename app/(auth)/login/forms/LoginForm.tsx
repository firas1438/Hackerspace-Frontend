"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginSchema, LoginFormData } from "@/lib/schemas/authSchemas";
import { useLogin } from "../api/useLogin";

export const LoginForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin(setServerError);

  const onSubmit = (data: LoginFormData) => {
    setServerError(null);
    loginMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative z-10 flex flex-col gap-6 rounded-xs border border-border bg-muted p-8 sm:p-11"
    >
      <div>
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl text-foreground">
          Sign In
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your details to access your account.
        </p>
      </div>

      {serverError && (
        <div className="p-3.5 bg-destructive/10 border border-destructive/30 rounded-md flex items-center gap-3 text-destructive text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <label className="flex flex-col gap-2 text-sm font-medium">
        Email Address
        <input
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className={`h-12 rounded-md border ${errors.email ? "border-destructive" : "border-border"
            } bg-background px-4 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20`}
        />
        {errors.email && (
          <span className="text-xs text-destructive">{errors.email.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium">
        Password
        <input
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className={`h-12 rounded-md border ${errors.password ? "border-destructive" : "border-border"
            } bg-background px-4 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20`}
        />
        {errors.password && (
          <span className="text-xs text-destructive">
            {errors.password.message}
          </span>
        )}
      </label>

      <Button
        type="submit"
        disabled={loginMutation.isPending}
        size="lg"
        className="group mt-2 w-full h-12 text-sm font-semibold transition-all active:scale-95 cursor-pointer"
      >
        {loginMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>

      <div className="mt-2 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-foreground hover:text-primary underline underline-offset-4 transition-colors"
        >
          Create account
        </Link>
      </div>
    </form>
  );
};
