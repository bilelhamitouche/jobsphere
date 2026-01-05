"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Star } from "lucide-react";
import { useQueryState } from "nuqs";
import { FormEvent } from "react";

export default function Filter() {
  const [experience, setExperience] = useQueryState("experience", {
    shallow: false,
  });
  const [type, setType] = useQueryState("type", {
    shallow: false,
  });

  function resetFilters(e: FormEvent) {
    e.preventDefault();
    setExperience(null);
    setType(null);
  }

  return (
    <Card className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-end-2 min-w-xs">
      <CardContent className="flex flex-col items-start space-y-4">
        <CardTitle>Filters</CardTitle>
        <form className="space-y-4 w-full">
          <Separator />
          <h2 className="flex gap-2 items-center">
            <Briefcase size="18" />
            <span>Job Type</span>
          </h2>
          <Select
            defaultValue={type || ""}
            onValueChange={(value) => setType(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full-Time</SelectItem>
              <SelectItem value="part">Part-Time</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>
          <Separator />
          <h2 className="flex gap-2 items-center">
            <Star size="18" />
            <span>Experience Level</span>
          </h2>
          <Select
            defaultValue={experience || ""}
            onValueChange={(value) => setExperience(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="entry">Entry</SelectItem>
              <SelectItem value="mid">Mid</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="mt-2 w-full" onClick={resetFilters}>
            Reset filters
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
