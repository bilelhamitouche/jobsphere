"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQueryState } from "nuqs";

export default function Search() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  return (
    <Card className="col-span-2 row-start-1 row-end-2">
      <CardContent className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Search for jobs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </CardContent>
    </Card>
  );
}
