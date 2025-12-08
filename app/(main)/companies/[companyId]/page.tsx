import { getCompanyById } from "@/lib/queries";
import { notFound } from "next/navigation";
import CompanyDetails from "../components/CompanyDetails";
import CompanyJobsList from "../components/CompanyJobsList";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import CompanyDetailsSkeleton from "../components/CompanyDetailsSkeleton";

export default async function Company({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const companyDetails = await getCompanyById(companyId);
  if (!companyDetails || companyDetails.length === 0) notFound();
  return (
    <div className="p-6 space-y-8 w-full h-full bg-primary-foreground">
      <Link href="/companies" className="flex gap-2 items-center">
        <ArrowLeft className="text-primary" />
        <span className="text-primary">Back to Companies</span>
      </Link>
      <Suspense fallback={<CompanyDetailsSkeleton />}>
        <CompanyDetails companyId={companyId} />
      </Suspense>
      <CompanyJobsList companyId={companyId} />
    </div>
  );
}
