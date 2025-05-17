import { getUserInfo } from "@/actions/auth";
import { getCompanyInfoById } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUserInfo();
  const companyInfo = await getCompanyInfoById(user?.id as string);
  return NextResponse.json(companyInfo, { status: 200 })
}
