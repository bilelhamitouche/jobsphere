"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Job = {
  id: string;
  description: string | null;
  position: string;
  type: "full" | "part" | "internship" | "remote";
  location: string | null;
  experienceLevel: "none" | "entry" | "mid" | "senior";
};

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "experienceLevel",
    header: "Experience Level",
  },
];
