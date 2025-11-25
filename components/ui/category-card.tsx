import { Card, CardContent } from "./card";

interface CategoryCardProps {
  icon: React.ReactNode;
  text: string;
}

export default function CategoryCard({ icon, text }: CategoryCardProps) {
  return (
    <Card className="shadow-none transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-2 items-center">
        {icon}
        <span className="font-medium">{text}</span>
      </CardContent>
    </Card>
  );
}
