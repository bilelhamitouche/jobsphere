import { getCompanyById } from "@/lib/queries";
import { notFound } from "next/navigation";

export default async function Company({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const companyDetails = await getCompanyById(companyId);
  if (!companyDetails || companyDetails.length === 0) notFound();
  return <div className="p-6 w-full h-full bg-primary-foreground"></div>;
}
