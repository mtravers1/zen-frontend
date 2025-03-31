import { headers } from 'next/headers';
import { userAgent } from "next/server";
import { DesktopDownloadSection, MobileDownloadSection } from "./sections/DownloadSection";
import { DesktopHomeSection, MobileHomeSection } from "./sections/HomeSection";
import { DesktopSolutionsSection, MobileSolutionsSection } from "./sections/SolutionsSection";
import { MainTemplate } from "./shared_components/MainTemplate";

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
