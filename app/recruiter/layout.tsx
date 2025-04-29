import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import RecruiterSidebar from "./components/sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <RecruiterSidebar />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </div>
  );
}

export default Layout;
