import { Suspense } from "react";
import CompaniesList from "./components/CompaniesList";
import CompaniesListSkeleton from "./components/CompaniesListSkeleton";
import Controls from "./components/Controls";
import CompaniesControlsFallback from "./components/CompaniesControlsFallback";

export default async function Companies() {
  return (
    <div className="p-8 space-y-8 h-full bg-primary-foreground">
      <h2 className="text-2xl font-bold">Browse Companies</h2>
      <div className="grid gap-4 grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr]">
        <Suspense fallback={<CompaniesControlsFallback />}>
          <Controls />
        </Suspense>
        <Suspense fallback={<CompaniesListSkeleton />}>
          <CompaniesList />
        </Suspense>
      </div>
    </div>
  );
}
