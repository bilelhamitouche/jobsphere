import JobCard from "./JobCard";
import { getJobListings } from "@/lib/queries";

export default async function JobsList({
  search,
  type,
  experience,
}: {
  search: string;
  type: string;
  experience: string;
}) {
  const jobs = await getJobListings();
  if (!jobs || jobs.length === 0)
    return (
      <div className="py-16 text-lg font-medium text-center text-gray-700">
        No jobs found
      </div>
    );
  const filteredJobs = jobs.filter((job) => {
    return (
      job.company?.toLowerCase().includes(search.toLowerCase()) &&
      (experience === "" || job.experienceLevel === experience) &&
      (type === "" || job.type === type)
    );
  });
  console.log(jobs, filteredJobs);
  return (
    <ul className="flex flex-col col-start-1 col-end-3 row-start-3 row-end-4 gap-4 w-full md:col-start-2 md:row-start-2 md:row-end-3">
      {filteredJobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          companyImageUrl={job.companyLogo}
          company={job.company as string}
          companyId={job.companyId as string}
          position={job.position}
          type={job.type}
          experienceLevel={job.experienceLevel}
          location={job.location as string}
          postedAt={job.postedAt}
        />
      ))}
    </ul>
  );
}
