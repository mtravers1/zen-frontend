import Image from "next/image";

export function Icon({ label, source }: { label: string; source: string; }) {
    return (
        <Image className="!relative" fill={true} aria-label={label} src={source} alt=""></Image>
    );
}
