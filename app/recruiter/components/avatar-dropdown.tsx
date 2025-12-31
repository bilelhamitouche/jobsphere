"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AvatarDropdownProps {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null | undefined;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}

export default function AvatarDropdown({ user }: AvatarDropdownProps) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-1">
              <Avatar>
                <AvatarImage
                  src={user?.image as string}
                  alt={`${user?.name} image`}
                />
                <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p>{user?.name}</p>
                <p className="text-xs text-gray-700">{user?.email}</p>
              </div>
            </div>
            <ChevronsUpDown size="20" />
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-60">
        <DropdownMenuItem>
          <Avatar>
            <AvatarImage
              src={user?.image as string}
              alt={`${user?.image} image`}
            />
            <AvatarFallback>{user?.name.toUpperCase()[0]}</AvatarFallback>
          </Avatar>
          {user?.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings/account">
            <Settings />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/recruiter-signin");
                },
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
