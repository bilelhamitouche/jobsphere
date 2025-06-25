import JobDetailsCard from "../components/JobDetailsCard";
import { getJobListingById, hasApplied, wasSaved } from "@/lib/queries";
import { notFound } from "next/navigation";
import { companyIndustry, jobType } from "@/lib/zod";
import JobDetailsSidebar from "../components/JobDetailsSidebar";
import { z } from "zod";
import { getUserInfo } from "@/actions/auth";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function JobListing({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const user = await getUserInfo();
  const data = await getJobListingById(jobId);
  if (!data || data.length === 0) notFound();
  const jobListing = data[0];
  const applied = await hasApplied(user?.id as string, jobListing.id);
  const saved = await wasSaved(user?.id as string, jobListing.id);
  return (
    <div className="p-8 space-y-8 w-full h-full bg-primary-foreground">
      <Link href="/jobs" className="flex gap-2 items-center">
        <ArrowLeft className="text-primary" />
        <span className="text-primary">Back to Jobs</span>
      </Link>
      <div className="grid grid-cols-1 gap-8 w-full h-full md:grid-cols-[1fr_0.5fr]">
        <JobDetailsCard
          position={jobListing.position}
          description={jobListing.description}
          location={jobListing.location}
          type={jobListing.type as z.infer<typeof jobType>}
          postedAt={jobListing.postedAt}
          companyId={jobListing.companyId as string}
          company={jobListing.company as any}
          companyLogo={jobListing.companyLogo}
          companyIndustry={jobListing.companyIndustry as any}
        />
        <JobDetailsSidebar
          id={jobListing.id as string}
          userId={user?.id as string}
          hasApplied={applied as boolean}
          wasSaved={saved as boolean}
          companyId={jobListing.companyId as string}
          companyName={jobListing.company}
          companyLogo={jobListing.companyLogo}
          companyIndustry={
            jobListing.companyIndustry as z.infer<typeof companyIndustry>
          }
        />
      </div>
    </div>
  );
}
