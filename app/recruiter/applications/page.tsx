import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RecruiterApplications() {
  return (
    <div className="p-4 space-y-4 w-full h-full">
      <h2 className="text-2xl font-semibold">All Applications</h2>
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
          <CardDescription>All Applications to jobs you posted</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
