'use client'
import { NavBarItem } from "./NavBarItem";

export function NavBar() {
    const names = ["Home", "Solutions", "Events", "About"];
    const rows = [];
    for (let i = 0; i < names.length; i++) {
        rows.push(<NavBarItem key={i} name={(names[i]).toUpperCase()} />);
    }
    return (
        <div className="bg-white h-[50] content-center">
            <ol className="flex justify-evenly">
                {rows}
            </ol>
        </div>);
}