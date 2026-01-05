import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { jobExperienceLevel, jobType } from "@/lib/zod";
import { z } from "zod";

interface JobCardProps {
  id: string;
  companyLogo: string | null;
  company: string;
  companyId: string;
  position: string;
  type: z.infer<typeof jobType>;
  experienceLevel: z.infer<typeof jobExperienceLevel>;
  location: string | null;
  postedAt: Date;
}

export default function JobCard({
  id,
  companyLogo,
  company,
  companyId,
  position,
  type,
  experienceLevel,
  location,
  postedAt,
}: JobCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-4 items-start">
        <CardTitle className="flex gap-4 items-center">
          {companyLogo ? (
            <Avatar>
              <AvatarImage
                src={companyLogo}
                alt="${company} url"
                width="18"
                height="18"
              />
            </Avatar>
          ) : (
            <div className="flex justify-center items-center text-xl text-primary-foreground size-18 bg-primary">
              {company.toUpperCase()[0]}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <span className="text-lg font-medium">{position}</span>
            <Link
              href={`/companies/${companyId}`}
              className="text-sm font-semibold text-gray-700"
            >
              {company}
            </Link>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-8 items-center text-sm font-medium text-gray-700">
        <div className="flex gap-2 items-center">
          <MapPin size="15" />
          <span className="capitalize">
            {type.toLowerCase() === "remote" ? "remote" : location}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <Star size="15" />
          <span className="capitalize">
            {experienceLevel !== "none"
              ? experienceLevel + " Level"
              : "No experience"}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <Clock size="15" />
          <span>
            {formatDistance(postedAt, new Date(), { addSuffix: true })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge className="font-medium capitalize" variant="secondary">
          {type} {type === "part" || type === "full" ? "time" : ""}
        </Badge>
        <Button variant="outline" asChild>
          <Link href={`/jobs/${id}`}>View Job</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
