"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center p-4 h-full text-center">
      <h1 className="text-3xl font-bold text-red-500 md:text-4xl">
        OOPS!! Something went wrong
      </h1>
      <p className="text-gray-500">
        It seems like there was an unexpected error that occured.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/jobs">Browser Jobs</Link>
        </Button>
      </div>
    </div>
  );
}

