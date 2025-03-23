'use client'

import { Button, Drawer } from "@mui/material";
import React from "react";
import { isMobile } from "react-device-detect";
import { GrMenu } from "react-icons/gr";
import { Logo } from "./Logo";
import { NavBar } from "./NavBar";
import { NavMenu } from "./NavMenu";
import { Trapezoid } from "./Trapezoid";


export function Header() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    let content;
    if (!isMobile) {
        content = <div id="Header" className="bg-white flex">
            <Logo></Logo>
            <div className="flex-auto">
                <Trapezoid></Trapezoid>
                <NavBar></NavBar>
            </div>
        </div>
    }
    else {
        content = <div id="Header" className="bg-white flex flex-col">
            <div className="flex flex-row">
                <Logo></Logo>
                <div className="grow">
                    <Trapezoid></Trapezoid>
                </div>
            </div>
            <div className="right-0">
                <Button
                    className="!text-[#006847] !font-aoenik !h-[10vw] !ml-[2vh] !text-[4vw] !right-0"
                    aria-label="open drawer"
                    onClick={toggleDrawer(!open)}
                    startIcon={<GrMenu className="!h-[10vw]" />}
                >
                    Menu
                </Button>
                <Drawer className="!z-50" open={open} onClose={toggleDrawer(false)}>
                    <div className="mt-[80vw]">
                        <NavMenu closeDrawer={toggleDrawer(false)}></NavMenu>
                    </div>
                </Drawer>
            </div>
        </div >
    }
    return (content)


}
