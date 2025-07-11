import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./lib/columns";
import { getUserInfo } from "@/actions/auth";
import { getJobApplicationsByRecruiterId } from "@/lib/queries";

export default async function RecruiterApplications() {
  const user = await getUserInfo();
  const jobApplications = await getJobApplicationsByRecruiterId(
    user?.id as string,
  );
  if (!jobApplications) throw new Error("Something wrong happened");
  return (
    <div className="p-6 space-y-4 w-full h-full">
      <h2 className="text-3xl font-semibold">All Applications</h2>
      <Card>
        <CardContent>
          <DataTable columns={columns} data={jobApplications} />
        </CardContent>
      </Card>
    </div>
  );
}
