import TotalApplicationsCard from "./TotalApplicationsCard";
import TotalJobsSavedCard from "./TotalJobsSavedCard";

export default function Analytics() {
  return (
    <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-2">
      <TotalApplicationsCard />
      <TotalJobsSavedCard />
    </div>
  );
}
