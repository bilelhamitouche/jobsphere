import { Avatar, AvatarImage } from "./avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./card";

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
    <Card className="text-left">
      <CardHeader>
        <Avatar>
          <AvatarImage src={avatarImage} alt={`${name} image`} className="object-cover" />
        </Avatar>
      </CardHeader>
      <CardContent>{testimonial}</CardContent>
      <CardFooter className="flex flex-col gap-1 items-start">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-gray-500">{job}</span>
      </CardFooter>
    </Card>
  );
}

export default TestimonialCard;
