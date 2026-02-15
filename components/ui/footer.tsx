import { Separator } from "./separator";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Logo from "./logo";

function Footer() {
  return (
    <footer className="border-t bg-card/50">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Connecting the right talent with the right opportunities. Your journey to a fulfilling career starts here.
            </p>
            <div className="flex gap-4 mt-6">
              <Link 
                href="https://twitter.com/jobsphere" 
                className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <FaTwitter size={18} />
              </Link>
              <Link 
                href="https://linkedin.com/jobsphere" 
                className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <FaLinkedin size={18} />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/jobs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/career-resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/recruiter-signin" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/employer-resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Employer Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} JobSphere. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
