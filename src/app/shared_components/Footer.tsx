import Link from "next/link";
import Image from "next/image";
import { NewsletterSignup } from "./NewsletterSignup";

export function Footer() {
	return (
		<div className="p-[5vw] flex flex-col w-full bg-primary text-gray-300 gap-[2vh]">

			{/* Newsletter */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-600 pb-[2vh]">
				<NewsletterSignup />
			</div>

			{/* Bottom row */}
			<div className="flex flex-row py-[2vw] justify-between items-center gap-[2vh]">
				<div className="">
					<div className="">© 2025 Zentavos All rights reserved.</div>
					<Image className="responsive" src="/Lobo-Company-logo.png" alt="Lobo Company logo" width={100} height={43} />
				</div>
				<div className="flex flex-col text-right">
					<Link className="hover:text-white " href="/"> Home</Link>
					<Link className="hover:text-white " href="/inquiry"> Inquiry</Link>
					<Link className="hover:text-white " href="/privacy-policy"> Privacy Policy</Link>
					<Link className="hover:text-white " href="/terms-of-service"> Terms of Service</Link>
					<Link className="hover:text-white " href="/contact-us"> Contact</Link>
				</div>
			</div>
		</div>
	);
}
