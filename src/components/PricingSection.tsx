import cityImage from "@/assets/city-night.jpg";
import phonePricing from "@/assets/phone-screen-center.png";

const PricingSection = () => {
  return (
    <section className="relative py-16 lg:py-24 overflow-visible min-h-[500px]">
      {/* Full-bleed Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={cityImage}
          alt="City at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          {/* Phone Mockup - Left Side */}
          <div className="relative flex flex-col items-center lg:items-start">
            <img
              src={phonePricing}
              alt="Zentavos App"
              className="relative w-64 md:w-80 lg:w-96 lg:translate-y-16"
              style={{
                filter: "drop-shadow(0 50px 50px rgba(0, 0, 0, 0.5))"
              }}
            />
          </div>

          {/* Pricing Circle - Right Side */}
          <div className="relative">
            <div className="pricing-circle w-72 h-72 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] rounded-full bg-primary flex flex-col items-center justify-center text-center shadow-2xl">
              {/* Price */}
              <div className="text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground">
                $14.99
              </div>
              <p className="text-xl md:text-2xl text-primary-foreground/80 font-medium mt-1">
                a Month
              </p>

              {/* App Store Badges */}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="#"
                  className="transform hover:scale-105 transition-transform duration-300 inline-block"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-12 md:h-14"
                  />
                </a>
                <a
                  href="#"
                  className="transform hover:scale-105 transition-transform duration-300 inline-block"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on the App Store"
                    className="h-12 md:h-14"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
