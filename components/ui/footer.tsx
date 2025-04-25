import { Separator } from "./separator";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

function Footer() {
  return (
    <footer className="p-4 border-t bg-primary-foreground border-t-gray-200">
      <div className="grid grid-cols-1 gap-8 py-4 pb-8 md:grid-cols-4 md:gap-2">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex gap-2 items-center text-lg font-bold text-primary"
          >
            <BriefcaseBusiness size="20" />
            <span>JobSphere</span>
          </Link>
          <p className="text-sm text-gray-500">
            Connecting the right talent with the right opportunities
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-medium">For Job Seekers</h4>
          <Link href="/jobs" className="text-sm text-gray-600">
            Browse Jobs
          </Link>
          <Link href="/companies" className="text-sm text-gray-600">
            Companies
          </Link>
          <Link href="/career-resources" className="text-sm text-gray-600">
            Career Resources
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-medium">For Employers</h4>
          <Link href="/jobs" className="text-sm text-gray-600">
            Post a Jobs
          </Link>
          <Link href="/employer-resources" className="text-sm text-gray-600">
            Employer Resources
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-medium">Company</h4>
          <Link href="/about" className="text-sm text-gray-600">
            About Us
          </Link>
          <Link href="/contact" className="text-sm text-gray-600">
            Contact
          </Link>
          <Link href="/privacy" className="text-sm text-gray-600">
            Privacy Policy
          </Link>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between items-center py-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} JobSphere. All rights reserved.
        </p>
        <div className="flex gap-4 items-center">
          <Link href="https://twitter.com/jobsphere">
            <FaTwitter
              size="20"
              className="text-gray-500 transition-colors hover:text-gray-600"
            />
          </Link>
          <Link href="https://linkedin.com/jobsphere">
            <FaLinkedin
              size="20"
              className="text-gray-500 transition-colors hover:text-gray-600"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
