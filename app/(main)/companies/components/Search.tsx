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
    <Card>
      <CardContent>
        <form
          className="flex gap-2 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/companies?${encodeURIComponent(input)}`);
          }}
        >
          <Input
            placeholder="Search for companies"
            value={input || ""}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button>
            <SearchIcon />
            <span>Search</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
