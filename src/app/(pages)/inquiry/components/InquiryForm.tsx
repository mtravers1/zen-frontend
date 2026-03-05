"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import { inquirySchema, type InquiryInput } from "@/lib/lead-schemas";

const SERVICE_TYPES = [
  "Personal Finance",
  "Business Finance",
  "Tax Preparation",
  "Financial Planning",
  "Other",
];

const BUDGET_RANGES = ["Under $1k", "$1k–$5k", "$5k–$10k", "$10k+"];

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { type: "inquiry" },
  });

  const onSubmit = async (data: InquiryInput) => {
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

  if (status === "success") {
    return (
      <Alert severity="success" className="w-full max-w-[600px] mx-auto mt-[4vw]">
        Thank you for your inquiry! A member of our team will be in touch within 1–2 business days.
      </Alert>
    );
  }

  return (
    <div className="w-full max-w-[600px] mx-auto">
      {status === "error" && (
        <Alert severity="error" className="mb-[2vw]">
          {errorMsg}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[1.5vw]">
        <input type="hidden" {...register("type")} value="inquiry" />

        {/* First + Last name row */}
        <div className="flex gap-[1.5vw]">
          <TextField
            label="First Name"
            fullWidth
            size="small"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Last Name"
            fullWidth
            size="small"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </div>

        {/* Email + Phone row */}
        <div className="flex gap-[1.5vw]">
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
            label="Phone (optional)"
            fullWidth
            size="small"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </div>

        <TextField
          label="Company"
          fullWidth
          size="small"
          {...register("company")}
          error={!!errors.company}
          helperText={errors.company?.message}
        />

        <TextField
          select
          label="Service Type"
          fullWidth
          size="small"
          defaultValue=""
          inputProps={register("serviceType")}
          error={!!errors.serviceType}
          helperText={errors.serviceType?.message}
        >
          <MenuItem value="" disabled>Select a service</MenuItem>
          {SERVICE_TYPES.map((s) => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Budget Range (optional)"
          fullWidth
          size="small"
          defaultValue=""
          inputProps={register("budget")}
          error={!!errors.budget}
          helperText={errors.budget?.message}
        >
          <MenuItem value="">Prefer not to say</MenuItem>
          {BUDGET_RANGES.map((b) => (
            <MenuItem key={b} value={b}>{b}</MenuItem>
          ))}
        </TextField>

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
          {status === "loading" ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Submit Inquiry"
          )}
        </Button>
      </form>
    </div>
  );
}
