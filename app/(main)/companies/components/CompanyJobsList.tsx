import { getJobListingsByCompanyId } from "@/lib/queries";
import JobCard from "../../jobs/components/JobCard";

export default async function CompanyJobsList({
  companyId,
}: {
  companyId: string;
}) {
  const jobs = await getJobListingsByCompanyId(companyId);
  if (!jobs || jobs.length === 0)
    return (
      <div className="py-16 w-full h-full text-center">
        <div className="text-lg text-gray-700">No Jobs Posted</div>
      </div>
    );
  return (
    <ul className="flex flex-col gap-4 w-full">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          position={job.position}
          location={job.location as string}
          type={job.type}
          experienceLevel={job.experienceLevel}
          postedAt={job.postedAt}
          company={job.company as string}
          companyId={companyId}
          companyImageUrl={job.companyLogo}
        />
      ))}
    </ul>
  );
}
