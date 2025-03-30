import { NavBarItem } from "./NavBarItem";
export function NavMenu({ closeDrawer }: { closeDrawer: () => void }) {
    const names = ["Home", "Solutions", "Contact", "Download"];
    const routes = ["/", "/", "/contact", "/"];
    const rows = [];
    for (let i = 0; i < names.length; i++) {
        rows.push(<NavBarItem key={2 * i} name={(names[i]).toUpperCase()} closeDrawer={closeDrawer} route={routes[i]} />);
        rows.push(<div key={2 * i + 1} className="border w-full border-gray-200"></div>)
    }
    return (
        <div className="bg-white ">
            <ol className="flex flex-col h-[5vw] items-center justify-end  gap-[4vw] mx-[8vw]">
                {rows}
            </ol>
        </div>);
}