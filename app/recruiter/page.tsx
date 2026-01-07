import { isRecruiterAuthenticated } from "@/actions/auth";
import Analytics from "./components/Analytics";

async function Recruiter() {
  await isRecruiterAuthenticated();
  return (
    <div className="grid w-full h-full grid-rows-[auto_1fr] bg-primary-foreground">
      <div className="p-6 space-y-4 h-full">
        <h2 className="text-2xl font-semibold md:text-3xl">Dashboard</h2>
        <Analytics />
      </div>
    </div>
  );
}

export default Recruiter;
