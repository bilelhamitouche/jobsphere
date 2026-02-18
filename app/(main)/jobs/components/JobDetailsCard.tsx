import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Dot, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { companyIndustry, jobType } from "@/lib/zod";
import { z } from "zod";

interface JobDetailsCardProps {
  position: string;
  description: string;
  location: string | null;
  type: z.infer<typeof jobType>;
  requirements: { requirement: string }[];
  responsibilities: { responsibility: string }[];
  postedAt: Date;
  companyId: string;
  company: string | null;
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
  requirements,
  responsibilities,
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
            <div className="flex justify-center items-center text-3xl font-bold text-primary-foreground bg-primary size-20">
              {company?.toUpperCase()[0]}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold md:text-3xl">{position}</h2>
            <div className="flex items-center font-medium">
              <Link className="text-primary" href={`/companies/${companyId}`}>
                {company}
              </Link>
              <Dot size="28" className="text-gray-700" />
              <span>{industry}</span>
            </div>
          </div>
        </CardTitle>
        <div className="flex gap-8 items-center w-full text-sm md:text-base">
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
      <CardContent className="space-y-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Job Description</h3>
          <p className="text-sm leading-7 text-gray-700 md:text-base">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Job Requirements</h3>
          <ul className="flex flex-col gap-2 pl-4 text-sm md:text-base">
            {requirements.map((requirement, index) => (
              <li key={index} className="list-disc">
                {requirement.requirement}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Job Responbilility</h3>
          <ul className="flex flex-col gap-2 pl-4 text-sm md:text-base">
            {responsibilities.map((responsibility, index) => (
              <li key={index} className="list-disc">
                {responsibility.responsibility}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
