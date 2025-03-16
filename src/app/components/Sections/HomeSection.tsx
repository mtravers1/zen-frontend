import Image from "next/image";
export function HomeSection() {
    return (
        <div className="max-h-[1000]">
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

        </div>
    );
}