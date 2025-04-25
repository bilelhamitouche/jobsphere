import Link from "next/link";
import { Card, CardContent } from "./card";

interface CategoryCardProps {
  icon: React.ReactNode;
  text: string;
  jobs: number;
}

function CategoryCard({ icon, text, jobs }: CategoryCardProps) {
  return (
    <Link href={`/jobs?category=${text.toLowerCase()}`}>
      <Card className="shadow-none transition-shadow hover:shadow-md">
        <CardContent className="flex flex-col gap-2 items-center">
          {icon}
          <span className="font-medium">{text}</span>
          <span className="text-sm text-gray-500">{jobs} jobs</span>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CategoryCard;
