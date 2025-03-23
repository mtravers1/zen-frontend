import { IconBar } from "./IconBar";

export function Trapezoid() {
    return (
        <div className="flex items-center">
            <div className="border-0 clip-trapezoid bg-[#006847]  h-[10vw] sm:h-[5vw] w-[10vw] " >
            </div>
            <div className="ml-[-1] border-0 bg-[#006847]  h-[10vw] sm:h-[5vw] w-full" ></div>
            <div className="flex  items-center absolute right-0 h-[5vw] pr-[6vw] gap-[5vw] ">
                <div className="text-[4vw] sm:text-[1vw] text-white">
                    Follow Us:
                </div>
                <div className="pb-[0.1vw] w-[20vw] sm:w-[10vw] md:w-[5vw]">
                    <IconBar></IconBar>
                </div>


            </div>
        </div>
    )
}