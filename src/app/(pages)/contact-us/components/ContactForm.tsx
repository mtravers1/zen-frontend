"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import { contactSchema, type ContactInput } from "@/lib/lead-schemas";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: "contact" },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Something went wrong.");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto mt-[4vw] px-[2vw]">
      <h2 className="text-[#1f6d4f] text-[2vw] font-medium mb-[2vw]">Send us a message</h2>

      {status === "success" && (
        <Alert severity="success" className="mb-[2vw]">
          Your message has been sent! We&apos;ll be in touch soon.
        </Alert>
      )}
      {status === "error" && (
        <Alert severity="error" className="mb-[2vw]">
          {errorMsg}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[1.5vw]">
        <input type="hidden" {...register("type")} value="contact" />

        <TextField
          label="Your Name"
          fullWidth
          size="small"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          size="small"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Subject"
          fullWidth
          size="small"
          {...register("subject")}
          error={!!errors.subject}
          helperText={errors.subject?.message}
        />
        <TextField
          label="Message"
          multiline
          rows={4}
          fullWidth
          {...register("message")}
          error={!!errors.message}
          helperText={errors.message?.message}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={status === "loading"}
          className="!bg-[#006847] !text-white !rounded-full !capitalize !py-[0.8vw]"
        >
          {status === "loading" ? <CircularProgress size={20} color="inherit" /> : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
