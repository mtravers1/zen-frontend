import Image from "next/image";
import { Element } from "react-scroll";
export function SolutionSection() {
    return (
        <Element id="Solution" name="SOLUTIONS" className="element">
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
        </Element>
    );
}