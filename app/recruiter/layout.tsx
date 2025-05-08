import { SidebarProvider } from "@/components/ui/sidebar";
import RecruiterSidebar from "./components/sidebar";
import Navbar from "./components/navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-primary-foreground">
      <SidebarProvider>
        <RecruiterSidebar />
        <main className="w-full h-full">
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}

export default Layout;
