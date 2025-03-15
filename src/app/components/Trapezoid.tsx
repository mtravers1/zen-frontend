import { IconBar } from "./IconBar";

export function Trapezoid() {
    return (
        <div className="flex">
            <div className="border-0 clip-trapezoid bg-[#006847] h-[50] w-[100] " >
            </div>
            <div className="ml-[-1] border-0 bg-[#006847] h-[50] w-full" ></div>
            <div className="flex  items-center absolute right-0 pr-10">
                <div className="text-sm text-white content-center h-[50] w-[80] ">
                    Follow Us:
                </div>
                <div className="h-5 w-15">
                    <IconBar></IconBar>
                </div>


            </div>
        </div>
    )
}