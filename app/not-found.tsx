import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <h2 className="text-6xl font-bold text-primary">404</h2>
      <p className="text-xl">Page Not Found</p>
      <p className="text-gray-600">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
