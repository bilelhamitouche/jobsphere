import { COMPANY_LIMIT } from "@/lib/constants";
import { getCompanies, getCompaniesCount } from "@/lib/queries";
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
  const page =
    Number(searchParams.get("page")) > 0 ? Number(searchParams.get("page")) : 1;
  const companies = await getCompanies(
    (page - 1) * COMPANY_LIMIT,
    COMPANY_LIMIT,
    searchParam ?? undefined,
    industry,
    size,
  );
  const totalCount = await getCompaniesCount(
    searchParam ?? undefined,
    industry,
    size,
  );
  return NextResponse.json({
    companies,
    hasMore: companies && companies?.length < COMPANY_LIMIT,
    totalPages: totalCount ? Math.ceil(totalCount / COMPANY_LIMIT) : 0,
  });
}
