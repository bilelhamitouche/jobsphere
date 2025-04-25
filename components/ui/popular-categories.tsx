import { Brush, Code, Database, Network } from "lucide-react";
import CategoryCard from "./category-card";

function PopularCategories() {
  return (
    <div className="flex flex-col gap-2 text-center">
      <h2 className="text-3xl font-bold">Browse By Category</h2>
      <p className="text-gray-500">
        Explore job opportunities by industry category
      </p>
      <div className="grid grid-cols-1 gap-4 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CategoryCard
          icon={<Code size="48" className="text-primary" />}
          text="Programming"
          jobs={10}
        />
        <CategoryCard
          icon={<Network size="48" className="text-primary" />}
          text="Networking"
          jobs={2}
        />
        <CategoryCard
          icon={<Brush size="48" className="text-primary" />}
          text="Design"
          jobs={4}
        />
        <CategoryCard
          icon={<Database size="48" className="text-primary" />}
          text="Data Science"
          jobs={10}
        />
      </div>
    </div>
  );
}

export default PopularCategories;
