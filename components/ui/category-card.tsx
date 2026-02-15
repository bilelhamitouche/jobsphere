"use client";

import { Card, CardContent } from "./card";
import Link from "next/link";

interface CategoryCardProps {
  icon: React.ReactNode;
  text: string;
}

export default function CategoryCard({ icon, text }: CategoryCardProps) {
  return (
    <Link href={`/jobs?category=${encodeURIComponent(text)}`}>
      <Card className="shadow-none transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 border-2 hover:border-primary/30 group">
        <CardContent className="flex flex-col gap-3 items-center p-6">
          <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110">
            {icon}
          </div>
          <span className="font-semibold text-center">{text}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
