import { TotalJobsCard } from "./TotalJobsCard";
import { TotalApplicationsCard } from "./TotalApplicationsCard";

export default function Analytics() {
  return (
    <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-2">
      <TotalJobsCard />
      <TotalApplicationsCard />
    </div>
  );
}
