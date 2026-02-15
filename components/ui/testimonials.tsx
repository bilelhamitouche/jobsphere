"use client";

import TestimonialCard from "./testimonial-card";

function Testimonials() {
  const testimonials = [
    {
      avatarImage: "https://plus.unsplash.com/premium_photo-1661726660137-61b182d93809?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGUlMjBhc2lhbnxlbnwwfHwwfHx8MA%3D%3D",
      testimonial: "I found my dream job within just two weeks of signing up! The platform's matching algorithm really works.",
      name: "Ma Ching",
      job: "Data Scientist, TechCorp Inc.",
    },
    {
      avatarImage: "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      testimonial: "As an employer, finding quality candidates has never been easier. The ROI on our job postings has been fantastic.",
      name: "Alex Rodriguez",
      job: "HR Director, GrowthCo",
    },
    {
      avatarImage: "https://images.unsplash.com/photo-1644383431542-19f678c3e207?q=80&w=1571&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      testimonial: "The job search process was intuitive and saved me so much time compared to other platforms I've used.",
      name: "Sammy Chandio",
      job: "Software Engineer, TechNet",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl mb-3">What People Say</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Success stories from job seekers and employers who connected on our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
