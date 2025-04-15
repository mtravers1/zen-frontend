import { headers } from 'next/headers';
import { userAgent } from "next/server";
import { DesktopDownloadSection, MobileDownloadSection } from "../sections/DownloadSection";
import { DesktopHomeSection, MobileHomeSection } from "../sections/HomeSection";
import { SolutionsSection } from "../sections/SolutionsSection";
import { MainTemplate } from "../shared_components/MainTemplate";

export default async function Home() {
  const headersList = await headers();
  const { device } = userAgent({ headers: headersList });
  const deviceType = device?.type === "mobile" ? "mobile" : "desktop";
  if (deviceType === "mobile") {
    return (
      <div>
        <MainTemplate>
          <MobileHomeSection ></MobileHomeSection>
          <SolutionsSection ></SolutionsSection>
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
          <SolutionsSection ></SolutionsSection>
          <DesktopDownloadSection ></DesktopDownloadSection>
        </MainTemplate>
      </div>
    );
  }
}
