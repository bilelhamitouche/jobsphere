"use client";

import Link from "next/link";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";

function NextSteps() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-8 py-16 text-center text-primary-foreground">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>
          
          <h2 className="text-3xl font-bold md:text-4xl mb-4">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="mx-auto max-w-xl text-primary-foreground/80 mb-8 text-lg">
            Create your account now to unlock personalized job recommendations and
            get notified about new opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              asChild 
              className="transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Link href="/signup" className="flex items-center gap-2">
                Create an account
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              asChild 
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            >
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NextSteps;
