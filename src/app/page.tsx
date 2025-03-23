"use client";
import { MainTemplate } from "./components/MainTemplate";
import { DesktopContactSection, MobileContactSection } from "./components/Sections/ContactSection";
import { DesktopDownloadSection, MobileDownloadSection } from "./components/Sections/DownloadSection";
import { DesktopHomeSection, MobileHomeSection } from "./components/Sections/HomeSection";
import { DesktopSolutionsSection, MobileSolutionsSection } from "./components/Sections/SolutionsSection";

export default function Home() {

  return (
    <div>
      <MainTemplate>
        <DesktopHomeSection className="hidden sm:block"></DesktopHomeSection>
        <DesktopSolutionsSection className="hidden sm:block"></DesktopSolutionsSection>
        <DesktopDownloadSection className="hidden sm:block"></DesktopDownloadSection>
        <DesktopContactSection className="hidden sm:block"></DesktopContactSection>
        <MobileHomeSection className="block sm:hidden"></MobileHomeSection>
        <MobileSolutionsSection className="block sm:hidden"></MobileSolutionsSection>
        <MobileDownloadSection className="block sm:hidden"></MobileDownloadSection>
        <MobileContactSection className="block sm:hidden"></MobileContactSection>
      </MainTemplate>
    </div>
  );
}
