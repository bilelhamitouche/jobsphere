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

export const jobType = z.enum(["full", "part", "internship", "remote"]);

export const jobExperienceLevel = z.enum(["none", "entry", "mid", "senior"]);

export const jobListingSchema = z.object({
  description: z.string().trim().min(1, { message: "Description is required" }),
  position: z.string().trim().min(1, { message: "Position is required" }),
  type: jobType,
  experience_level: jobExperienceLevel,
  location: z.string().trim(),
});

export const updateJobListingSchema = z.object({
  description: z
    .string()
    .trim()
    .max(400, { message: "Must be at most 400 characters long" })
    .optional(),
  position: z.string().trim().optional(),
  type: jobType.optional(),
  experience_level: jobExperienceLevel.optional(),
  location: z.string().trim().optional(),
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

export const companySize = z.enum(["small", "mid", "large"]);

export const companyInfoSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z
    .string()
    .trim()
    .email({ message: "Must be a valid email adddress" })
    .min(1, { message: "Email is required" }),
  about: z.string().trim().min(1, { message: "About is required" }),
  size: companySize,
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

export const updateCompanyInfoSchema = z.object({
  name: z.string().trim().optional(),
  email: z
    .union([
      z.literal(""),
      z.string().trim().email({ message: "Must be a valid email adddress" }),
    ])
    .optional(),
  about: z.string().trim().optional(),
  size: companySize.optional(),
  foundation_year: z.string().trim(),
  headquarters: z.string().trim().optional(),
  website: z.string().trim().optional(),
  industry: companyIndustry.optional(),
  logo_url: z.string().trim().optional(),
});
