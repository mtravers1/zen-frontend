'use client'
import Image from "next/image";
import Link from "next/link";
import { Element } from "react-scroll";

export function HomeSection() {
    return (
        <div className="relative w-full">
            <Element id="home" name="home" className="element">
                {/* Hero Section 1 */}
                <div className="hero-1 relative w-full md:h-screen">
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full md:h-full">
                        <Image
                            src="/Hero-Banner-Woman-sky.png"
                            alt=""
                            fill
                            className="object-cover object-[20%] md:object-center"
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div className="container mx-auto h-full flex justify-start items-center">
                        <div className="md:w-full max-w-2xl flex flex-col items-center md:items-start text-left z-10">
                            {/* Text Content */}
                            <h1 className="font-bold text-white text-xl sm:text-5xl md:text-6xl leading-tight mb-6 md:mb-8">
                                <span className="block">Your CFO</span>
                                <span className="block">at the touch</span>
                                <span className="block">of a button.</span>
                            </h1>
                            <div className="app-store-buttons flex flex-col gap-2 w-full justify-center justify-self-start md:justify-self-end">
                                <Link href="https://play.google.com/store/apps/details?id=com.zentavos.mobile"
                                    className="relative hover:opacity-90 transition-opacity">
                                    <Image
                                        src="/Google_Play_Store_badge_EN (1).svg"
                                        alt="Get on Google Play"
                                        fill
                                        className="object-contain"
                                    />
                                </Link>
                                <Link href="https://apps.apple.com/us/app/zentavos/id6742329325"
                                    className="relative hover:opacity-90 transition-opacity">
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
