import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BriefcaseBusiness, Factory, Home, Send } from "lucide-react";
import Link from "next/link";
import AvatarDropdown from "./avatar-dropdown";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SidebarMenuLink from "@/components/SidebarMenuLink";

export default async function RecruiterSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="flex gap-2 justify-center items-center p-4 text-2xl font-bold text-primary">
          <BriefcaseBusiness size="25" />
          <Link href="/">Jobsphere</Link>
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="p-2">
          <SidebarMenuLink
            href="/recruiter"
            text="Dashboard"
            icon={<Home size="15" />}
          />
          <SidebarMenuLink
            href="/recruiter/company"
            text="Company"
            icon={<Factory size="15" />}
          />
          <SidebarMenuLink
            href="/recruiter/jobs"
            text="Jobs"
            icon={<BriefcaseBusiness size="15" />}
          />
          <SidebarMenuLink
            href="/recruiter/applications"
            text="Applications"
            icon={<Send size="15" />}
          />
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <AvatarDropdown user={session?.user ?? null} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
