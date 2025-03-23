'use client';
import dynamic from 'next/dynamic';
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { scroller } from "react-scroll";
import { Footer } from "./Footer";

const DynamicHeader = dynamic(() =>
    import('../components/Header').then((mod) => mod.Header), {
    ssr: false,
})

export function MainTemplate({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const searchParams = useSearchParams()

    const searchId = searchParams.get('Section')
    const elHeight = useRef(0);
    useEffect(() => {
        elHeight.current = document.getElementById('Header')?.clientHeight ?? 0
    }, [])
    const getOffset = () => {
        return elHeight.current * -1;

    };
    useEffect(() => {
        setTimeout(() => {
            scroller.scrollTo(searchId ?? "", {
                duration: 500,
                smooth: true,
                offset: getOffset()
            })

        }, 500
        )

    }, [searchId]);

    return (
        <div>
            <div className="sticky top-0 z-100">
                <DynamicHeader></DynamicHeader>
            </div>
            {children}
            <Footer></Footer>
        </div>
    )
}