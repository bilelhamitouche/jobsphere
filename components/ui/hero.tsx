function Hero() {
  return (
    <section className="flex flex-col items-center py-20 space-y-4 bg-gradient-to-b from-primary-foreground to-primary-background">
      <h1 className="text-6xl font-bold tracking-tight">
        Find Your <span className="text-primary">Dream Job</span> Today
      </h1>
      <p className="max-w-2xl text-xl text-center text-gray-600">
        Search thousands of job listings and connect with top employers looking
        for talent like you.
      </p>
      <p className="text-sm text-gray-500">
        Popular: Software Engineer, UI/UX Designer, Product Manager, Data
        Analyst
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"></div>
    </section>
  );
}

export default Hero;
