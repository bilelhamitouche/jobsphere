import { Factory, SearchIcon, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { companyIndustry, companySize } from "@/lib/zod";

export default function CompaniesControlsFallback() {
  const industryOptions = companyIndustry.options;
  const sizeOptions = companySize.options;
  return (
    <>
      <Card className="col-span-2 row-start-1 row-end-2">
        <CardContent className="flex flex-col gap-4">
          <form className="flex gap-2 items-center">
            <Input type="text" placeholder="Search for jobs" />
            <Button>
              <SearchIcon />
              <span>Search</span>
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-end-2 min-w-xs">
        <CardContent className="flex flex-col items-start space-y-4">
          <CardTitle>Filters</CardTitle>
          <form className="space-y-4 w-full">
            <Separator />
            <h2 className="flex gap-2 items-center">
              <Factory size="18" />
              <span>Industry</span>
            </h2>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Industry" />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="capitalize"
                  >
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
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Size" />
              </SelectTrigger>
              <SelectContent>
                {sizeOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="capitalize"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" className="mt-2 w-full">
              Reset filters
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
