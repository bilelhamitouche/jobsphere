import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="container flex justify-between items-center p-4 mx-auto max-w-6xl">
      <Link href="/" className="flex gap-2 items-center">
        <BriefcaseBusiness size={25} className="text-primary" />
        <span className="text-2xl font-bold text-primary">JobSphere</span>
      </Link>
      {!session ? (
        <div className="space-x-2">
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={session?.user.image!} alt="user image" />
              <AvatarFallback>{session?.user.name[0]}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}

export default Navbar;
