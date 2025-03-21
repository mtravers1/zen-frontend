import Link from "next/link";

export function Footer() {
    return (
        <div className="flex justify-center py-[2vw] bg-gray-400  text-center  w-full text-gray-300 gap-[4vh] z-150">

            <div> © 2025 Zentavos All rights reserved.</div>
            <Link className="hover:text-white " href="/privacy"> Privacy Policy</Link>
            <Link className="hover:text-white " href="/terms"> Terms and Conditions</Link>
        </div >

    );
}