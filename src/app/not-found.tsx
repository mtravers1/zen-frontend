import { MainTemplate } from "./shared_components/MainTemplate";
import { Button } from "@mui/material";
import { Suspense } from "react";

export default function NotFound() {
	return (
		<Suspense fallback={null}>
			<MainTemplate>
				<div className="w-full">
					<div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center sm:py-24">
						<div className="w-full">
							<div className="pointer-events-none text-[22vw] font-black leading-none text-zen_green sm:text-[180px]">
								404
							</div>

							<h1 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
								This page can’t be found
							</h1>
							<p className="mb-10 text-center text-base sm:text-lg">
								The link you followed may be broken, or the page may have been moved.
							</p>

							<div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
								<Button variant="contained" className="!rounded-full" href="/">Go to homepage</Button>
								<Button variant="outlined" className="!rounded-full" href="/contact-us">Contact support</Button>
							</div>
						</div>
					</div>
				</div>
			</MainTemplate>
		</Suspense>
	);
}
