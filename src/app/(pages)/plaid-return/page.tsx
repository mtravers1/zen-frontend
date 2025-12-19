import { Suspense, type ReactElement } from "react";

import PlaidReturnClient from "@/app/(pages)/plaid-return/plaid-return-client";

export default function PlaidReturnPage(): ReactElement {
	return (
		<Suspense fallback={null}>
			<PlaidReturnClient />
		</Suspense>
	);
}
