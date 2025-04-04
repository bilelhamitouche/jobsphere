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
