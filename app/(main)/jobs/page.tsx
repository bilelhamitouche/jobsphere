import Filter from "./components/Filter";
import JobsList from "./components/JobsList";
import Search from "./components/Search";

export default async function Jobs({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    type?: string;
    experience?: string;
  }>;
}) {
  const { search, type, experience } = await searchParams;
  return (
    <div className="p-8 space-y-8 h-full bg-primary-foreground">
      <h1 className="text-3xl font-bold">Browse Jobs</h1>
      <div className="grid gap-4 grid-rows-[auto_auto_1fr] grid-cols-[auto_1fr]">
        <Search />
        <Filter />
        <JobsList
          search={search || ""}
          type={type || ""}
          experience={experience || ""}
        />
      </div>
    </div>
  );
}
