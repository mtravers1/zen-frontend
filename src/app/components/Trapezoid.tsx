import { IconBar } from "./IconBar";

export function Trapezoid() {
    return (
        <div className="flex">
            <div className="border-0 clip-trapezoid bg-[#006847] min-h-[24] h-[4vw] w-[8vw] " >
            </div>
            <div className="ml-[-1] border-0 bg-[#006847] min-h-[24] h-[4vw] w-full" ></div>
            <div className="flex  items-center absolute right-0 h-[4vw] pr-[6vw]">
                <div className="text-[1vw] text-white content-center  w-[5vw] ">
                    Follow Us:
                </div>
                <div className="pb-[0.1vw] w-[4vw] ">
                    <IconBar></IconBar>
                </div>


            </div>
        </div>
    )
}