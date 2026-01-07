import { COMPANY_LIMIT } from "@/lib/constants";
import CompanySkeleton from "./CompanySkeleton";

export default function CompaniesListSkeleton() {
  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {Array.from({ length: COMPANY_LIMIT }, () => null).map((_, index) => (
        <CompanySkeleton key={index} />
      ))}
    </ul>
  );
}
