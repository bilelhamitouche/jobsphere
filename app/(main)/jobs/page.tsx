import { Suspense } from "react";
import Filter from "./components/Filter";
import JobsList from "./components/JobsList";
import Search from "./components/Search";

export default function Jobs() {
  return (
    <div className="p-8 space-y-8 h-full bg-primary-foreground">
      <h1 className="text-3xl font-bold">Browse Jobs</h1>
      <div className="grid gap-4 grid-rows-[auto_auto_1fr] grid-cols-[auto_1fr]">
        <Suspense fallback={null}>
          <Search />
          <Filter />
        </Suspense>
        <JobsList />
      </div>
    </div>
  );
}
