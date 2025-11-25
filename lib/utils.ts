import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCompanyInfo() {
  const response = await fetch("/api/recruiter/company", { method: "GET" });
  const companyInfo = await response.json();
  return companyInfo;
}

import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { jobType } from "./zod";
import { z } from "zod";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export function formatJobType(type: z.infer<typeof jobType>) {
  return type === "full" || type === "part"
    ? `${type[0].toUpperCase() + type.slice(1)}-Time`
    : type;
}
