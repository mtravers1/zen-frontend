"use client"
import { Button, Popper } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
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
        <Button className="!bg-[#d1e242] !text-[#1f6d4f] !rounded-full md:w-[15vw] w-[30vw] !font-black h-[8vw] md:h-[4vw]  !mt-[1vw]  !text-[3vw] md:!text-[1.3vw]" onClick={handleClick}>Get Started</Button>
        <Popper placement='bottom' className="z-1000" id={id} open={open} anchorEl={anchorEl}>
            <div></div>
            <div className="flex mt-[1vw] -ml-[0.5vw]">
                <Link href="https://play.google.com/store/apps/details?id=com.zentavos.mobile" className="h-[8vw] w-[25vw] md:h-[5vw] md:w-[17vw]">
                    <Image className="!relative" src="/Google_Play_Store_badge_EN (1).svg" fill={true} alt="" ></Image>
                </Link>
                <Link href="https://apps.apple.com/us/app/zentavos/id6742329325" className="h-[8vw] w-[25vw] md:h-[5vw] md:w-[17vw]">
                    <Image className="!relative" src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" fill={true} alt="" ></Image>
                </Link>
            </div>
        </Popper>
    </div>)
}

export function DownloadPopper() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        console.log(anchorEl)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (<div>
        <Button className="!bg-[#d1e242]  !text-[#1f6d4f] !rounded-full md:w-[12vw] sm:h-[4vw] sm:w-[15vw] md:h-[3vw] lg:w-[10vw] lg:h-[2.5vw] xl:w-[8vw] xl:h-[2vw] !font-bold   align-middle md:!text-[1.2vw] lg:!text-[1vw] xl:!text-[.7vw]" onClick={handleClick}>Download</Button>
        <Popper placement='bottom' className="z-1000" id={id} open={open} anchorEl={anchorEl}>
            <div></div>
            <div className="flex mt-[1vw] -ml-[0.5vw]">
                <Link href="https://play.google.com/store/apps/details?id=com.zentavos.mobile" className="h-[5vw] w-[17vw]">
                    <Image className="!relative" src="/Google_Play_Store_badge_EN (1).svg" fill={true} alt="" ></Image>
                </Link>
                <Link href="https://apps.apple.com/us/app/zentavos/id6742329325" className="h-[5vw] w-[17vw]">
                    <Image className="!relative" src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" fill={true} alt="" ></Image>
                </Link>
            </div>
        </Popper>
    </div>)
}

export function DownloadPopperSide() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        console.log(anchorEl)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (<div>
        <Button className="!bg-[#d1e242]  !text-[#1f6d4f] !rounded-full md:w-[12vw] sm:h-[4vw] sm:w-[15vw] md:h-[3vw] lg:w-[10vw] lg:h-[2.5vw] xl:w-[8vw] xl:h-[2vw] !font-bold   align-middle md:!text-[1.2vw] lg:!text-[1vw] xl:!text-[.7vw]" onClick={handleClick}>Download</Button>
        <Popper placement='bottom' className="z-1000" id={id} open={open} anchorEl={anchorEl}>
            <div className="flex flex-col mt-[1vw] ml-[0.5vw] gap-[1vw]">
                <Link href="https://play.google.com/store/apps/details?id=com.zentavos.mobile" className="h-[10vw] w-[27.2vw]">
                    <Image className="!relative" src="/Google_Play_Store_badge_EN (1).svg" fill={true} alt="" ></Image>
                </Link>
                <Link href="https://apps.apple.com/us/app/zentavos/id6742329325" className="h-[10vw] w-[27.2vw]">
                    <Image className="!relative" src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" fill={true} alt="" ></Image>
                </Link>
            </div>
        </Popper>
    </div>)
}