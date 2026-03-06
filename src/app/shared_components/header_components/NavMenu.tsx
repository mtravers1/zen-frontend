import Image from "next/image";
import Link from "next/link";
import { NavBarItem } from "./NavBarItem";
import { AuthButton } from "./AuthButton";

export function NavMenu({ closeDrawer }: { closeDrawer: () => void }) {
	const names = ["Home", "Solutions", "Inquiry", "Contact", "Dashboard"];
	const routes = ["/", "/solutions", "/inquiry", "/contact-us", "/dashboard"];
	const rows = [];
	for (let i = 0; i < names.length; i++) {
		rows.push(<NavBarItem key={2 * i} name={(names[i]).toUpperCase()} closeDrawer={closeDrawer} route={routes[i]} />);
		rows.push(<div key={2 * i + 1} className="border w-full border-gray-200"></div>)
	}

	return (
		<div className="bg-white ">
			<ol className="flex flex-col h-[5vw] items-center justify-end  gap-[4vw] mx-[8vw]">
				{rows}
				<li className="mt-[4vw]">
					<AuthButton />
				</li>
				<div className="flex flex-col items-center gap-[4vw] mb-[4vw]">
				<Link href="https://play.google.com/store/apps/details?id=com.zentavos.mobile" className="h-[10vw] w-[27vw] relative block">
					<Image className="!relative" src="/Google_Play_Store_badge_EN (1).svg" fill={true} alt="Google Play" sizes="27vw"></Image>
				</Link>
				<Link href="https://apps.apple.com/us/app/zentavos/id6742329325" className="h-[10vw] w-[27vw] relative block">
					<Image className="!relative" src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" fill={true} alt="App Store" sizes="27vw"></Image>
					</Link>
				</div>
			</ol>
		</div>);
}
