import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Dot, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { companyIndustry, jobType } from "@/lib/zod";
import { z } from "zod";

interface JobDetailsCardProps {
  position: string;
  description: string | null;
  location: string | null;
  type: z.infer<typeof jobType>;
  postedAt: Date;
  companyId: string;
  company: string;
  companyLogo: string | null;
  companyIndustry: z.infer<typeof companyIndustry>;
}

function formatJobType(
  type: "full" | "part" | "internship" | "remote",
): string {
  if (type === "full" || type === "part") {
    return type.charAt(0).toUpperCase() + type.slice(1) + "-time";
  } else {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }
}

export default async function JobDetailsCard({
  position,
  description,
  location,
  type,
  postedAt,
  companyId,
  company,
  companyLogo,
  companyIndustry: industry,
}: JobDetailsCardProps) {
  return (
    <Card className="space-y-4">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="flex gap-4 items-center">
          {companyLogo ? (
            <Image
              src={companyLogo as string}
              alt={`${company} image`}
              width="20"
              height="20"
            />
          ) : (
            <div className="flex justify-center items-center text-3xl font-bold bg-primary-foreground size-20">
              {company?.toUpperCase()[0]}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">{position}</h2>
            <div className="flex items-center font-medium">
              <Link className="text-primary" href={`/companies/${companyId}`}>
                {company}
              </Link>
              <Dot size="28" className="text-gray-700" />
              <span>{industry}</span>
            </div>
          </div>
        </CardTitle>
        <div className="flex gap-8 items-center w-full">
          <div className="flex gap-2 items-center text-gray-700">
            <MapPin size="20" />
            <span>{location}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
            <Clock size="20" />
            <span>{formatJobType(type)}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
            <Calendar size="20" />
            <span>
              {formatDistance(postedAt, new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Job Description</h3>
          <p className="text-gray-700">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
