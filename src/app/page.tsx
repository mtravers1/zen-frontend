import { headers } from 'next/headers';
import { userAgent } from "next/server";
import { MainTemplate } from "./components/MainTemplate";
import { DesktopDownloadSection, MobileDownloadSection } from "./components/Sections/DownloadSection";
import { DesktopHomeSection, MobileHomeSection } from "./components/Sections/HomeSection";
import { DesktopSolutionsSection, MobileSolutionsSection } from "./components/Sections/SolutionsSection";

export default async function Home() {
  const headersList = await headers();
  const { device } = userAgent({ headers: headersList });
  const deviceType = device?.type === "mobile" ? "mobile" : "desktop";
  if (deviceType === "mobile") {
    return (
      <div>
        <MainTemplate>
          <MobileHomeSection ></MobileHomeSection>
          <MobileSolutionsSection ></MobileSolutionsSection>
          <MobileDownloadSection ></MobileDownloadSection>
        </MainTemplate>
      </div>
    );
  }
  else {
    return (
      <div>
        <MainTemplate>
          <DesktopHomeSection ></DesktopHomeSection>
          <DesktopSolutionsSection ></DesktopSolutionsSection>
          <DesktopDownloadSection ></DesktopDownloadSection>
        </MainTemplate>
      </div>
    );
  }
}
