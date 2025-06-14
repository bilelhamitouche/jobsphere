import { getCompanies } from "@/lib/queries";
import CompanyCard from "./CompanyCard";

export default async function CompaniesList() {
  const companies = await getCompanies();
  if (!companies)
    return (
      <div className="p-8">
        <span className="text-lg font-semibold text-center text-gray-500">
          No companies found
        </span>
      </div>
    );
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          id={company.id}
          name={company.name}
          imageUrl={company.logoUrl}
          industry={company.industry}
          foundationYear={company.foundationYear}
          website={company.website}
        />
      ))}
    </ul>
  );
}
