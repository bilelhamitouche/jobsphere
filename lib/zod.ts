import { warn } from "console";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email({ message: "Must be a valid Email Address" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Must be at least 8 characters" })
    .max(20, { message: "Must be at most 20 characters" }),
});

export const signUpSchema = z.object({
  name: z.string().trim(),
  email: z.string().trim().email({ message: "Must be a valid Email Address" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Must be at least 8 characters" })
    .max(20, { message: "Must be at most 20 characters" }),
});

export const jobListingSchema = z.object({
  description: z
    .string()
    .trim()
    .max(400, { message: "Must be at most 400 characters long" }),
  position: z.string().trim().min(1, { message: "Position is required" }),
  type: z.enum(["full", "part", "internship", "remote"]),
  experience_level: z.enum(["none", "entry", "mid", "senior"]),
  location: z.string().trim(),
  industry: z.string().trim(),
});

export const companyInfoSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  about: z.string().trim(),
  email: z
    .string()
    .trim()
    .email({ message: "Must be a valid email adddress" })
    .min(1, { message: "Email is required" }),
  foundation_year: z
    .number()
    .min(1000, { message: "Must be founded at least in 1000" })
    .max(new Date().getFullYear(), {
      message: "Cannot be founded in the future",
    }),
  headquarters: z.string().trim(),
  website: z.string().trim(),
  industry: z.string().trim(),
  logo_url: z.string().trim()
});
