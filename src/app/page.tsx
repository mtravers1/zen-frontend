"use client";
import { MainTemplate } from "./components/MainTemplate";
import { ContactSection } from "./components/Sections/ContactSection";
import { HomeSection } from "./components/Sections/HomeSection";
import { SolutionSection } from "./components/Sections/SolutionSection";

export default function Home() {
  return (
    <div>
      <MainTemplate>
        <HomeSection></HomeSection>
        <SolutionSection></SolutionSection>
        <ContactSection></ContactSection>
      </MainTemplate>
    </div>
  );
}
