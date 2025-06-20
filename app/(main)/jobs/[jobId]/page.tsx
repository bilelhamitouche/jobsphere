import { Suspense } from "react";
import JobDetailsCard from "../components/JobDetailsCard";
import { Loader2 } from "lucide-react";

export default async function JobListing({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  return (
    <div className="grid grid-cols-1 p-8 w-full h-full bg-primary-foreground md:grid-cols-[1fr_auto]">
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full h-full">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <JobDetailsCard jobId={jobId} />
      </Suspense>
    </div>
  );
}
