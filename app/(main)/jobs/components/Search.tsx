"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const [input, setInput] = useState("");
  const router = useRouter();
  return (
    <Card className="col-span-2 row-start-1 row-end-2">
      <CardContent className="flex flex-col gap-4">
        <form
          className="flex gap-2 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/jobs?search=${encodeURIComponent(input)}`);
          }}
        >
          <Input
            type="text"
            placeholder="Search for jobs"
            value={input || ""}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit">
            <SearchIcon />
            <span>Search</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
