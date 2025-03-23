"use client";
import { MainTemplate } from "./components/MainTemplate";
import { ContactSection } from "./components/Sections/ContactSection";
import { DownloadSection } from "./components/Sections/DownloadSection";
import { DesktopHomeSection, MobileHomeSection } from "./components/Sections/HomeSection";
import { SolutionsSection } from "./components/Sections/SolutionsSection";

export default function Home() {

  return (
    <div>
      <MainTemplate>
        <DesktopHomeSection className="hidden sm:block"></DesktopHomeSection>
        <MobileHomeSection className="block sm:hidden"></MobileHomeSection>
        <SolutionsSection></SolutionsSection>
        <DownloadSection></DownloadSection>
        <ContactSection></ContactSection>
      </MainTemplate>
    </div>
  );
}
