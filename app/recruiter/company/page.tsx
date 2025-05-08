import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit } from "lucide-react";
import Link from "next/link";

export default function RecruiterCompany() {
  return (
    <div className="p-4 space-y-4 w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Company</h2>
        <Button asChild>
          <Link href="/recruiter/company/edit">
            <Edit />
            <span>Edit Company Info</span>
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Company Info</CardTitle>
          <CardDescription>
            This is all the information about your company
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
