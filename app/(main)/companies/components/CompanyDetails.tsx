import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCompanyById } from "@/lib/queries";
import { Calendar, LinkIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CompanyDetails({
  companyId,
}: {
  companyId: string;
}) {
  const companyDetails = await getCompanyById(companyId);
  if (!companyDetails || companyDetails.length === 0) notFound();
  const company = companyDetails[0];
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            {company.company.logoUrl ? (
              <Image
                src={company.company.logoUrl}
                alt={`${company.company.name} image`}
                width="20"
                height="20"
              />
            ) : (
              <div className="flex justify-center items-center text-3xl font-bold size-20 bg-primary-foreground">
                {company.company.name.toUpperCase()[0]}
              </div>
            )}
            <div className="flex flex-col">
              <CardTitle className="text-3xl">{company.company.name}</CardTitle>
              <span className="text-lg font-semibold text-primary">
                {company.company.industry}
              </span>
            </div>
          </div>
          <div className="flex gap-20 items-center">
            <div className="flex gap-2 items-center text-gray-600">
              <MapPin className="text-gray-500" />
              <span>{company.company.headquarters}</span>
            </div>
            <div className="flex gap-2 items-center text-gray-600">
              <Calendar className="text-gray-500" />
              <span>Founded {company.company.foundationYear}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Button variant="outline" asChild>
            <Link
              href={
                company.company.website
                  ? company.company.website
                  : "https://linkedin.com/" + company.company.name
              }
            >
              <LinkIcon />
              Visit website
            </Link>
          </Button>
          <div className="flex flex-col gap-2 items-center">
            <span className="text-2xl font-bold text-primary">
              {company.count}
            </span>
            <span className="text-gray-500">Open Positions</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold">About {company.company.name}</h2>
        <p className="text-gray-700">{company.company.about}</p>
      </CardContent>
    </Card>
  );
}
