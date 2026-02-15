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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between items-center px-4 py-3 mx-auto">
        <div className="animate-fade-in-down">
          <Logo />
        </div>
        <nav className="hidden gap-1 items-center md:flex">
          <Link
            href="/jobs"
            className="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:text-primary group"
          >
            Find Jobs
            <span className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 transition-transform duration-300 bg-primary rounded-full group-hover:scale-x-100" />
          </Link>
          <Link
            href="/companies"
            className="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:text-primary group"
          >
            Companies
            <span className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 transition-transform duration-300 bg-primary rounded-full group-hover:scale-x-100" />
          </Link>
          <Link
            href="/about"
            className="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:text-primary group"
          >
            About Us
            <span className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 transition-transform duration-300 bg-primary rounded-full group-hover:scale-x-100" />
          </Link>
        </nav>
        {!session?.user ? (
          <div className="hidden space-x-3 md:block animate-fade-in-up">
            <Button variant="outline" asChild className="transition-all duration-300 hover:shadow-md">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild className="transition-all duration-300 hover:shadow-lg hover:scale-105">
              <Link href="/recruiter-signin" className="text-sm">
                Recruiter Sign In
              </Link>
            </Button>
          </div>
        ) : (
          <div className="animate-scale-in">
            <AvatarDropdown userInfo={session.user} />
          </div>
        )}
        <div className="md:hidden">
          <MobileMenu authenticated={!!session} />
        </div>
      </div>
    </header>
  );
}
