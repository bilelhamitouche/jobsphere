import { BriefcaseBusiness, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import AvatarDropdown from "./avatar-dropdown";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MobileMenu from "./mobile-menu";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="container flex justify-between items-center p-4 mx-auto">
      <Link href="/" className="flex gap-2 items-center">
        <BriefcaseBusiness size={25} className="text-primary" />
        <span className="text-2xl font-bold text-primary">JobSphere</span>
      </Link>
      <nav className="hidden gap-4 items-center md:flex">
        <Link
          href="/jobs"
          className="transition-colors duration-200 hover:text-primary"
        >
          Find Jobs
        </Link>
        <Link
          href="/companies"
          className="transition-colors duration-200 hover:text-primary"
        >
          Companies
        </Link>
        <Link
          href="/about"
          className="transition-colors duration-200 hover:text-primary"
        >
          About Us
        </Link>
      </nav>
      {!session?.user ? (
        <div className="hidden space-x-2 md:block">
          <Button variant="outline" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/recruiter-signin" className="text-lg">
              Recruiter Sign In
            </Link>
          </Button>
        </div>
      ) : (
        <AvatarDropdown userInfo={session.user} />
      )}
      <MobileMenu />
    </header>
  );
}
