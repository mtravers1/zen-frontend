'use client'
import Image from "next/image";
import { MdPhoneAndroid } from "react-icons/md";
import { Element } from "react-scroll";
import Link from "next/link";

export function DesktopDownloadSection() {
    return (
        <div>
            <Element id="DownloadDesktop" name="DOWNLOADDesktop" className="flex flex-col element ">
                <div className="text-center font-bold text-[4vw] text-[#1f6d4f] my-[5vw]">
                    Mobile App
                </div>
                <div className="w-full mb-[20vw]">
                    <Image className="!relative z-10" src="/vecteezy_traffic-by-night_52317212.jpg" fill={true} alt="" ></Image>
                </div>
                <div className="absolute flex">
                    <div className=" w-[80vw] h-[37.1vw] -ml-[10vw] mt-[25vw]">
                        <Image className="!relative z-15   scale-150" src="/Phone_Screen_center.png" fill={true} alt="" ></Image>
                    </div>
                    <div className=" flex flex-col absolute z-20 md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw]  md:ml-[55vw] md:mt-[25vw] ml-[45vw] mt-[25vw] bg-[#1f6d4f] rounded-full items-center">
                        <MdPhoneAndroid className="md:mt-[4vw] mt-[10vw] text-[7vw] text-[#d1e242]" />
                        <div className="text-white text-[4vw] font-bold">
                            $14.99
                        </div>
                        <div className="text-white text-[2vw] -mt-[1vw]">
                            a Month
                        </div>
                        <div className="flex flex-col items-center mt-[1vw] gap-[1vw]">
                            <Link href="https://play.google.com/store/apps/details?id=com.zentavos.mobile" className="h-[5vw] w-[17vw]">
                                <Image className="!relative" src="/Google_Play_Store_badge_EN (1).svg" fill={true} alt="Google Play" ></Image>
                            </Link>
                            <Link href="https://apps.apple.com/us/app/zentavos/id6742329325" className="h-[5vw] w-[17vw]">
                                <Image className="!relative" src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" fill={true} alt="App Store" ></Image>
                            </Link>
                        </div>
                    </div>
                </div>
            </Element>
        </div>
    )
}

export function MobileDownloadSection() {
    return (
        <div>
            <Element id="DownloadMobile" name="DOWNLOADMobile" className="flex flex-col element ">
                <div className="text-center font-bold text-[8vw] text-[#1f6d4f] my-[10vw]">
                    Mobile App
                </div>
                <div className="w-full mb-[20vw]">
                    <Image className="!relative z-10" src="/vecteezy_traffic-by-night_52317212.jpg" fill={true} alt="" ></Image>
                </div>
                <div className="absolute flex">
                    <div className=" w-[80vw] h-[37.1vw] -ml-[15vw] mt-[35vw]">
                        <Image className="!relative z-15   scale-150" src="/Phone_Screen_center.png" fill={true} alt="" ></Image>
                    </div>
                    <div className=" flex flex-col absolute z-20 w-[50vw] h-[50vw] ml-[45vw] mt-[32vw] bg-[#1f6d4f] rounded-full items-center">
                        <MdPhoneAndroid className="mt-[6vw] text-[8vw] text-[#d1e242]" />
                        <div className="mt-[3vw] text-white text-[4vw] font-bold">
                            $14.99
                        </div>
                        <div className="text-white text-[4vw] -mt-[2vw]">
                            a Month
                        </div>
                        <div className="flex flex-col items-center mt-[2vw] gap-[2vw]">
                            <Link href="https://play.google.com/store/apps/details?id=com.zentavos.mobile" className="h-[8vw] w-[25vw]">
                                <Image className="!relative" src="/Google_Play_Store_badge_EN (1).svg" fill={true} alt="Google Play" ></Image>
                            </Link>
                            <Link href="https://apps.apple.com/us/app/zentavos/id6742329325" className="h-[8vw] w-[25vw]">
                                <Image className="!relative" src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" fill={true} alt="App Store" ></Image>
                            </Link>
                        </div>
                    </div>
                </div>
            </Element>
        </div>
    )
}