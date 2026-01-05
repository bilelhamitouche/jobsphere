import { COMPANY_LIMIT } from "@/lib/constants";
import { getCompanies } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page") as string) || 0;
  const companies = await getCompanies(
    page * COMPANY_LIMIT,
    COMPANY_LIMIT,
    search,
  );
  return NextResponse.json({
    companies,
    hasMore: companies && companies?.length < COMPANY_LIMIT,
  });
}
