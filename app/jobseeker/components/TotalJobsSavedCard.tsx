import { getUserInfo } from "@/actions/auth";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getSavedJobsCountById } from "@/lib/queries";

export default async function TotalJobsSavedCard() {
  const user = await getUserInfo();
  const jobSavedCount = await getSavedJobsCountById(user?.id as string);
  return (
    <Card>
      <CardContent className="space-y-4 text-center">
        <CardTitle className="text-xl font-bold">Jobs Saved</CardTitle>
        <span className="text-3xl font-bold text-primary">{jobSavedCount}</span>
      </CardContent>
    </Card>
  );
}
