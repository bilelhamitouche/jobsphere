import Link from "next/link";
import { Button } from "./button";
import AvatarDropdown from "./avatar-dropdown";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MobileMenu from "./mobile-menu";
import Logo from "./logo";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="container flex justify-between items-center p-4 mx-auto">
      <Logo />
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
      <MobileMenu authenticated={!!session} />
    </header>
  );
}
