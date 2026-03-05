import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
	Box,
	Card,
	CardContent,
	Chip,
	Grid,
	Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import { UserTable } from "./UserTable";

const BRAND_GREEN = "#006847";

export default async function AdminPage() {
	const session = await auth();
	if (session?.user?.role !== "ADMIN") redirect("/dashboard");

	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

	const [users, totalAdmins, totalUsers, newThisMonth] = await Promise.all([
		prisma.user.findMany({
			select: { id: true, name: true, email: true, role: true, createdAt: true },
			orderBy: { createdAt: "desc" },
		}),
		prisma.user.count({ where: { role: "ADMIN" } }),
		prisma.user.count({ where: { role: "USER" } }),
		prisma.user.count({ where: { createdAt: { gte: startOfMonth } } }),
	]);

	const totalCount = users.length;

	const stats = [
		{ label: "Total Users", value: totalCount, icon: <PeopleIcon />, color: "#1976d2" },
		{ label: "Admins", value: totalAdmins, icon: <AdminPanelSettingsIcon />, color: "#e65100" },
		{ label: "Regular Users", value: totalUsers, icon: <PersonIcon />, color: BRAND_GREEN },
		{ label: "New This Month", value: newThisMonth, icon: <CalendarMonthIcon />, color: "#7b1fa2" },
	];

	// Serialize dates for client component
	const serializedUsers = users.map((u) => ({
		...u,
		createdAt: u.createdAt.toISOString(),
	}));

	return (
		<Box>
			<Typography variant="h5" fontWeight={700} mb={3}>
				Admin Panel
			</Typography>

			{/* Stats row */}
			<Grid container spacing={2} mb={4}>
				{stats.map((stat) => (
					<Grid key={stat.label} xs={12} sm={6} lg={3}>
						<Card sx={{ borderRadius: 3 }}>
							<CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
								<Box
									sx={{
										width: 44,
										height: 44,
										borderRadius: 2,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										backgroundColor: `${stat.color}18`,
										color: stat.color,
										flexShrink: 0,
									}}
								>
									{stat.icon}
								</Box>
								<Box>
									<Typography variant="h5" fontWeight={700}>
										{stat.value}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{stat.label}
									</Typography>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			{/* User management table */}
			<Card sx={{ borderRadius: 3, mb: 4 }}>
				<CardContent sx={{ p: 3 }}>
					<Typography variant="h6" fontWeight={700} mb={2}>
						User Management
					</Typography>
					<UserTable users={serializedUsers} currentUserId={session.user?.id ?? ""} />
				</CardContent>
			</Card>

			{/* Placeholder sections */}
			<Grid container spacing={3}>
				{[
					{
						title: "Analytics",
						desc: "Detailed usage analytics, revenue trends, and business intelligence dashboards.",
						icon: <AnalyticsIcon sx={{ fontSize: 36, color: "#1976d2" }} />,
					},
					{
						title: "System Settings",
						desc: "Configure app-wide settings, feature flags, integrations, and notifications.",
						icon: <SettingsIcon sx={{ fontSize: 36, color: "#7b1fa2" }} />,
					},
				].map((section) => (
					<Grid key={section.title} xs={12} sm={6}>
						<Card sx={{ borderRadius: 3, border: "1px solid #e0e0e0" }}>
							<CardContent sx={{ p: 3 }}>
								<Box mb={1.5}>{section.icon}</Box>
								<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
									<Typography variant="subtitle1" fontWeight={700}>
										{section.title}
									</Typography>
									<Chip label="Coming Soon" size="small" sx={{ fontSize: 10, height: 18 }} />
								</Box>
								<Typography variant="body2" color="text.secondary">
									{section.desc}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
