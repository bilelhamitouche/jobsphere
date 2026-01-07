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
import { companyIndustry, companySize } from "@/lib/zod";
import { Factory, Users2 } from "lucide-react";
import { useQueryState } from "nuqs";
import { FormEvent } from "react";

export default function Filter() {
  const [size, setSize] = useQueryState("size", {
    shallow: false,
  });
  const [industry, setIndustry] = useQueryState("industry", {
    shallow: false,
  });
  const sizeOptions = companySize.options;
  const industryOptions = companyIndustry.options;

  function resetFilters(e: FormEvent) {
    e.preventDefault();
    setSize(null);
    setIndustry(null);
  }

  return (
    <Card className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-end-2 min-w-xs">
      <CardContent className="flex flex-col items-start space-y-4">
        <CardTitle>Filters</CardTitle>
        <form className="space-y-4 w-full">
          <Separator />
          <h2 className="flex gap-2 items-center">
            <Factory size="18" />
            <span>Industry</span>
          </h2>
          <Select
            defaultValue={industry || ""}
            onValueChange={(value) => setIndustry(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              {industryOptions.map((option) => (
                <SelectItem key={option} value={option} className="capitalize">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Separator />
          <h2 className="flex gap-2 items-center">
            <Users2 size="18" />
            <span>Size</span>
          </h2>
          <Select
            defaultValue={size || ""}
            onValueChange={(value) => setSize(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              {sizeOptions.map((option) => (
                <SelectItem key={option} value={option} className="capitalize">
                  {option}
                </SelectItem>
              ))}
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
