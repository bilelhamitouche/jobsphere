import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCompanyById } from "@/lib/queries";
import { Calendar, LinkIcon, MapPin, Users } from "lucide-react";
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
      <CardHeader className="flex flex-col gap-4 md:flex-row md:gap-0 md:justify-between">
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
              <div className="flex justify-center items-center text-3xl font-bold size-20 text-primary-foreground bg-primary">
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
          <div className="flex flex-col gap-4 items-start text-sm sm:flex-row sm:items-center sm:space-y-0 md:gap-20 md:text-base">
            <div className="flex gap-2 items-center text-gray-600">
              <MapPin className="w-5 text-gray-500 md:w-6" />
              <span>{company.company.headquarters}</span>
            </div>
            <div className="flex gap-2 items-center text-gray-600">
              <Calendar className="w-5 text-gray-500 md:w-6" />
              <span>Founded {company.company.foundationYear}</span>
            </div>
            <div className="flex gap-2 items-center text-gray-600">
              <Users className="w-5 text-gray-500 md:w-6" />
              <span>
                Size{" "}
                {company.company.size === "small"
                  ? "1-99"
                  : company.company.size === "mid"
                    ? "100-999"
                    : "More than 1000"}{" "}
                employees
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-between items-center w-full sm:flex-row md:flex-col md:justify-start md:w-fit">
          <Button variant="outline" className="w-full sm:w-fit" asChild>
            <Link
              target="_blank"
              href={
                company.company.website
                  ? company.company.website.includes("http://") ||
                    company.company.website.includes("https://")
                    ? company.company.website
                    : `https://${company.company.website}`
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
      <CardContent className="space-y-2">
        <h2 className="text-xl font-semibold">About {company.company.name}</h2>
        <p className="leading-7 text-gray-700">{company.company.about}</p>
      </CardContent>
    </Card>
  );
}
