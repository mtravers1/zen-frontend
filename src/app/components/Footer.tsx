import Link from "next/link";

export function Footer() {
    return (
        <div className="p-[5vw] flex flex-col justify-center py-[2vw] bg-gray-400  text-center  w-full text-gray-300 gap-[2vh] z-150">

            <div className="self-center"> © 2025 Zentavos All rights reserved.</div>
            <div className="flex flex-row  gap-[2vw] self-center">
                <Link className="hover:text-white " href="/"> Home</Link>
                <Link className="hover:text-white " href="/privacy"> Privacy Policy</Link>
                <Link className="hover:text-white " href="/terms"> Terms and Conditions</Link>
                <Link className="hover:text-white " href="/contact"> Contact</Link>
            </div>
        </div >

    );
}