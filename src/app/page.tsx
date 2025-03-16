import { Banner } from "./components/Banner";
import { HomeSection } from "./components/Sections/HomeSection";

export default function Home() {
  return (
    //  <IconButton source = "icons8-facebook.svg" link= "www.facebook.com" label="facebook"/>
    //  <Trapezoid></Trapezoid>
    //  <NavBar></NavBar>
    <div>
      <div className="sticky top-0 z-100">
        <Banner></Banner>
      </div>
      <HomeSection></HomeSection>
    </div>
  );
}
