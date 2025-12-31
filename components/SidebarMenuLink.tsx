"use client";

import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";

interface SidebarMenuLinkProps {
  href: string;
  text: string;
  icon?: React.ReactNode;
}

export default function SidebarMenuLink({
  href,
  text,
  icon,
}: SidebarMenuLinkProps) {
  const pathname = usePathname();
  function isActive(href: string) {
    return pathname === href;
  }
  return (
    <SidebarMenuItem>
      <SidebarMenuButton data-active={isActive(href)}>
        <Link href={href} className="flex gap-2 items-center w-full">
          {icon && icon}
          <span>{text}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
