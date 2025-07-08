"use client";
import Image from "next/image";
import Link from "next/link";
import { Element } from "react-scroll";

export function HomeSection() {
  return (
    <div className="relative w-full">
      <Element id="home" name="home" className="element">
        {/* Hero Section 1 */}
        <div className="relative aspect-[16/9] w-full justify-center flex flex-col md:flex-row items-center h-full">
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
                <h1 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-2 md:mb-8">
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
        <div className="hero-2 relative w-full min-h-screen py-16 md:py-0">
          <div className="container mx-auto h-full flex items-center px-4">
            <div className="w-full flex flex-col lg:flex-row items-center relative z-10">
              {/* Text Content */}
              <div className="w-full lg:w-1/2 text-center lg:text-right mb-12 lg:mb-0 lg:pr-12">
                <h2 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                  <div className="mb-3 sm:mb-4 md:mb-6">Accounting.</div>
                  <div className="mb-3 sm:mb-4 md:mb-6">Analytics.</div>
                  <div className="mb-3 sm:mb-4 md:mb-6">Advice.</div>
                  <div>Access.</div>
                </h2>
              </div>
            </div>
            {/* Image Content */}
            <div className="w-full h-full">
              {/* Green Background */}
              <div className="image-bg absolute inset-0 rounded-2xl overflow-hidden">
                <Image
                  src="/Zentavos_green_bg.png"
                  alt=""
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Phone Image */}
              <div className="image-fg absolute -top-4 sm:-top-8 -left-4 sm:-left-8 w-full h-full">
                <Image
                  src="/thumbnail_Hero_Phone_screenshot_improved_shadow.png"
                  alt="Zentavos Mobile App"
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Element>
    </div>
  );
}
