import { isRecruiterAuthenticated } from "@/actions/auth";

async function Recruiter() {
  await isRecruiterAuthenticated();
  return (
    <div className="grid w-full h-full grid-rows-[auto_1fr] bg-primary-foreground">
      <div className="p-6 space-y-4 h-full">
        <h2 className="text-3xl font-semibold">Dashboard</h2>
      </div>
    </div>
  );
}

export default Recruiter;
