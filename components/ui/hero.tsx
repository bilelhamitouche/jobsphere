"use client";

import { Button } from "./button";
import Link from "next/link";
import { Search, ArrowRight, Briefcase, Users, TrendingUp } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in-down">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Now hiring across 500+ companies
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 animate-fade-in-up">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              Dream Job
            </span>{" "}
            Today
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-up delay-100">
            Search thousands of job listings and connect with top employers looking
            for talent like you. Your next career move starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up delay-200">
            <Button asChild size="lg" className="group transition-all duration-300 hover:shadow-xl hover:scale-105">
              <Link href="/jobs" className="flex items-center gap-2">
                <Search size="18" />
                Browse Jobs
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="transition-all duration-300 hover:shadow-md">
              <Link href="/recruiter-signin">
                Post a Job
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up delay-300">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase size={18} className="text-primary" />
              </div>
              <span className="font-semibold text-foreground">10k+</span> Jobs
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users size={18} className="text-primary" />
              </div>
              <span className="font-semibold text-foreground">5k+</span> Companies
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp size={18} className="text-primary" />
              </div>
              <span className="font-semibold text-foreground">50k+</span> Hired
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up delay-400">
          {["Software Engineer", "UI/UX Designer", "Product Manager", "Data Analyst"].map((term) => (
            <Link
              key={term}
              href={`/jobs?search=${encodeURIComponent(term)}`}
              className="px-4 py-2 text-sm text-center rounded-full border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
