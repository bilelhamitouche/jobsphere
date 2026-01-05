import { JOB_LIMIT } from "@/lib/constants";
import JobSkeleton from "./JobSkeleton";

export default function JobListSkeleton() {
  return (
    <ul className="flex flex-col gap-4 w-full">
      {Array.from({ length: JOB_LIMIT }, (_) => null).map((_, index) => (
        <JobSkeleton key={index} />
      ))}
    </ul>
  );
}
