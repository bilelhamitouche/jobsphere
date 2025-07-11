import { getCompanies } from "@/lib/queries";
import CompanyCard from "./CompanyCard";
import { notFound } from "next/navigation";

export default async function CompaniesList({ search }: { search: string }) {
  const companies = await getCompanies();
  if (!companies) notFound();
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase()),
  );
  if (filteredCompanies.length === 0) {
    return (
      <div className="p-8 text-lg font-medium text-gray-700">
        No companies found
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredCompanies.map((company) => (
        <CompanyCard
          key={company.id}
          id={company.id}
          name={company.name}
          size={company.size}
          imageUrl={company.logoUrl}
          industry={company.industry}
          headquarters={company.headquarters}
          count={company.count}
        />
      ))}
    </ul>
  );
}
