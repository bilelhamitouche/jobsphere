import JobDetailsCard from "../components/JobDetailsCard";
import { getJobListingById, hasApplied } from "@/lib/queries";
import { notFound } from "next/navigation";
import { companyIndustry, jobType } from "@/lib/zod";
import JobDetailsSidebar from "../components/JobDetailsSidebar";
import { z } from "zod";
import { getUserInfo } from "@/actions/auth";

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
  return (
    <div className="grid grid-cols-1 gap-8 p-8 w-full h-full bg-primary-foreground md:grid-cols-[1fr_0.5fr]">
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
        companyId={jobListing.companyId as string}
        companyName={jobListing.company}
        companyLogo={jobListing.companyLogo}
        companyIndustry={
          jobListing.companyIndustry as z.infer<typeof companyIndustry>
        }
      />
    </div>
  );
}
