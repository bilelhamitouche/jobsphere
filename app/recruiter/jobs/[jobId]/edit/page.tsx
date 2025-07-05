import { getJobListingById } from "@/lib/queries";
import EditJobForm from "./components/EditJobForm";

export default async function EditJob({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const job = await getJobListingById(jobId);
  if (!job) throw new Error("Something wrong happened");
  return (
    <div className="p-6 space-y-4 w-full h-full">
      <h2 className="text-3xl font-bold">Update Job</h2>
      <EditJobForm job={job as any} />
    </div>
  );
}
