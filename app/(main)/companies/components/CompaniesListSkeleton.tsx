import { COMPANY_LIMIT } from "@/lib/constants";
import CompanySkeleton from "./CompanySkeleton";

export default function CompaniesListSkeleton() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: COMPANY_LIMIT }, (_) => null).map((_, index) => (
        <CompanySkeleton key={index} />
      ))}
    </ul>
  );
}
