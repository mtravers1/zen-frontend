import Image from "next/image";
import { Element } from "react-scroll";
export function DesktopHomeSection({ className }: { className: string }) {
    return (
        <div className={className}>
            <Element id="HomeDesktop" name="HOMEDesktop" className="element">
                <div className="mt-[20%] ml-[10%] absolute z-20 text-[4vw]/[4vw]">
                    <div className="font-bold text-white ">
                        Your CFO
                    </div>
                    <div className="font-medium text-white ">
                        at the touch
                    </div>
                    <div className="font-medium text-white ">
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
                </div >
                <div className="h-[40vw] overflow-clip">
                    <div className="h-[50vw]">
                        <Image className="!relative z-10" src="/Zentavos_green_bg.png" fill={true} alt="" ></Image>
                    </div>
                </div>
                <div className="flex h-[70vw] w-[59vw]  -mt-[35vw] ml-[40vw] overflow-clip">
                    <div className=" h-[35vw] w-[80vw] mt-[5vw] z-10">
                        <Image className="!relative  scale-160" src="/Hero_Phone_screenshot.png" alt="" fill={true}></Image>
                    </div>
                </div>
            </Element>
        </div>
    );
}
export function MobileHomeSection({ className }: { className: string }) {

    return (
        <div className={className}>
            <Element id="HomeMobile" name="HOMEMobile" className="element">
                <div className="mt-[20%] ml-[10%] absolute z-20 text-[8vw]/[8vw]">
                    <div className="font-bold text-white ">
                        Your CFO
                    </div>
                    <div className="font-medium text-white ">
                        at the touch
                    </div>
                    <div className="font-medium text-white ">
                        of a button.</div>
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
                        <Image className="!relative  scale-260" src="/Hero_Phone_screenshot.png" alt="" fill={true}></Image>
                    </div>
                </div>
            </Element>
        </div>
    )
}


