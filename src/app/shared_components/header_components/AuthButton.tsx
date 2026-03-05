"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@mui/material";
import Link from "next/link";

export function AuthButton() {
	const { data: session } = useSession();

	if (session) {
		return (
			<Button
				variant="outlined"
				size="small"
				onClick={() => signOut({ callbackUrl: "/" })}
				sx={{
					borderColor: "#006847",
					color: "#006847",
					textTransform: "none",
					fontWeight: 600,
					"&:hover": { borderColor: "#004d33", backgroundColor: "#f0faf5" },
				}}
			>
				Sign Out
			</Button>
		);
	}

	return (
		<Button
			component={Link}
			href="/login"
			variant="contained"
			size="small"
			sx={{
				backgroundColor: "#006847",
				textTransform: "none",
				fontWeight: 600,
				"&:hover": { backgroundColor: "#004d33" },
			}}
		>
			Sign In
		</Button>
	);
}
