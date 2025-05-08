"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import {
  BriefcaseBusiness,
  ChevronsUpDown,
  Factory,
  Home,
  LogOut,
  Send,
  Settings,
} from "lucide-react";
import Link from "next/link";

function RecruiterSidebar() {
  const { data: session } = authClient.useSession();
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="flex gap-2 justify-center items-center p-4 text-xl font-bold text-primary">
          <BriefcaseBusiness size="25" />
          <span>Jobsphere</span>
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="p-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/recruiter" className="flex gap-2 items-center">
                <Home size="15" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/recruiter/company"
                className="flex gap-2 items-center"
              >
                <Factory size="15" />
                <span>Company</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/recruiter/jobs" className="flex gap-2 items-center">
                <BriefcaseBusiness size="15" />
                Jobs
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/recruiter/applications"
                className="flex gap-2 items-center"
              >
                <Send size="15" />
                Applications
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-1">
                      <Avatar>
                        <AvatarImage
                          src={session?.user.image!}
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
                <DropdownMenuItem onClick={() => authClient.signOut()}>
                  <LogOut className="text-red-500" />
                  <span className="text-red-500">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default RecruiterSidebar;
