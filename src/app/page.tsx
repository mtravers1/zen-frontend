"use client";
import { MainTemplate } from "./components/MainTemplate";
import { HomeSection } from "./components/Sections/HomeSection";

export default function Home() {
  return (
    //  <IconButton source = "icons8-facebook.svg" link= "www.facebook.com" label="facebook"/>
    //  <Trapezoid></Trapezoid>
    //  <NavBar></NavBar>
    <div>
      <MainTemplate>
        <HomeSection></HomeSection>
      </MainTemplate>
    </div>
  );
}
