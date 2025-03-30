import Image from "next/image";
export function Logo() {
    return (
        <div className="min-h-[48] h-[10vw] w-[35vw]">
            <Image className="!relative object-contain" src="/ZevTemp.PNG" alt="" fill={true} aria-label="Logo"></Image>
        </div>
    );

}