import { Logo } from "./Logo";
import { NavBar } from "./NavBar";
import { Trapezoid } from "./Trapezoid";

export function Header() {
    // const [open, setOpen] = React.useState(false);
    // const toggleDrawer = (newOpen: boolean) => () => {
    //     setOpen(newOpen);
    // };

    return (
        <div id="Header" className="bg-white flex">
            <Logo></Logo>
            <div className="flex-auto">
                <Trapezoid></Trapezoid>
                <NavBar></NavBar>
            </div>
        </div>

        // <div id="Header" className="bg-white flex">
        //     <Logo></Logo>
        //     <div className="flex-auto">
        //         <Trapezoid></Trapezoid>
        //         <div className="right-0">
        //             <Button
        //                 className="!text-[#006847] !font-aoenik !h-[10vw] !ml-[2vh] !text-[4vw] !right-0"
        //                 aria-label="open drawer"
        //                 onClick={toggleDrawer(true)}
        //                 startIcon={<MenuIcon className="!h-[10vw]" />}
        //             >
        //                 Menu
        //             </Button>
        //             <Drawer className="!z-50" open={open} onClose={toggleDrawer(false)}>
        //                 {<div className="flex flex-col">
        //                     <div>Hello</div>
        //                     <div>Hello</div>
        //                     <div>Hello</div>

        //                 </div>}
        //             </Drawer>
        //         </div>
        //     </div >
        // </div >
    );



}