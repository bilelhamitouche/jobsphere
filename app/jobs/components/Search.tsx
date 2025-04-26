import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function Search() {
  return (
    <Card className="col-span-2 row-start-1 row-end-2">
      <CardContent className="flex flex-col gap-4">
        <form className="flex gap-2 items-center">
          <Input type="text" placeholder="Search for jobs" />
        </form>
      </CardContent>
    </Card>
  );
}

export default Search;
