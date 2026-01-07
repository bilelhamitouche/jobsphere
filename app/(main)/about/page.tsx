import { Button } from "@/components/ui/button";
import { ArrowRight, CircleCheckBig, Heart, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ValueCard from "./components/ValueCard";

export default function About() {
  return (
    <div className="w-full h-full">
      <section className="flex flex-col justify-center items-center py-8 px-8 space-y-6 w-full sm:py-12 md:py-16">
        <h2 className="flex flex-col items-center text-3xl font-bold md:text-4xl lg:text-5xl">
          <span>Connecting Talent with</span>
          <span className="text-primary">Opportunity</span>
        </h2>
        <p className="max-w-3xl text-lg text-center text-gray-700 md:text-xl">
          At JobSphere, we believe everyone deserves to find work they love.
          We&apos;re building the future of recruitment by creating meaningful
          connections between talented individuals and forward-thinking
          companies.
        </p>
        <Button asChild size="lg">
          <Link href="/jobs" className="flex gap-2 group">
            <span>Explore Opportunities</span>
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </section>
      <section className="flex flex-col p-8 py-16 space-y-6 space-x-8 bg-white lg:flex-row">
        <div className="flex flex-col gap-4 items-start">
          <h3 className="text-2xl font-bold md:text-3xl">Our Story</h3>
          <div className="space-y-2 text-base md:text-lg">
            <p>
              Founded in 2020, JobSphere was born from a simple observation: the
              job search process was broken. Too many talented people were
              struggling to find opportunities that matched their skills and
              aspirations, while companies were missing out on great candidates.
            </p>
            <p>
              We set out to change that by building a platform that goes beyond
              traditional job boards. Using advanced matching algorithms,
              personalized recommendations, and human-centered design,
              we&apos;re making job searching more efficient, effective, and
              enjoyable for everyone involved.
            </p>
          </div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="office image"
          width="600"
          height="500"
          className="w-full rounded-lg lg:w-fit"
        />
      </section>
      <section className="py-16 space-y-4">
        <h3 className="text-2xl font-bold text-center md:text-3xl">
          Our Values
        </h3>
        <p className="mx-auto max-w-2xl text-base text-center text-gray-700 md:text-lg">
          These principles guide every decision we make and every feature we
          build
        </p>
        <div className="flex flex-col gap-8 p-8 mx-auto max-w-6xl md:flex-row">
          <ValueCard
            icon={<Target className="text-primary" size="30" />}
            value="Misson-Driven"
            description="We&aposre committed to connecting talent with opportunity, making career growth accessible to everyone."
          />
          <ValueCard
            icon={<Heart className="text-primary" size="30" />}
            value="People First"
            description="Every feature we build puts job seekers and employers at the center of meaningful career connections."
          />
          <ValueCard
            icon={<CircleCheckBig className="text-primary" size="30" />}
            value="Misson-Driven"
            description="We maintain the highest standards for job postings and candidate verification to ensure quality matches."
          />
        </div>
      </section>
    </div>
  );
}
