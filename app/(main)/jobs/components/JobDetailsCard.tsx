import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobListingById } from "@/lib/queries";
import { Calendar, Clock, Dot, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";

interface JobDetailsCardProps {
  jobId: string;
}

export default async function JobDetailsCard({ jobId }: JobDetailsCardProps) {
  const jobListing = await getJobListingById(jobId);
  if (!jobListing || jobListing.length === 0) notFound();
  return (
    <Card className="space-y-4">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="flex gap-4 items-center">
          {jobListing[0].companyLogo ? (
            <Image
              src={jobListing[0].companyLogo as string}
              alt={`${jobListing[0].company} image`}
            />
          ) : (
            <div className="flex justify-center items-center text-3xl font-bold bg-primary-foreground size-25">
              {jobListing[0].company?.toUpperCase()[0]}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">{jobListing[0].position}</h2>
            <div className="flex items-center font-medium">
              <Link
                className="text-primary"
                href={`/companies/${jobListing[0].companyId}`}
              >
                {jobListing[0].company}
              </Link>
              <Dot size="28" className="text-gray-700" />
              <span>{jobListing[0].companyIndustry}</span>
            </div>
          </div>
        </CardTitle>
        <div className="flex gap-8 items-center w-full">
          <div className="flex gap-2 items-center text-gray-700">
            <MapPin size="20" />
            <span>{jobListing[0].location}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
            <Clock size="20" />
            <span className="capitalize">
              {jobListing[0].type === "full" || jobListing[0].type === "part"
                ? jobListing[0].type + "-time"
                : jobListing[0].type}
            </span>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
            <Calendar size="20" />
            <span>
              {formatDistance(jobListing[0].postedAt, new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Job Description</h3>
          <p className="text-gray-700">{jobListing[0].description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
