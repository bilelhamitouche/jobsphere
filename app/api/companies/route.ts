import { COMPANY_LIMIT } from "@/lib/constants";
import { getCompanies } from "@/lib/queries";
import { companyIndustry, companySize } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const searchParam = searchParams.get("search");
  const sizeParam = searchParams.get("size");
  const industryParam = searchParams.get("industry");
  const sizeResult = companySize.safeParse(sizeParam);
  const industryResult = companyIndustry.safeParse(industryParam);
  const size = sizeResult.success ? sizeResult.data : undefined;
  const industry = industryResult.success ? industryResult.data : undefined;
  const page = Number(searchParams.get("page")) || 0;
  const companies = await getCompanies(
    page * COMPANY_LIMIT,
    COMPANY_LIMIT,
    searchParam ?? undefined,
    industry,
    size,
  );
  return NextResponse.json({
    companies,
    hasMore: companies && companies?.length < COMPANY_LIMIT,
  });
}
