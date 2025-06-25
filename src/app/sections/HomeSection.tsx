'use client'
import Image from "next/image";
import Link from "next/link";
import { Element } from "react-scroll";
export function DesktopHomeSection() {
    return (
        <div>
            <Element id="HomeDesktop" name="HOMEDesktop" className="element">
                <div className="mt-[20%] ml-[10%] absolute z-20 text-[4vw]/[4vw] flex gap-[2vw] items-center w-[35vw]">
                    <div>
                        <div className="font-bold text-white ">
                            Your CFO
                        </div>
                        <div className="font-medium text-white ">
                            at the touch
                        </div>
                        <div className="font-medium text-white ">
                            of a button.</div>
                    </div>
                    <div className="flex flex-col gap-[1vw]">
                        <Link href="https://play.google.com/store/apps/details?id=com.zentavos.mobile" className="h-[5vw] w-[17vw]">
                            <Image className="!relative" src="/Google_Play_Store_badge_EN (1).svg" fill={true} alt="Google Play" ></Image>
                        </Link>
                        <Link href="https://apps.apple.com/us/app/zentavos/id6742329325" className="h-[5vw] w-[17vw]">
                            <Image className="!relative" src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" fill={true} alt="App Store" ></Image>
                        </Link>
                    </div>
                </div>
                <Image className="!relative z-10" src="/Hero-Banner-Woman-sky.png" fill={true} alt="" ></Image>
                <div className=" mt-[15%] ml-[20%] absolute z-20">
                    <div className="font-bold text-right text-white my-[-10] text-[3vw]">
                        Accounting.
                    </div>
                    <div className="font-bold text-right text-white my-[-10] text-[3vw]">
                        Analytics.
                    </div>
                    <div className="font-bold text-right text-white my-[-10] text-[3vw]">
                        Advice.</div>
                    <div className="font-bold text-right text-white my-[-10] text-[3vw]">
                        Access.</div>
                </div >
                <div className="h-[40vw] overflow-clip">
                    <div className="h-[50vw]">
                        <Image className="!relative z-10" src="/Zentavos_green_bg.png" fill={true} alt="" ></Image>
                    </div>
                </div>
                <div className="flex h-[70vw] w-[59vw]  -mt-[35vw] ml-[40vw] overflow-clip">
                    <div className=" h-[35vw] w-[80vw] mt-[5vw] z-10">
                        <Image className="!relative  scale-160" src="/thumbnail_Hero_Phone_screenshot_improved_shadow.png" alt="" fill={true}></Image>
                    </div>
                </div>
            </Element>
        </div>
    );
}
export function MobileHomeSection() {

    return (
        <div>
            <Element id="HomeMobile" name="HOMEMobile" className="element">
                <div className="mt-[20%] ml-[10%] absolute z-20 text-[8vw]/[8vw] flex gap-[4vw] items-center w-[70vw]">
                    <div>
                        <div className="font-bold text-white ">
                            Your CFO
                        </div>
                        <div className="font-medium text-white ">
                            at the touch
                        </div>
                        <div className="font-medium text-white ">
                            of a button.</div>
                    </div>
                    <div className="flex flex-col gap-[2vw]">
                        <Link href="https://play.google.com/store/apps/details?id=com.zentavos.mobile" className="h-[8vw] w-[25vw]">
                            <Image className="!relative" src="/Google_Play_Store_badge_EN (1).svg" fill={true} alt="Google Play" ></Image>
                        </Link>
                        <Link href="https://apps.apple.com/us/app/zentavos/id6742329325" className="h-[8vw] w-[25vw]">
                            <Image className="!relative" src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" fill={true} alt="App Store" ></Image>
                        </Link>
                    </div>
                </div>
                <div className=" w-full  h-[70vw] overflow-clip">
                    <div className="w-[90vw] h-[45vw] translate-x-[35vw] translate-y-[10vw]">
                        <Image className="!relative z-10 scale-180" src="/Hero-Banner-Woman-sky.png" fill={true} alt="" ></Image>
                    </div>
                </div>
                <div className=" mt-[17%] ml-[8%] absolute z-20 text-[7vw]/[7vw]">
                    <div className="font-bold text-right text-white ">
                        Accounting.
                    </div>
                    <div className="font-bold text-right text-white ">
                        Analytics.
                    </div>
                    <div className="font-bold text-right text-white ">
                        Advice.</div>
                    <div className="font-bold text-right text-white ">
                        Access.</div>
                </div >
                <div className="w-full  h-[70vw] overflow-clip">
                    <div className="h-[50vw]">
                        <Image className="!relative z-10 scale-180" src="/Zentavos_green_bg.png" fill={true} alt="" ></Image>
                    </div>
                </div>
                <div className="flex h-[80vw] w-[59.5vw]  -mt-[65vw] mb-[40vw] ml-[40vw] overflow-clip">
                    <div className=" h-[35vw] w-[80vw] mt-[5vw] z-10 translate-y-[20vw]">
                        <Image className="!relative  scale-260" src="/thumbnail_Hero_Phone_screenshot_improved_shadow.png" alt="" fill={true}></Image>
                    </div>
                </div>
            </Element>
        </div>
    )
}


