import { z } from "zod";

export const contactSchema = z.object({
  type: z.literal("contact"),
  firstName: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const inquirySchema = z.object({
  type: z.literal("inquiry"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  company: z.string().min(1, "Company is required"),
  serviceType: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const newsletterSchema = z.object({
  type: z.literal("newsletter"),
  email: z.string().email("Enter a valid email"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
