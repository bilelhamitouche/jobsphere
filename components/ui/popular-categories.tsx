function PopularCategories() {
  return (
    <div className="flex flex-col gap-2 text-center">
      <h2 className="text-3xl font-bold">Browser By Category</h2>
      <p className="text-gray-500">
        Explore job opportunities by industry category
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></div>
    </div>
  );
}

export default PopularCategories;
