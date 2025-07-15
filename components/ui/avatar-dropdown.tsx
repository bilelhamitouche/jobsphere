"use client";
import { authClient } from "@/lib/auth-client";
import { LayoutDashboard, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AvatarDropdownProps {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined;
  role: string;
}

export default function AvatarDropdown({
  userInfo,
}: {
  userInfo: AvatarDropdownProps;
}) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={userInfo.image as string}
            alt={`${userInfo.name} image`}
          />
          <AvatarFallback>{userInfo.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48 mix-w-fit">
        <DropdownMenuItem>{userInfo.email}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LayoutDashboard />
          <Link
            href={`${userInfo.role === "recruiter" ? "/recruiter" : "/jobseeker"}`}
          >
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          <Link href="/settings/account">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => router.refresh(),
              },
            })
          }
        >
          <LogOut className="text-red-500" />
          <span className="text-red-500">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
