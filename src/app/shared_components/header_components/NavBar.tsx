import Image from "next/image";
import Link from "next/link";
import { NavBarItem } from "./NavBarItem";
import { AuthButton } from "./AuthButton";

export function NavBar() {
	const names = ["Home", "Solutions", "Inquiry", "Contact", "Dashboard"];
	const routes = ["/", "/solutions", "/inquiry", "/contact-us", "/dashboard"];
	const rows = [];
	for (let i = 0; i < names.length; i++) {
		rows.push(<NavBarItem key={i} name={(names[i]).toUpperCase()} route={routes[i]} />);
	}

	return (
		<div className="bg-white ">
			<ol className="flex min-h-[24]  h-[5vw] items-center justify-end  gap-[4vw] mr-[4vw]">
				{rows}
				<li>
					<AuthButton />
				</li>
				<li className="flex gap-[1vw]">
					<Link href="https://play.google.com/store/apps/details?id=com.zentavos.mobile" className="h-[3vw] w-[10vw]">
						<Image className="!relative" src="/Google_Play_Store_badge_EN (1).svg" fill={true} alt="Google Play" ></Image>
					</Link>
					<Link href="https://apps.apple.com/us/app/zentavos/id6742329325" className="h-[3vw] w-[10vw]">
						<Image className="!relative" src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" fill={true} alt="App Store" ></Image>
					</Link>
				</li>
			</ol>
		</div>
	);
}
