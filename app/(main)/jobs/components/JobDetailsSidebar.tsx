"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { companyIndustry } from "@/lib/zod";
import { Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

interface JobDetailsSidebarProps {
  companyId: string;
  companyName: string | null;
  companyLogo: string | null;
  companyIndustry: z.infer<typeof companyIndustry>;
}

export default function JobDetailsSidebar({
  companyId,
  companyName,
  companyLogo,
  companyIndustry,
}: JobDetailsSidebarProps) {
  return (
    <Card className="sticky">
      <CardHeader className="space-y-2">
        <Button size="lg">Apply To Job</Button>
        <Button variant="outline" size="lg">
          Save Job
        </Button>
      </CardHeader>
      <Separator className="px-2" />
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
