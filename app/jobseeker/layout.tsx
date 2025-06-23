import { SidebarProvider } from "@/components/ui/sidebar";
import JobseekerSidebar from "./components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-primary-foreground">
      <SidebarProvider>
        <JobseekerSidebar />
        {children}
      </SidebarProvider>
    </div>
  );
}
