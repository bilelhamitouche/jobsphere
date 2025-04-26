import Link from "next/link";
import { Button } from "./button";

function ComingSoon() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <h2 className="text-3xl font-bold">Coming Soon</h2>
      <div className="flex gap-4 items-center">
        <Button variant="outline" asChild>
          <Link href="/">Return to Home</Link>
        </Button>
        <Button>
          <Link href="/jobs">Browser Jobs</Link>
        </Button>
      </div>
    </div>
  );
}

export default ComingSoon;
