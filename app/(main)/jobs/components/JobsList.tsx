import JobCard from "./JobCard";
import { getJobListings } from "@/lib/queries";

export default function JobsList() {
export default async function JobsList() {
  const jobs = await getJobListings();
  if (!jobs || jobs.length === 0) return <div>No jobs here</div>;
  return (
    <ul className="flex flex-col col-start-1 col-end-3 row-start-3 row-end-4 gap-4 w-full md:col-start-2 md:row-start-2 md:row-end-3">
      <JobCard
        companyImageUrl={null}
        company="TechNet"
        position="Fullstack Developer"
        type="full"
        experienceLevel="entry"
        location="Remote"
      />
    </ul>
  );
}
