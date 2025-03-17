import { Footer } from "./Footer";
import { Header } from "./Header";

export function MainTemplate({ children }: Readonly<{
    children: React.ReactNode;
}>) {
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