"use client";

import { Suspense, useState } from "react";
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

function ResetPasswordForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token") ?? "";

	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	if (!token) {
		return (
			<>
				<Alert severity="error">Invalid or missing reset token.</Alert>
				<Typography variant="body2" textAlign="center" mt={3}>
					<Link href="/forgot-password" style={{ color: "#1976d2" }}>
						Request a new link
					</Link>
				</Typography>
			</>
		);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");

		if (password.length < 8) {
			setError("Password must be at least 8 characters.");
			return;
		}
		if (password !== confirm) {
			setError("Passwords do not match.");
			return;
		}

		setLoading(true);

		const res = await fetch("/api/auth/reset-password", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token, password }),
		});

		const data = await res.json();
		setLoading(false);

		if (!res.ok) {
			setError(data.error ?? "Something went wrong.");
		} else {
			router.push("/login?reset=1");
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
					label="New Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					fullWidth
					required
					margin="normal"
					autoComplete="new-password"
					helperText="Minimum 8 characters"
				/>
				<TextField
					label="Confirm Password"
					type="password"
					value={confirm}
					onChange={(e) => setConfirm(e.target.value)}
					fullWidth
					required
					margin="normal"
					autoComplete="new-password"
				/>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					size="large"
					disabled={loading}
					sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
				>
					{loading ? <CircularProgress size={22} color="inherit" /> : "Reset Password"}
				</Button>
			</Box>
		</>
	);
}

export default function ResetPasswordPage() {
	return (
		<Card sx={{ width: "100%", maxWidth: 420, borderRadius: 3, boxShadow: 6 }}>
			<CardContent sx={{ p: 4 }}>
				<Typography variant="h5" fontWeight={700} mb={1} textAlign="center">
					Set new password
				</Typography>
				<Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
					Choose a strong password for your account
				</Typography>
				<Suspense fallback={<CircularProgress />}>
					<ResetPasswordForm />
				</Suspense>
			</CardContent>
		</Card>
	);
}
