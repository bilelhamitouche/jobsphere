import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { auth } from "@/lib/auth";
import {
  BriefcaseBusiness,
  ChevronsUpDown,
  Factory,
  Home,
  Send,
  Settings,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

async function RecruiterSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="flex gap-2 justify-center items-center p-4 text-xl font-bold text-primary">
          <BriefcaseBusiness size="25" />
          <span>Jobsphere</span>
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="/recruiter" className="flex gap-2 items-center">
                <Home size="15" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
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
            <SidebarMenuButton>
              <Link href="/recruiter/jobs" className="flex gap-2 items-center">
                <BriefcaseBusiness size="15" />
                Jobs
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link
                href="/recruiter/applications"
                className="flex gap-2 items-center"
              >
                <Send size="15" />
                Applications
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="/settings" className="flex gap-2 items-center">
                <Settings size="15" />
                Settings
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
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>Hello</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default RecruiterSidebar;
