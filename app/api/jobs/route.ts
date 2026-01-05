import { JOB_LIMIT } from "@/lib/constants";
import { getJobListings } from "@/lib/queries";
import { jobCategory, jobExperienceLevel, jobType } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const searchParam = searchParams.get("search");
  const experienceParam = searchParams.get("experience");
  const typeParam = searchParams.get("type");
  const categoryParam = searchParams.get("category");
  const experienceResult = jobExperienceLevel.safeParse(experienceParam);
  const typeResult = jobType.safeParse(typeParam);
  const categoryResult = jobCategory.safeParse(categoryParam);
  const experience = experienceResult.success
    ? experienceResult.data
    : undefined;
  const type = typeResult.success ? typeResult.data : undefined;
  const category = categoryResult.success ? categoryResult.data : undefined;
  const page = Number(searchParams.get("page") as string) || 0;
  const jobs = await getJobListings(
    page * JOB_LIMIT,
    JOB_LIMIT,
    searchParam ?? undefined,
    experience,
    type,
    category,
  );
  return NextResponse.json({
    jobs,
    hasMore: jobs && jobs?.length < JOB_LIMIT,
  });
}
