import CompaniesList from "./components/CompaniesList";
import Search from "./components/Search";

function Companies() {
  return (
    <div className="p-8 space-y-8 bg-primary-foreground">
      <h2 className="text-3xl font-bold">Browse Companies</h2>
      <div className="space-y-8">
        <Search />
        <CompaniesList />
      </div>
    </div>
  );
}

export default Companies;
