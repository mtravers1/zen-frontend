import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { scroller } from "react-scroll";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function MainTemplate({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const searchParams = useSearchParams()

    const searchId = searchParams.get('Section')
    const elHeight = document.getElementById('Header')?.clientHeight

    useEffect(() => {
        scroller.scrollTo(searchId ?? "", {
            duration: 500,
            smooth: true,
            offset: (elHeight ?? 0) * -1
        });
    }, [elHeight, searchId]);

    return (
        <div>
            <div className="sticky top-0 z-100">
                <Header></Header>
            </div>
            {children}
            <Footer></Footer>
        </div>
    )
}