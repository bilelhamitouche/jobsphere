import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-2 items-center group">
      <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-primary/70 group-hover:scale-110 transition-transform duration-300">
        <BriefcaseBusiness size={22} className="text-white" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        JobSphere
      </span>
    </Link>
  );
}
