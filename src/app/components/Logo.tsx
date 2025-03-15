import Image from "next/image";
export function Logo() {
    return (
        <div className="h-[100] w-[300]">
            <Image className="!relative object-contain" src="/ZevTemp.PNG" alt="" fill={true} aria-label="Logo"></Image>
        </div>

    );

}