"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { ChevronsUpDown, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AvatarDropdown() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg">
          {isPending ? (
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-1">
              <Skeleton className="size-8 rounded-full" />
              <div>
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
            </div>
            <ChevronsUpDown size="20" />
          </div>
          ) : (
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-1">
              <Avatar>
                <AvatarImage
                  src={session?.user.image as string}
                  alt={`${session?.user.name} image`}
                />
                <AvatarFallback>
                  {session?.user.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p>{session?.user.name}</p>
                <p className="text-xs text-gray-700">
                  {session?.user.email}
                </p>
              </div>
            </div>
            <ChevronsUpDown size="20" />
          </div>
          )}
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuItem>
          <Avatar>
            <AvatarImage
              src={session?.user.image as string}
              alt={`${session?.user.image} image`}
            />
            <AvatarFallback>
              {session?.user.name.toUpperCase()[0]}
            </AvatarFallback>
          </Avatar>
          {session?.user.email}
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
  )
}
