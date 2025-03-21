import { IconBar } from "./IconBar";

export function Trapezoid() {
    return (
        <div className="flex">
            <div className="border-0 clip-trapezoid bg-[#006847] min-h-[24] h-[5vw] w-[10vw] " >
            </div>
            <div className="ml-[-1] border-0 bg-[#006847] min-h-[24] h-[5vw] w-full" ></div>
            <div className="flex  items-center absolute right-0 h-[5vw] pr-[6vw]">
                <div className="text-[2vw] md:text-[1vw] text-white content-center w-[10vw] md:w-[5vw] ">
                    Follow Us:
                </div>
                <div className="pb-[0.1vw] md:w-[4vw] w-[10vw]">
                    <IconBar></IconBar>
                </div>


            </div>
        </div>
    )
}