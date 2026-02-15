"use client";

import { Brush, Code, Database, Network } from "lucide-react";
import CategoryCard from "./category-card";

function PopularCategories() {
  const categories = [
    { icon: <Code size="32" />, text: "Programming" },
    { icon: <Network size="32" />, text: "Networking" },
    { icon: <Brush size="32" />, text: "Design" },
    { icon: <Database size="32" />, text: "Data Science" },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl mb-3">Browse By Category</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore job opportunities by industry category and find your perfect fit
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.text}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CategoryCard icon={category.icon} text={category.text} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularCategories;
