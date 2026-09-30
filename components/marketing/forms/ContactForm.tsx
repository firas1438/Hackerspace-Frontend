"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { contactSchema, ContactFormData } from "@/lib/schemas/contactSchema";

export const ContactForm = () => {
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        setServerError(null);

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            const missingEnvMsg = "Email service configuration is missing.";
            setServerError(missingEnvMsg);
            toast.error(missingEnvMsg);
            return;
        }

        try {
            await emailjs.send(
                serviceId,
                templateId,
                {
                    name: data.name,
                    email: data.email,
                    reply_to: data.email,
                    subject: data.subject,
                    message: data.message,
                },
                publicKey
            );

            reset();
            toast.success("Message sent successfully! We'll get back to you soon.");
        } catch (error) {
            console.error("Failed to send contact email:", error);
            const errorMsg =
                error && typeof error === "object" && "text" in error
                    ? String((error as { text: unknown }).text)
                    : "Failed to send message. Please try again.";
            setServerError(errorMsg);
            toast.error("Failed to send message. Please try again.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 flex flex-col gap-5 rounded-xs border border-border bg-muted p-6 sm:p-8"
        >
            {serverError && (
                <div className="p-3.5 bg-destructive/10 border border-destructive/30 rounded-md flex items-center gap-3 text-destructive text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{serverError}</span>
                </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium">
                    Name
                    <input
                        type="text"
                        placeholder="Your name"
                        {...register("name")}
                        className={`h-12 rounded-md border ${errors.name ? "border-destructive" : "border-border"
                            } bg-background px-4 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20`}
                    />
                    {errors.name && (
                        <span className="text-xs text-destructive">
                            {errors.name.message}
                        </span>
                    )}
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                    Email
                    <input
                        type="email"
                        placeholder="you@example.com"
                        {...register("email")}
                        className={`h-12 rounded-md border ${errors.email ? "border-destructive" : "border-border"
                            } bg-background px-4 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20`}
                    />
                    {errors.email && (
                        <span className="text-xs text-destructive">
                            {errors.email.message}
                        </span>
                    )}
                </label>
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium">
                Subject
                <input
                    type="text"
                    placeholder="What can we help with?"
                    {...register("subject")}
                    className={`h-12 rounded-md border ${errors.subject ? "border-destructive" : "border-border"
                        } bg-background px-4 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20`}
                />
                {errors.subject && (
                    <span className="text-xs text-destructive">
                        {errors.subject.message}
                    </span>
                )}
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
                Message
                <textarea
                    placeholder="Tell us a little more..."
                    rows={6}
                    {...register("message")}
                    className={`resize-none rounded-md border ${errors.message ? "border-destructive" : "border-border"
                        } bg-background px-4 py-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20`}
                />
                {errors.message && (
                    <span className="text-xs text-destructive">
                        {errors.message.message}
                    </span>
                )}
            </label>

            <Button type="submit" disabled={isSubmitting} className="mt-2 w-fit">
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Sending...</span>
                    </>
                ) : (
                    "Send message"
                )}
            </Button>
        </form>
    );
};
