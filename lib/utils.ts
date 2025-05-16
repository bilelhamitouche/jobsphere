import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCompanyInfo() {
  const response = await fetch("/api/recruiter/company");
  const companyInfo = await response.json();
  return companyInfo;
}
