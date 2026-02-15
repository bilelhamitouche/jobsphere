"use client";

import { Avatar, AvatarImage } from "./avatar";
import { Card, CardContent, CardFooter } from "./card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  avatarImage: string;
  testimonial: string;
  name: string;
  job: string;
}

function TestimonialCard({
  avatarImage,
  testimonial,
  name,
  job,
}: TestimonialCardProps) {
  return (
    <Card className="text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group border-2 hover:border-primary/20">
      <CardContent className="pt-6">
        <Quote className="size-8 text-primary/30 mb-4 group-hover:text-primary/50 transition-colors" />
        <p className="text-muted-foreground leading-relaxed">
          {testimonial}
        </p>
      </CardContent>
      <CardFooter className="flex flex-row items-center gap-4 pt-4">
        <Avatar className="size-12 border-2 border-primary/20">
          <AvatarImage src={avatarImage} alt={`${name} image`} className="object-cover" />
        </Avatar>
        <div>
          <span className="font-semibold block">{name}</span>
          <span className="text-sm text-muted-foreground">{job}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default TestimonialCard;
