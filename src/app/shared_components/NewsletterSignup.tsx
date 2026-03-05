"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, TextField } from "@mui/material";
import { newsletterSchema, type NewsletterInput } from "@/lib/lead-schemas";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { type: "newsletter" },
  });

  const onSubmit = async (data: NewsletterInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-gray-300">
        <IoCheckmarkCircleOutline size={20} />
        <span className="text-sm">You&apos;re subscribed!</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-gray-400 text-sm mb-1">Stay in the loop</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-start">
        <input type="hidden" {...register("type")} value="newsletter" />
        <div className="flex flex-col">
          <TextField
            placeholder="your@email.com"
            size="small"
            type="email"
            {...register("email")}
            error={!!errors.email || status === "error"}
            helperText={errors.email?.message ?? (status === "error" ? "Try again." : undefined)}
            sx={{
              "& .MuiInputBase-root": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "20px" },
              "& .MuiInputBase-input": { color: "#e5e7eb", fontSize: "0.85rem" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
              "& .MuiFormHelperText-root": { color: "#f87171" },
            }}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          size="small"
          disabled={status === "loading"}
          className="!bg-[#E0E721] !text-[#1f6d4f] !rounded-full !capitalize !font-semibold !h-[40px]"
        >
          {status === "loading" ? <CircularProgress size={16} color="inherit" /> : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}
