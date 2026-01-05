"use client";

import { useSearchParams } from "next/navigation";
import JobCard from "./JobCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { JOB_LIMIT } from "@/lib/constants";
import { jobExperienceLevel, jobType } from "@/lib/zod";
import { z } from "zod";
import JobListSkeleton from "./JobListSkeleton";

interface JobResponse {
  jobs: Job[];
  hasMore: boolean;
}

interface Job {
  id: string;
  position: string;
  string: string | null;
  companyLogoUrl: string;
  company: string;
  companyId: string;
  experienceLevel: z.infer<typeof jobExperienceLevel>;
  location: string | null;
  type: z.infer<typeof jobType>;
  postedAt: Date;
}

export default function JobsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const experience = searchParams.get("experience");
  const type = searchParams.get("type");
  const page = Number(searchParams.get("page")) || 0;
  async function getJobs(
    search: string = "",
    experience: string | null,
    type: string | null,
    page: number = 0,
  ) {
    const res = await fetch(
      `/api/jobs?search=${search}&experience=${experience}&type=${type}&page=${page}&limit=${JOB_LIMIT}`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }
    const data = (await res.json()) as JobResponse;
    return data;
  }
  const { data, isPending } = useQuery({
    queryKey: ["jobs", search, page, type, experience],
    queryFn: () => getJobs(search ?? "", experience, type, page),
    placeholderData: keepPreviousData,
  });
  const jobs = data?.jobs ?? [];
  if (!isPending && jobs.length === 0) {
    return (
      <div className="py-16 text-lg font-medium text-center text-gray-700">
        No jobs found
      </div>
    );
  }
  if (isPending) {
    return <JobListSkeleton />;
  }
  return (
    <ul className="flex flex-col col-start-1 col-end-3 row-start-3 row-end-4 gap-4 w-full md:col-start-2 md:row-start-2 md:row-end-3">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          position={job.position}
          location={job.location}
          type={job.type}
          experienceLevel={job.experienceLevel}
          postedAt={job.postedAt}
          company={job.company}
          companyId={job.companyId}
          companyLogo={job.companyLogoUrl}
        />
      ))}
    </ul>
  );
}
