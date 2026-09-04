import React from "react";
import { RegisterForm } from "../forms/RegisterForm";

export const RegisterCard = () => {
  return (
    <div className="relative w-full max-w-lg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-7 z-0 size-32 text-primary/70 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-size-[0.75rem_0.75rem] sm:-right-8 sm:-top-10 sm:size-40"
      />
      <RegisterForm />
    </div>
  );
};
