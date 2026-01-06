import CompaniesList from "./components/CompaniesList";
import Filter from "./components/Filter";
import Search from "./components/Search";

export default async function Companies() {
  return (
    <div className="p-8 space-y-8 h-full bg-primary-foreground">
      <h2 className="text-3xl font-bold">Browse Companies</h2>
      <div className="grid gap-4 grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr]">
        <Search />
        <Filter />
        <CompaniesList />
      </div>
    </div>
  );
}
