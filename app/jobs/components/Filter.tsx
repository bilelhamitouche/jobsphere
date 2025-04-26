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
import { Briefcase, Clock, Star } from "lucide-react";

function Filter() {
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
          <div className="flex gap-2">
            <Checkbox id="full" name="full" value="full" />
            <Label htmlFor="full">Full time</Label>
          </div>
          <div className="flex gap-2">
            <Checkbox id="part" name="part" value="part" />
            <Label htmlFor="part">Part time</Label>
          </div>
          <div className="flex gap-2">
            <Checkbox id="contract" name="contract" value="contract" />
            <Label htmlFor="contract">Contract</Label>
          </div>
          <div className="flex gap-2">
            <Checkbox id="internship" name="internship" value="Internship" />
            <Label htmlFor="internship">Internship</Label>
          </div>
          <Separator />
          <h2 className="flex gap-2 items-center">
            <Star size="18" />
            <span>Experience Level</span>
          </h2>
          <Select>
            <SelectTrigger value="all" className="w-full">
              All Experience Levels
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="none">No Experience</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
            </SelectContent>
          </Select>
          <Separator />
          <h2 className="flex gap-2 items-center">
            <Clock size="18" />
            <span>Date Posted</span>
          </h2>
          <Select>
            <SelectTrigger value="any" className="w-full">
              Any Time
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="mt-2 w-full">
            Apply filters
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Filter;
