"use client";

import { MainTemplate } from "@/app/shared_components/MainTemplate";
import { Button } from "@mui/material";
import {
	usePathname,
	useSearchParams,
	type ReadonlyURLSearchParams,
} from "next/navigation";
import { type ReactElement, useCallback, useEffect, useMemo } from "react";

const DEFAULT_MOBILE_APP_SCHEME: string = "com.zentavos.mobile";
const MOBILE_APP_SCHEME: string =
	process.env.NEXT_PUBLIC_MOBILE_APP_SCHEME || DEFAULT_MOBILE_APP_SCHEME;

type BuildMobileDeepLinkParams = Readonly<{
	scheme: string;
	pathname: string;
	queryString: string;
}>;

const buildMobileDeepLink = (params: BuildMobileDeepLinkParams): string => {
	const normalizedPathname: string = params.pathname.startsWith("/")
		? params.pathname.slice(1)
		: params.pathname;

	if (!params.queryString) {
		return `${params.scheme}://${normalizedPathname}`;
	}

	return `${params.scheme}://${normalizedPathname}?${params.queryString}`;
};

export default function PlaidReturnClient(): ReactElement {
	const pathname: string = usePathname();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const appDeepLink: string = useMemo((): string => {
		return buildMobileDeepLink({
			scheme: MOBILE_APP_SCHEME,
			pathname,
			queryString: searchParams.toString(),
		});
	}, [pathname, searchParams]);

	const redirectToApp = useCallback((): void => {
		window.location.replace(appDeepLink);
	}, [appDeepLink]);

	useEffect((): (() => void) => {
		const timeoutId: number = window.setTimeout((): void => {
			redirectToApp();
		}, 200);

		return (): void => {
			window.clearTimeout(timeoutId);
		};
	}, [redirectToApp]);

	return (
		<MainTemplate>
			<div className="w-full">
				<div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center sm:py-24">
					<div className="w-full">
						<h1 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
							You can now go back to the app
						</h1>
						<p className="mb-10 text-center text-base sm:text-lg">
							Please click the button below if you are not automatically redirected.
						</p>

						<div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
							<Button
								variant="contained"
								className="!rounded-full"
								onClick={redirectToApp}
							>
								Open the Zentavos app
							</Button>
						</div>
					</div>
				</div>
			</div>
		</MainTemplate>
	);
}
