import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import CompanyDetails from "../components/CompanyDetails";

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
      <CompanyDetails />
    </div>
  );
}
