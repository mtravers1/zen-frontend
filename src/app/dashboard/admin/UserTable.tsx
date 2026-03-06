"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Box,
	Button,
	Chip,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";

interface User {
	id: string;
	name: string | null;
	email: string;
	role: string;
	createdAt: string;
}

const BRAND_GREEN = "#006847";

export function UserTable({ users, currentUserId }: { users: User[]; currentUserId: string }) {
	const router = useRouter();
	const [loading, setLoading] = useState<string | null>(null);

	async function toggleRole(userId: string) {
		setLoading(userId);
		await fetch(`/api/admin/users/${userId}/role`, { method: "PATCH" });
		setLoading(null);
		router.refresh();
	}

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow sx={{ "& th": { fontWeight: 700, color: "text.secondary", fontSize: 12 } }}>
						<TableCell>NAME</TableCell>
						<TableCell>EMAIL</TableCell>
						<TableCell>ROLE</TableCell>
						<TableCell>JOINED</TableCell>
						<TableCell align="right">ACTION</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id} hover>
							<TableCell>
								<Typography variant="body2" fontWeight={600}>
									{user.name ?? "—"}
								</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="body2" color="text.secondary">
									{user.email}
								</Typography>
							</TableCell>
							<TableCell>
								<Chip
									label={user.role}
									size="small"
									sx={{
										backgroundColor: user.role === "ADMIN" ? "#fff3e0" : "#e8f5ee",
										color: user.role === "ADMIN" ? "#e65100" : BRAND_GREEN,
										fontWeight: 700,
										fontSize: 11,
									}}
								/>
							</TableCell>
							<TableCell>
								<Typography variant="body2" color="text.secondary">
									{new Date(user.createdAt).toLocaleDateString()}
								</Typography>
							</TableCell>
							<TableCell align="right">
								{user.id === currentUserId ? (
									<Typography variant="caption" color="text.disabled">
										(you)
									</Typography>
								) : (
									<Button
										size="small"
										variant="outlined"
										disabled={loading === user.id}
										onClick={() => toggleRole(user.id)}
										sx={{
											textTransform: "none",
											borderColor: user.role === "ADMIN" ? "#e65100" : BRAND_GREEN,
											color: user.role === "ADMIN" ? "#e65100" : BRAND_GREEN,
											"&:hover": {
												backgroundColor: user.role === "ADMIN" ? "#fff3e0" : "#e8f5ee",
											},
										}}
									>
										{loading === user.id ? (
											<CircularProgress size={14} />
										) : user.role === "ADMIN" ? (
											"Make User"
										) : (
											"Make Admin"
										)}
									</Button>
								)}
							</TableCell>
						</TableRow>
					))}
					{users.length === 0 && (
						<TableRow>
							<TableCell colSpan={5}>
								<Box textAlign="center" py={3}>
									<Typography color="text.secondary">No users found.</Typography>
								</Box>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
