import CompaniesList from "./components/CompaniesList";
import Search from "./components/Search";

export default async function Companies({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  return (
    <div className="p-8 space-y-8 bg-primary-foreground">
      <h2 className="text-3xl font-bold">Browse Companies</h2>
      <div className="space-y-8">
        <Search />
        <CompaniesList search={search || ""} />
      </div>
    </div>
  );
}
