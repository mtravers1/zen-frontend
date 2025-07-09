"use client";
import Image from "next/image";
import Link from "next/link";
import { Element } from "react-scroll";

export function HomeSection() {
  return (
    <div className="relative w-full">
      <Element id="home" name="home" className="element">
        {/* Hero Section 1 */}
        <div className="hero-1 relative aspect-[16/9] w-full justify-center flex flex-col md:flex-row items-center h-full max-h-[80vh]">
          {/* Background Image for Hero Section 1 */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/Hero-Banner-Woman-sky.png"
              alt=""
              fill
              className="object-cover object-[0%] md:object-center"
              priority
            />
          </div>

          <div className="ps-[6vw] pe-[2vw] relative mx-auto justify-center flex flex-col md:flex-row items-center w-full">
            {/* Left Side - Text Content */}
            <div className="relative z-10 w-full md:w-1/2 flex justify-start items-center p-4 md:p-8 pb-0">
              <div className="max-w-2xl flex flex-col items-start text-left">
                <h1 className="font-bold text-white text-[4vmin] sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-2 md:mb-8">
                  <span className="block">Your CFO</span>
                  <span className="block">at the touch</span>
                  <span className="block">of a button.</span>
                </h1>
              </div>
            </div>

            {/* Right Side - App Store Buttons */}
            <div className="relative z-10 w-full md:w-1/2 flex justify-start md:justify-end items-center p-4 md:p-8">
              <div className="flex flex-col gap-2 w-full max-w-[250px]">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.zentavos.mobile"
                  className="relative hover:opacity-90 transition-opacity h-8 md:h-12 lg:h-16 w-28 md:w-[250px]"
                >
                  <Image
                    src="/Google_Play_Store_badge_EN (1).svg"
                    alt="Get on Google Play"
                    fill
                    className="object-contain w-fit"
                  />
                </Link>

                <Link
                  href="https://apps.apple.com/us/app/zentavos/id6742329325"
                  className="relative hover:opacity-90 transition-opacity h-10 md:h-14 lg:h-18 w-28 md:w-[250px]"
                >
                  <Image
                    src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
                    alt="Download on the App Store"
                    fill
                    className="object-contain"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section 2 */}
        <div className="hero-2 relative w-full aspect-[16/9] flex items-center justify-center  mb-[6vh] md:mb-[10vh] lg:mb-[16vh] 2xl:mb-[20vh] ps-[6vw] pe-[2vw] max-h-[80vh]">
          <div className="w-full flex flex-col items-center relative z-10">
            {/* Text Content */}
            <h2 className="font-bold text-white text-[4vmin] sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl leading-tight mb-2 md:mb-8 text-left">
              <div>Accounting.</div>
              <div>Analytics.</div>
              <div>Advice.</div>
              <div>Access.</div>
            </h2>
          </div>
          {/* Green Background */}
          <div className="image-bg absolute inset-0 overflow-hidden h-[90%]">
            <Image
              src="/Zentavos_green_bg.png"
              alt=""
              fill
              className="object-cover object-center blur-[3px]"
            />
          </div>

          {/* Image Content */}
          <div className="w-full h-full relative max-w-[70vh] max-h-[70vh]">
            {/* Phone Image */}
            <div className="image-fg absolute w-full h-full ">
              <Image
                src="/thumbnail_Hero_Phone_screenshot_improved_shadow.png"
                alt="Zentavos Mobile App"
                fill
                className="object-contain mt-6 md:mt-16 scale-220"
                priority
              />
            </div>
          </div>
        </div>
      </Element>
    </div>
  );
}
