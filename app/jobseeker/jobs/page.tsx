import { getUserInfo } from "@/actions/auth";
import { DataTable } from "@/components/ui/data-table";
import { getSavedJobsById } from "@/lib/queries";
import { columns } from "./lib/columns";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "../components/navbar";

export default async function Jobs() {
  const user = await getUserInfo();
  const jobs = await getSavedJobsById(user?.id as string);
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-bold">Jobs Saved</h2>
        <Card>
          <CardContent>
            <DataTable columns={columns} data={jobs as any} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
