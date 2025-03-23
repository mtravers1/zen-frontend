"use client"
import { Button, Popper } from "@mui/material";
import Image from "next/image";
import React from "react";
export function SimplePopper() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        console.log(anchorEl)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (<div>
        <Button className="!bg-[#d1e242] !text-[#1f6d4f] w-[10vw] !rounded-none !font-black h-[3vw]  !mt-[1vw] !text-[1vw]" onClick={handleClick}>Get Started</Button>
        <Popper placement='bottom' className="z-1000" id={id} open={open} anchorEl={anchorEl}>
            <div></div>
            <div className="flex mt-[1vw] -ml-[0.5vw]">
                <div className="h-[5vw] w-[17vw]">
                    <Image className="!relative" src="/Google_Play_Store_badge_EN (1).svg" fill={true} alt="" ></Image>
                </div>
                <div className="h-[5vw] w-[17vw]">
                    <Image className="!relative" src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" fill={true} alt="" ></Image>
                </div>
            </div>
        </Popper>
    </div>)
}