const ContactHero = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            We'd love to hear from you. Whether you have a question about our services, 
            pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
