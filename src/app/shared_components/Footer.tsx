import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <div className="p-[5vw] flex flex-row w-full py-[2vw] bg-gray-400 text-gray-300 gap-[2vh] justify-between items-center">

            <div className="">
                <div className="">© 2025 Zentavos All rights reserved.</div>
                <Image className="responsive" src="/Lobo-Company-logo.png" alt="Lobo Company logo" width={100} height={43} />
            </div>
            <div className="flex flex-col text-right">
                <Link className="hover:text-white " href="/"> Home</Link>
                <Link className="hover:text-white " href="/privacy-policy"> Privacy Policy</Link>
                <Link className="hover:text-white " href="/terms-of-service"> Terms of Service</Link>
                <Link className="hover:text-white " href="/contact-us"> Contact</Link>
            </div>
        </div >

    );
}