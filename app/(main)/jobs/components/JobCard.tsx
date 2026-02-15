"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
    <Card className="w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 hover:border-primary/20 group">
      <CardHeader className="flex flex-row gap-4 items-start pb-2">
        {companyLogo ? (
          <Avatar className="size-14 border-2 border-muted">
            <AvatarImage
              src={companyLogo}
              alt="${company} logo"
              width="56"
              height="56"
              className="object-cover"
            />
          </Avatar>
        ) : (
          <div className="flex justify-center items-center text-lg font-bold size-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white">
            {company.toUpperCase()[0]}
          </div>
        )}
        <div className="flex flex-col gap-1 flex-1">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
            {position}
          </h3>
          <Link
            href={`/companies/${companyId}`}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {company}
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 items-center text-sm pb-2">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin size={14} />
          <span className="capitalize">
            {type.toLowerCase() === "remote" ? "Remote" : location}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Star size={14} />
          <span className="capitalize">
            {experienceLevel !== "none"
              ? experienceLevel + " Level"
              : "No experience"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={14} />
          <span>
            {formatDistance(postedAt, new Date(), { addSuffix: true })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <Badge className="font-medium capitalize" variant="secondary">
          {type} {type === "part" || type === "full" ? "time" : ""}
        </Badge>
        <Button variant="outline" size="sm" asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          <Link href={`/jobs/${id}`}>View Job</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
