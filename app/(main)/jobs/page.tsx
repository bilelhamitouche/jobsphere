import { Suspense } from "react";
import JobsList from "./components/JobsList";
import JobListSkeleton from "./components/JobListSkeleton";
import Controls from "./components/Controls";

export default async function Jobs() {
  return (
    <div className="p-8 space-y-8 h-full bg-primary-foreground">
      <h1 className="text-2xl font-bold">Browse Jobs</h1>
      <div className="grid gap-4 grid-rows-[auto_auto_1fr] grid-cols-[auto_1fr]">
        <Controls />
        <Suspense fallback={<JobListSkeleton />}>
          <JobsList />
        </Suspense>
      </div>
    </div>
  );
}
