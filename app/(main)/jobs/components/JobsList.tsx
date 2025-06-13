import JobCard from "./JobCard";
import { getJobListings } from "@/lib/queries";

export default async function JobsList() {
  const jobs = await getJobListings();
  if (!jobs || jobs.length === 0) return <div>No jobs here</div>;
  return (
    <ul className="flex flex-col col-start-1 col-end-3 row-start-3 row-end-4 gap-4 w-full md:col-start-2 md:row-start-2 md:row-end-3">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          companyImageUrl={job.companyLogo}
          company={job.company as string}
          position={job.position}
          type={job.type}
          experienceLevel={job.experienceLevel}
          location={job.location as string}
        />
      ))}
    </ul>
  );
}
