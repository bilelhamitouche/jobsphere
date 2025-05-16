"use server";
import { getCompanyInfoById } from "@/lib/queries";
import "server-only";

export async function getCompanyInfoAction(recruiterId: string) {
  const companyInfo = await getCompanyInfoById(recruiterId);
  return companyInfo;
}
