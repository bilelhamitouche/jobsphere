import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import CompanyDetails from "../components/CompanyDetails";
import { Suspense } from "react";
import CompanyDetailsSkeleton from "../components/CompanyDetailsSkeleton";

export default function RecruiterCompany() {
  return (
    <div className="p-6 space-y-4 w-full h-full">
      <div className="flex flex-col gap-2 justify-between items-start md:flex-row md:items-center">
        <h2 className="text-2xl font-semibold md:text-3xl">Company</h2>
        <Button asChild>
          <Link href="/recruiter/company/edit">
            <Edit />
            <span>Edit Company Information</span>
          </Link>
        </Button>
      </div>
      <Suspense fallback={<CompanyDetailsSkeleton />}>
        <CompanyDetails />
      </Suspense>
    </div>
  );
}
