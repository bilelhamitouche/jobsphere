import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Navbar() {
  return (
    <header className="flex gap-4 items-center p-4 w-full bg-white border-b border-gray-200 h-18">
      <SidebarTrigger />
    </header>
  );
}
