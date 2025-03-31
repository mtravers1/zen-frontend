'use client'
import Image from "next/image";
import { MdPhoneAndroid } from "react-icons/md";
import { Element } from "react-scroll";
import { SimplePopper } from "../shared_components/Popper";

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
                    <div className=" w-[80vw] h-[50vw] -ml-[10vw] mt-[25vw]">
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
                        <SimplePopper />
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
                    <div className=" w-[80vw] h-[50vw] -ml-[15vw] mt-[35vw]">
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
                        <SimplePopper />
                    </div>
                </div>
            </Element>
        </div>
    )
}