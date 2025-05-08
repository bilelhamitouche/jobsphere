"use client";

import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="flex gap-4 items-center p-4 w-full bg-white border-b border-gray-200 h-18">
      <SidebarTrigger />
      {pathname !== "/recruiter" && pathname !== "/recruiter/company" && (
        <Input placeholder="Search" className="w-xs" />
      )}
    </header>
  );
}
