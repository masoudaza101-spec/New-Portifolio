import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please provide a valid email address.").trim().max(254),
  subject: z.string().trim().min(1, "Please add a subject.").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Your message should be at least 10 characters.")
    .max(5000),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

const optionalUrl = z
  .union([z.url(), z.literal("")])
  .optional()
  .transform((value) => (value ? value : null));

export const projectInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with dashes."),
  title: z.string().trim().min(1, "Title is required.").max(200),
  description: z.string().trim().min(1, "Description is required.").max(500),
  category: z.string().trim().min(1, "Category is required.").max(100),
  year: z.coerce.number().int().min(2000).max(2100),
  role: z.string().trim().min(1, "Role is required.").max(200),
  problem: z.string().trim().min(1, "Problem is required."),
  solution: z.string().trim().min(1, "Solution is required."),
  challenges: z.string().trim().min(1, "Challenges are required."),
  result: z.string().trim().min(1, "Result is required."),
  process: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  image: optionalUrl,
  liveUrl: optionalUrl,
  githubUrl: optionalUrl,
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;

export const skillInputSchema = z.object({
  category: z.string().trim().min(1, "Category is required.").max(100),
  name: z.string().trim().min(1, "Name is required.").max(100),
  icon: z.string().trim().max(100).optional().nullable(),
  order: z.coerce.number().int().optional(),
  visible: z.boolean().optional(),
});

export const experienceInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200),
  organization: z.string().trim().max(200).optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  description: z.string().trim().min(1, "Description is required."),
  current: z.boolean().optional(),
  order: z.coerce.number().int().optional(),
});

export const educationInputSchema = z.object({
  institution: z.string().trim().min(1, "Institution is required.").max(200),
  qualification: z.string().trim().min(1, "Qualification is required.").max(100),
  field: z.string().trim().max(200).optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  order: z.coerce.number().int().optional(),
});

export const socialLinkInputSchema = z.object({
  platform: z.string().trim().min(1, "Platform is required.").max(100),
  url: z.url("A valid URL is required.").trim(),
  icon: z.string().trim().max(100).optional().nullable(),
  visible: z.boolean().optional(),
  order: z.coerce.number().int().optional(),
});

export const contactStatusSchema = z.enum(["NEW", "READ", "REPLIED", "ARCHIVED"]);

export const analyticsEventSchema = z.object({
  event: z.enum([
    "PAGE_VIEW",
    "PROJECT_VIEW",
    "CONTACT_CLICK",
    "GITHUB_CLICK",
    "LINKEDIN_CLICK",
    "LIVE_DEMO_CLICK",
  ]),
  page: z.string().trim().max(500).optional(),
  projectId: z.string().trim().max(200).optional(),
  sessionId: z.string().trim().max(200).optional(),
});

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128);
