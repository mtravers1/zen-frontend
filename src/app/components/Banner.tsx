import { Logo } from "./Logo";
import { NavBar } from "./NavBar";
import { Trapezoid } from "./Trapezoid";

export function Banner() {
    return (
        <div className="bg-white flex">
            <Logo></Logo>
            <div className="flex-auto">
                <Trapezoid></Trapezoid>
                <NavBar></NavBar>
            </div>
        </div>);
}