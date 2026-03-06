import { z } from "zod";

// ─── New Client (Account) Schema ───────────────────────────────────────────────
export const newClientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.enum(["Business", "Individual"], { required_error: "Please select a type" }),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .regex(/^[\d\s\-().+]+$/, "Please enter a valid phone number"),
  assignee: z.string().min(1, "Please select an account manager"),
  status: z.enum(["active", "inactive"]).default("active"),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export type NewClientFormValues = z.infer<typeof newClientSchema>;

// ─── New Contact Schema ─────────────────────────────────────────────────────────
export const newContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  account: z.string().min(1, "Please select an account"),
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .regex(/^[\d\s\-().+]+$/, "Please enter a valid phone number"),
  isPrimary: z.boolean().default(false),
  notes: z.string().optional(),
});

export type NewContactFormValues = z.infer<typeof newContactSchema>;

// ─── New Document Schema ────────────────────────────────────────────────────────
export const newDocumentSchema = z.object({
  name: z.string().min(1, "Document name is required"),
  type: z.enum(
    ["Tax Return", "Financial Statement", "Contract", "Invoice", "Report", "Organizer", "Other"],
    { required_error: "Please select a document type" }
  ),
  client: z.string().min(1, "Please select a client"),
  folder: z.string().default("General"),
  description: z.string().optional(),
  tags: z.string().optional(),
  // In a real app this would be z.instanceof(File), but we keep it simple for mock
  fileName: z.string().optional(),
});

export type NewDocumentFormValues = z.infer<typeof newDocumentSchema>;

// ─── New Task Schema ────────────────────────────────────────────────────────────
export const newTaskSchema = z.object({
  name: z.string().min(2, "Task name must be at least 2 characters"),
  account: z.string().min(1, "Please select an account"),
  assignee: z.string().min(1, "Please assign to a team member"),
  priority: z.enum(["high", "medium", "low"], { required_error: "Please select a priority" }),
  dueDate: z.string().min(1, "Due date is required"),
  description: z.string().optional(),
  status: z.enum(["open", "in_progress", "completed"]).default("open"),
});

export type NewTaskFormValues = z.infer<typeof newTaskSchema>;

// ─── Filter Schemas ─────────────────────────────────────────────────────────────
export const clientFilterSchema = z.object({
  type: z.string().optional(),
  assignee: z.string().optional(),
  status: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export type ClientFilterValues = z.infer<typeof clientFilterSchema>;

export const documentFilterSchema = z.object({
  type: z.string().optional(),
  client: z.string().optional(),
  folder: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export type DocumentFilterValues = z.infer<typeof documentFilterSchema>;

export const taskFilterSchema = z.object({
  priority: z.string().optional(),
  assignee: z.string().optional(),
  account: z.string().optional(),
  dueDateFrom: z.string().optional(),
  dueDateTo: z.string().optional(),
});

export type TaskFilterValues = z.infer<typeof taskFilterSchema>;
