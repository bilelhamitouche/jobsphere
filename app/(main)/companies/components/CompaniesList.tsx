"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CompanyCard from "./CompanyCard";
import { useSearchParams } from "next/navigation";
import { COMPANY_LIMIT } from "@/lib/constants";
import { companyIndustry, companySize } from "@/lib/zod";
import { z } from "zod";
import CompaniesListSkeleton from "./CompaniesListSkeleton";

interface CompanyReponse {
  companies: Company[];
  hasMore: boolean;
}

interface Company {
  id: string;
  name: string;
  logo_url: string | null;
  about: string;
  size: z.infer<typeof companySize>;
  industry: z.infer<typeof companyIndustry>;
  foundationYear: number;
  headquarters: string | null;
  website: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  jobCount: number;
}

export default function CompaniesList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const size = searchParams.get("size");
  const page = Number(searchParams.get("page")) || 0;
  const industry = searchParams.get("industry");
  async function getCompanies(
    search: string = "",
    page: number = 0,
    size: string | null,
    industry: string | null,
  ) {
    const res = await fetch(
      `/api/companies?search=${search}&size=${size}&industry=${industry}&page=${page}&limit=${COMPANY_LIMIT}`,
    );
    const data = (await res.json()) as CompanyReponse;
    return data;
  }
  const { data, isPending } = useQuery({
    queryKey: ["companies", search, page, size, industry],
    queryFn: () =>
      getCompanies(search ?? undefined, page, size ?? null, industry ?? null),
    placeholderData: keepPreviousData,
  });
  const companies = data?.companies ?? [];
  if (!isPending && companies.length === 0) {
    return <div className="text-gray-700">No Companies Found</div>;
  }
  if (isPending) {
    return <CompaniesListSkeleton />;
  }
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          id={company.id}
          name={company.name}
          size={company.size}
          industry={company.industry}
          logoUrl={company.logo_url}
          jobCount={company.jobCount}
          headquarters={company.headquarters}
        />
      ))}
    </ul>
  );
}
