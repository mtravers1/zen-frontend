import Image from "next/image";
import { Element } from "react-scroll";
export function HomeSection() {
    return (
        <Element id="Home" name="HOME" className="element">
            <div className="mt-[20%] ml-[10%] absolute z-20">
                <div className="font-bold text-white my-[-10] text-[4vw]">
                    Your CFO
                </div>
                <div className="font-medium text-white my-[-10] text-[4vw]">
                    at the touch
                </div>
                <div className="font-medium text-white my-[-10] text-[4vw]">
                    of a button.</div>
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
            </div>
            <Image className="!relative z-10" src="/Zevbackground.png" fill={true} alt="" ></Image>
            <div className="flex h-[70vw] w-[59.1vw]  -mt-[35vw] ml-[40vw] overflow-clip">
                <div className=" h-[50vw] w-[80vw] z-10">
                    <Image className="!relative  scale-120" src="/Hero_Phone_screenshot.png" alt="" fill={true}></Image>
                </div>
            </div>
        </Element>
    );
}