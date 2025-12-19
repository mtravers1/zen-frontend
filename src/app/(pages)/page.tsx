import { headers } from "next/headers";
import { userAgent } from "next/server";
import {
	DesktopDownloadSection,
	MobileDownloadSection,
} from "@/app/sections/DownloadSection";
import { HomeSection } from "@/app/sections/HomeSection";
import { SolutionsSection } from "@/app/sections/SolutionsSection";
import { MainTemplate } from "@/app/shared_components/MainTemplate";

export default async function Home() {
	const headersList = await headers();
	const { device } = userAgent({ headers: headersList });
	const deviceType = device?.type === "mobile" ? "mobile" : "desktop";
	if (deviceType === "mobile") {
		return (
			<div>
				<MainTemplate>
					<HomeSection></HomeSection>
					<SolutionsSection></SolutionsSection>
					<MobileDownloadSection></MobileDownloadSection>
				</MainTemplate>
			</div>
		);
	} else {
		return (
			<div>
				<MainTemplate>
					<HomeSection />
					<SolutionsSection />
					<DesktopDownloadSection />
				</MainTemplate>
			</div>
		);
	}
}
