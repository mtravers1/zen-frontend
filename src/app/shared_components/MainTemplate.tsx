'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { scroller } from "react-scroll";
import { Footer } from "./Footer";
import { DesktopHeader, MobileHeader } from "./header_components/Header";

export function MainTemplate({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const searchParams = useSearchParams()

    const searchId = searchParams.get('Section')
    const elHeight = useRef(0);
    const isMobile = useRef(false);

    useEffect(() => {
        elHeight.current = document.getElementById(`Header${isMobile.current ? 'Mobile' : 'Desktop'}`)?.clientHeight ?? 0
        isMobile.current = window.innerWidth <= 768;
    }, [])

    const getOffset = () => {
        return elHeight.current * -1;
    };

    useEffect(() => {
        setTimeout(() => {
            scroller.scrollTo(searchId ? `${searchId}${isMobile.current ? 'Mobile' : 'Desktop'}` : "", {
                duration: 500,
                smooth: true,
                offset: getOffset()
            })
        }, 500)
    }, [searchId]);

    return (
        <div>
            <div className="sticky top-0 z-100">
                <DesktopHeader className="hidden sm:block" />
                <MobileHeader className="block sm:hidden" />
            </div>
            {children}
            <Footer></Footer>
        </div>
    )
}