import Image from "next/image";
import { MdPhoneAndroid } from "react-icons/md";
import { Element } from "react-scroll";
import { SimplePopper } from "../Popper";
export function DownloadSection() {
    return (
        <Element id="Download" name="DOWNLOAD" className="flex flex-col element ">
            <div className="text-center font-bold text-[4vw] text-[#1f6d4f] my-[5vw]">
                Mobile App
            </div>
            <div className="w-full ">
                <Image className="!relative z-10" src="/vecteezy_traffic-by-night_52317212.jpg" fill={true} alt="" ></Image>
            </div>
            <div className="absolute flex">
                <div className=" w-[80vw] h-[50vw] -ml-[10vw] mt-[25vw]">
                    <Image className="!relative z-15   scale-150" src="/Phone_Screen_center.png" fill={true} alt="" ></Image>
                </div>
                <div className=" flex flex-col absolute z-20 w-[35vw] h-[35vw] ml-[55vw] mt-[25vw] bg-[#1f6d4f] rounded-full items-center">
                    <MdPhoneAndroid className="mt-[4vw] text-[7vw] text-[#d1e242]" />
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
    )
}