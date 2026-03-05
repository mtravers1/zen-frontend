import heroWoman from "@/assets/hero-woman.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center overflow-hidden hero-light-blue">
      {/* Decorative Zentavos "Z" outline circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full border-2 border-primary/20" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full border-2 border-primary/15" />
        <div className="absolute top-[40%] left-[38%] w-[300px] h-[300px] rounded-full border-2 border-primary/10" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 animate-slide-up text-foreground">
              Keep more<br />of your<br />money™
            </h1>
          </div>

          {/* Center - Hero Woman Image */}
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <img
                src={heroWoman}
                alt="Woman using Zentavos app"
                className="relative w-full max-w-md lg:max-w-lg object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Right - App Store Badges */}
          <div className="flex flex-col items-center lg:items-end gap-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-12 lg:h-14"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Download on the App Store"
                className="h-12 lg:h-14"
              />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
