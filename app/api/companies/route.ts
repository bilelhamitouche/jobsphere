import { COMPANY_LIMIT } from "@/lib/constants";
import { getCompanies } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const searchParams = new URLSearchParams(req.url);
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
