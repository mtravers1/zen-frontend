import type { ReactNode } from "react";
import { Box } from "@mui/material";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "linear-gradient(135deg, #0a1628 0%, #1a2f5e 100%)",
				padding: 2,
			}}
		>
			{children}
		</Box>
	);
}
