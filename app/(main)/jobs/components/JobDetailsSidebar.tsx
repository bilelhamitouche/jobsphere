"use client";
import {
  createJobListingApplicationAction,
  createSavedJobListing,
  deleteJobListingApplicationAction,
  deleteSavedJobListing,
} from "@/actions/jobs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { companyIndustry } from "@/lib/zod";
import { Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

interface JobDetailsSidebarProps {
  id: string;
  userId: string;
  hasApplied: boolean;
  wasSaved: boolean;
  companyId: string;
  companyName: string | null;
  companyLogo: string | null;
  companyIndustry: z.infer<typeof companyIndustry>;
}

export default function JobDetailsSidebar({
  id,
  userId,
  hasApplied,
  wasSaved,
  companyId,
  companyName,
  companyLogo,
  companyIndustry,
}: JobDetailsSidebarProps) {
  const [isApplied, setIsApplied] = useState<boolean>(hasApplied);
  const [isSaved, setIsSaved] = useState<boolean>(wasSaved);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  return (
    <Card className="sticky">
      <CardHeader className="space-y-2">
        <Button
          size="lg"
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            try {
              if (isApplied) {
                const result = await deleteJobListingApplicationAction(
                  userId,
                  id,
                );
                setIsApplied(false);
                if (result?.message) toast.error(result?.message as string);
              } else {
                const result = await createJobListingApplicationAction(
                  userId,
                  id,
                );
                setIsApplied(true);
                if (result?.message) toast.error(result?.message as string);
              }
            } catch (err) {
              toast.error("Something wrong happened");
            } finally {
              setIsLoading(false);
            }
          }}
        >
          {isApplied ? "Already Applied" : "Apply To Job"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          disabled={isSaveLoading}
          onClick={async () => {
            setIsSaveLoading(true);
            try {
              if (isSaved) {
                const result = await deleteSavedJobListing(userId, id);
                setIsSaved(false);
                if (result?.message) toast.error(result?.message as string);
              } else {
                const result = await createSavedJobListing(userId, id);
                setIsSaved(true);
                if (result?.message) toast.error(result?.message as string);
              }
            } catch (err) {
              toast.error("Something wrong happened");
            } finally {
              setIsSaveLoading(false);
            }
          }}
        >
          {isSaved ? "Already Saved" : "Save Job"}
        </Button>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4">
        <div>
          <h4 className="flex gap-2 items-center">
            <Building2 size="20" />
            <span className="font-semibold">About the Company</span>
          </h4>
        </div>
        <div className="flex gap-4 items-center">
          {companyLogo ? (
            <Image src={companyLogo} alt={`${companyName} image`} />
          ) : (
            <div className="flex justify-center items-center text-3xl font-bold bg-primary-foreground size-20">
              {companyName?.toUpperCase()[0]}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <span className="font-bold">{companyName}</span>
            <span className="text-sm">{companyIndustry}</span>
          </div>
        </div>
        <Button variant="link">
          <Link href={`/companies/${companyId}`}>View company details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
