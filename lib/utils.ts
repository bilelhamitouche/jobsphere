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

export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1,
) {
  if (totalPages <= siblingCount * 2 + 5) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  // Case 2: no left ellipsis, but right ellipsis
  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, "…", totalPages];
  }

  // Case 3: left ellipsis, but no right ellipsis
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);

    return [1, "…", ...rightRange];
  }

  // Case 4: both ellipses
  const middleRange = range(leftSiblingIndex, rightSiblingIndex);

  return [1, "…", ...middleRange, "…", totalPages];
}
