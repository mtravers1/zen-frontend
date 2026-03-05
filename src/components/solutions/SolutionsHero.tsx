const SolutionsHero = () => {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our <span className="text-accent">Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Everything you need to grow your business. From digital tools to expert CFO services, 
            we've got you covered with comprehensive financial solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionsHero;
