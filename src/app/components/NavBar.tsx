import { NavBarItem } from "./NavBarItem";
export function NavBar() {
    const names = ["Home", "Solutions", "Contact", "Download"];
    const rows = [];
    for (let i = 0; i < names.length; i++) {
        rows.push(<NavBarItem key={i} name={(names[i]).toUpperCase()} />);
    }
    return (
        <div className="bg-white ">
            <ol className="flex min-h-[24]  h-[5vw] items-center justify-end  gap-[4vw] mr-[4vw]">
                {rows}
            </ol>
        </div>);
}