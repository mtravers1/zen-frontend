"use client";

import { useState } from "react";
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

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);

		const res = await fetch("/api/auth/forgot-password", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email }),
		});

		setLoading(false);

		if (!res.ok) {
			const data = await res.json();
			setError(data.error ?? "Something went wrong.");
		} else {
			setSubmitted(true);
		}
	}

	return (
		<Card sx={{ width: "100%", maxWidth: 420, borderRadius: 3, boxShadow: 6 }}>
			<CardContent sx={{ p: 4 }}>
				<Typography variant="h5" fontWeight={700} mb={1} textAlign="center">
					Reset your password
				</Typography>
				<Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
					Enter your email and we&apos;ll send you a reset link
				</Typography>

				{submitted ? (
					<Alert severity="success">
						If an account with that email exists, a password reset link has been sent.
					</Alert>
				) : (
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
							<Button
								type="submit"
								fullWidth
								variant="contained"
								size="large"
								disabled={loading}
								sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
							>
								{loading ? <CircularProgress size={22} color="inherit" /> : "Send Reset Link"}
							</Button>
						</Box>
					</>
				)}

				<Typography variant="body2" textAlign="center" mt={3} color="text.secondary">
					<Link href="/login" style={{ color: "#1976d2" }}>
						Back to sign in
					</Link>
				</Typography>
			</CardContent>
		</Card>
	);
}
