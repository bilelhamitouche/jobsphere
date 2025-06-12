import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BriefcaseBusiness, Factory, Home, Send } from "lucide-react";
import Link from "next/link";
import AvatarDropdown from "./avatar-dropdown";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function RecruiterSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="flex gap-2 justify-center items-center p-4 text-2xl font-bold text-primary">
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
            <AvatarDropdown user={session?.user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
