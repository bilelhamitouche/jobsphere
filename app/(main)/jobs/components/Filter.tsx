"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Star } from "lucide-react";
import { useQueryState } from "nuqs";
import { FormEvent } from "react";

const types: string[] = ["full", "part", "internship", "remote"];

export default function Filter() {
  const [experience, setExperience] = useQueryState("experience", {
    defaultValue: "",
  });

  function resetFilters(e: FormEvent) {
    e.preventDefault();
    setExperience(null);
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
          {types.map((type: string, index: number) => (
            <div className="flex gap-2" key={index}>
              <Checkbox id={type} name={type} value={type} />
              <Label htmlFor={type} className="capitalize">
                {type} {type === "full" || type === "part" ? "time" : ""}
              </Label>
            </div>
          ))}
          <Separator />
          <h2 className="flex gap-2 items-center">
            <Star size="18" />
            <span>Experience Level</span>
          </h2>
          <Select
            value={experience}
            onValueChange={(value) => setExperience(value)}
          >
            <SelectTrigger className="w-full">Experience</SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Experience</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
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
