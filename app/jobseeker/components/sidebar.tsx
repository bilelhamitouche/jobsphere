import { getUserInfo } from "@/actions/auth";
import {
  DropdownMenu,
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
import { BriefcaseBusiness, Home, Send } from "lucide-react";
import Link from "next/link";
import AvatarDropdown from "./avatar-dropdown";
import { redirect } from "next/navigation";

export default async function JobseekerSidebar() {
  const user = await getUserInfo();
  if (!user) redirect("/");
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="flex gap-2 justify-center items-center text-2xl font-bold text-primary">
          <BriefcaseBusiness size="25" />
          <span>Jobsphere</span>
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="p-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/jobseeker">
                <Home />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/jobseeker/jobs">
                <BriefcaseBusiness />
                <span>Jobs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/jobseeker/applications">
                <Send />
                <span>Applications</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <AvatarDropdown user={user} />
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
