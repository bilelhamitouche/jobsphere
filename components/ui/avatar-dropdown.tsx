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
      <DropdownMenuContent align="end" className="w-40">
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
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => authClient.signOut()}>
          <LogOut className="text-red-500" />
          <span className="text-red-500">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
