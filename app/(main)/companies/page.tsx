import Search from "./components/Search";

function Companies() {
  return (
    <div className="p-8 space-y-8 bg-primary-foreground">
      <h2 className="text-2xl font-bold">Browse Companies</h2>
      <div className="">
        <Search />
      </div>
    </div>
  );
}

export default Companies;
