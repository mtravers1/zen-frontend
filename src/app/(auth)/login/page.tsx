"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
	Alert,
	CircularProgress,
} from "@mui/material";

function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);

		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		setLoading(false);

		if (result?.error) {
			setError("Invalid email or password.");
		} else {
			router.push(callbackUrl);
		}
	}

	return (
		<>
			{error && (
				<Alert severity="error" sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}

			<Box component="form" onSubmit={handleSubmit} noValidate>
				<TextField
					label="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
					required
					margin="normal"
					autoComplete="email"
				/>
				<TextField
					label="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					fullWidth
					required
					margin="normal"
					autoComplete="current-password"
				/>

				<Box textAlign="right" mt={0.5} mb={2}>
					<Link href="/forgot-password" style={{ fontSize: 14, color: "#1976d2" }}>
						Forgot password?
					</Link>
				</Box>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					size="large"
					disabled={loading}
					sx={{ py: 1.5, borderRadius: 2 }}
				>
					{loading ? <CircularProgress size={22} color="inherit" /> : "Sign In"}
				</Button>

				<Typography variant="body2" textAlign="center" mt={3} color="text.secondary">
					Don&apos;t have an account?{" "}
					<Link href="/register" style={{ color: "#1976d2" }}>
						Create one
					</Link>
				</Typography>
			</Box>
		</>
	);
}

export default function LoginPage() {
	return (
		<Card sx={{ width: "100%", maxWidth: 420, borderRadius: 3, boxShadow: 6 }}>
			<CardContent sx={{ p: 4 }}>
				<Typography variant="h5" fontWeight={700} mb={1} textAlign="center">
					Sign in to Zentavos
				</Typography>
				<Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
					Enter your credentials to continue
				</Typography>
				<Suspense fallback={<CircularProgress />}>
					<LoginForm />
				</Suspense>
			</CardContent>
		</Card>
	);
}
