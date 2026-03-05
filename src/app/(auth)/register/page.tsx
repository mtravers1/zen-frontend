"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function RegisterPage() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);

		const res = await fetch("/api/auth/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});

		const data = await res.json();
		setLoading(false);

		if (!res.ok) {
			setError(data.error ?? "Registration failed.");
		} else {
			router.push("/login?registered=1");
		}
	}

	return (
		<Card sx={{ width: "100%", maxWidth: 420, borderRadius: 3, boxShadow: 6 }}>
			<CardContent sx={{ p: 4 }}>
				<Typography variant="h5" fontWeight={700} mb={1} textAlign="center">
					Create an account
				</Typography>
				<Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
					Join Zentavos today
				</Typography>

				{error && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}

				<Box component="form" onSubmit={handleSubmit} noValidate>
					<TextField
						label="Full Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						fullWidth
						required
						margin="normal"
						autoComplete="name"
					/>
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
						autoComplete="new-password"
						helperText="Minimum 8 characters"
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						size="large"
						disabled={loading}
						sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
					>
						{loading ? <CircularProgress size={22} color="inherit" /> : "Create Account"}
					</Button>

					<Typography variant="body2" textAlign="center" mt={3} color="text.secondary">
						Already have an account?{" "}
						<Link href="/login" style={{ color: "#1976d2" }}>
							Sign in
						</Link>
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}
