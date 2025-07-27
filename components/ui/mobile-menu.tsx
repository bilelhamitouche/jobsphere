import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";

export default function MobileMenu({
  authenticated,
}: {
  authenticated: boolean;
}) {
  return (
    <Sheet defaultOpen={false}>
      <SheetTrigger asChild>
        <Button variant="outline" className="block md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="overflow-auto space-y-4 max-h-screen">
        <SheetHeader>
          <SheetTitle>JobSphere</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 px-4">
          <Link href="/jobs" className="p-2">
            Browse Jobs
          </Link>
          <Link href="/companies" className="p-2">
            Browse Companies
          </Link>
          <Link href="/about" className="p-2">
            About Us
          </Link>
        </nav>
        {authenticated ? null : (
          <div className="flex flex-col gap-2 px-4">
            <Button variant="outline" asChild>
              <Link href="/signin">Signin</Link>
            </Button>
            <Button asChild>
              <Link href="/recruiter-signin">Recruiter Signin</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
