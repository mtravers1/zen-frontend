import Image from "next/image";
export function Logo() {
	return (
		<div className="min-h-[48] h-[10vw] w-[35vw] relative">
			<Image className="!relative object-contain" src="/ZevTemp.PNG" alt="Logo" fill={true} sizes="35vw"></Image>
		</div>
	);

}