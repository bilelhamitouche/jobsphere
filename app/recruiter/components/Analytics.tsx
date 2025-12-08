import { TotalJobsCard } from "./TotalJobsCard";
import { TotalApplicationsCard } from "./TotalApplicationsCard";
import { Suspense } from "react";
import AnalyticsCardSkeleton from "./AnalyticsCardSkeleton";

export default async function Analytics() {
  return (
    <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-2">
      <Suspense fallback={<AnalyticsCardSkeleton />}>
        <TotalJobsCard />
      </Suspense>
      <Suspense fallback={<AnalyticsCardSkeleton />}>
        <TotalApplicationsCard />
      </Suspense>
    </div>
  );
}
