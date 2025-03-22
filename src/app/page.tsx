"use client";
import { MainTemplate } from "./components/MainTemplate";
import { ContactSection } from "./components/Sections/ContactSection";
import { DownloadSection } from "./components/Sections/DownloadSection";
import { HomeSection } from "./components/Sections/HomeSection";
import { SolutionsSection } from "./components/Sections/SolutionsSection";

export default function Home() {
  return (
    <div>
      <MainTemplate>
        <HomeSection></HomeSection>
        <SolutionsSection></SolutionsSection>
        <DownloadSection></DownloadSection>
        <ContactSection></ContactSection>
      </MainTemplate>
    </div>
  );
}
