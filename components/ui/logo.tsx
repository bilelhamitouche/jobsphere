import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <BriefcaseBusiness size={25} className="text-primary" />
      <span className="text-2xl font-bold text-primary">JobSphere</span>
    </Link>
  );
}
