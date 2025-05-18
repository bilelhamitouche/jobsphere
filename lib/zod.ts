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

export const companyIndustry = z.enum([
  "Technology",
  "Marketing",
  "Finance",
  "Healthcare",
  "Transportation",
  "Energy",
  "Telecommunications",
  "Food & Beverage",
  "Manufactoring",
  "Government",
  "Pharmaceuticals",
  "Insurance",
  "E-Commerce",
]);

export const companyInfoSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z
    .string()
    .trim()
    .email({ message: "Must be a valid email adddress" })
    .min(1, { message: "Email is required" }),
  about: z.string().trim().optional(),
  foundation_year: z
    .string()
    .refine((value) => Number(value) > 1000, {
      message: "Must be founded at least at 1000",
    })
    .refine((value) => Number(value) <= new Date().getFullYear(), {
      message: "Cannot be founded in the future",
    }),
  headquarters: z.string().trim().optional(),
  website: z.string().trim().optional(),
  industry: companyIndustry,
  logo_url: z.string().trim().optional(),
});
