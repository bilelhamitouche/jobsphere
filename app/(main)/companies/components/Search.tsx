"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQueryState } from "nuqs";

function Search() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  return (
    <Card>
      <CardContent>
        <Input
          placeholder="Search for companies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </CardContent>
    </Card>
  );
}

export default Search;
