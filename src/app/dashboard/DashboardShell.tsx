"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Avatar,
	Badge,
	Box,
	Button,
	Collapse,
	Divider,
	Drawer,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InsightsIcon from "@mui/icons-material/Insights";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ChatIcon from "@mui/icons-material/Chat";
import ForumIcon from "@mui/icons-material/Forum";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FolderIcon from "@mui/icons-material/Folder";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import PaymentIcon from "@mui/icons-material/Payment";
import TimelineIcon from "@mui/icons-material/Timeline";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FlightIcon from "@mui/icons-material/Flight";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";

const DRAWER_WIDTH = 260;
const BRAND_GREEN = "#006847";

interface DashboardShellProps {
	children: React.ReactNode;
	userName: string;
	userEmail: string;
	userRole: string;
}

interface NavItem {
	label: string;
	href: string;
	icon: React.ReactNode;
	badge?: number;
	hasArrow?: boolean;
	subItems?: string[];
}

const navItems: NavItem[] = [
	{ label: "Insights", href: "/dashboard", icon: <InsightsIcon fontSize="small" /> },
	{ label: "Inbox+", href: "/dashboard/inbox", icon: <InboxIcon fontSize="small" />, badge: 35 },
	{ label: "Clients", href: "/dashboard/clients", icon: <PeopleIcon fontSize="small" />, hasArrow: true },
	{
		label: "Reporting",
		href: "/dashboard/reporting",
		icon: <AssessmentIcon fontSize="small" />,
		hasArrow: true,
		subItems: ["Overview", "Reports", "Dashboards", "Report designer", "Alerts", "How it works"],
	},
	{ label: "Team chat", href: "/dashboard/team-chat", icon: <ChatIcon fontSize="small" /> },
	{ label: "Communications", href: "/dashboard/communications", icon: <ForumIcon fontSize="small" />, badge: 15 },
	{ label: "Workflow", href: "/dashboard/workflow", icon: <AccountTreeIcon fontSize="small" />, badge: 22, hasArrow: true },
	{ label: "Documents", href: "/dashboard/documents", icon: <FolderIcon fontSize="small" />, hasArrow: true },
	{ label: "Organizers", href: "/dashboard/organizers", icon: <FolderSpecialIcon fontSize="small" /> },
	{ label: "Billing", href: "/dashboard/billing", icon: <PaymentIcon fontSize="small" />, hasArrow: true },
	{ label: "Activity feed", href: "/dashboard/activity", icon: <TimelineIcon fontSize="small" /> },
	{ label: "Templates", href: "/dashboard/templates", icon: <DynamicFormIcon fontSize="small" />, hasArrow: true },
	{ label: "Growth solutions", href: "/dashboard/growth", icon: <TrendingUpIcon fontSize="small" />, hasArrow: true },
];

const utilityItems = [
	{ icon: <AccessTimeIcon fontSize="small" />, label: "Time entry" },
	{ icon: <HelpOutlineIcon fontSize="small" />, label: "Help" },
	{ icon: <GroupsIcon fontSize="small" />, label: "Community" },
	{ icon: <CardGiftcardIcon fontSize="small" />, label: "Refer and earn" },
	{ icon: <NewReleasesIcon fontSize="small" />, label: "What's new" },
];

export function DashboardShell({ children, userName, userEmail, userRole }: DashboardShellProps) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({ Reporting: true });
	const pathname = usePathname();

	const toggleSection = (label: string) =>
		setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));

	const initials = userName
		.split(" ")
		.map((n) => n[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	const sidebar = (
		<Box sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "white" }}>
			{/* Logo */}
			<Box sx={{ px: 2, py: 1.75, display: "flex", alignItems: "center", gap: 1.5, borderBottom: "1px solid #f0f0f0" }}>
				<Box
					sx={{
						width: 34,
						height: 34,
						backgroundColor: BRAND_GREEN,
						borderRadius: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexShrink: 0,
					}}
				>
					<Typography sx={{ fontSize: 11, fontWeight: 800, color: "white", lineHeight: 1 }}>ZN</Typography>
				</Box>
				<Box>
					<Typography sx={{ fontSize: 10, fontWeight: 800, color: "text.primary", lineHeight: 1.3, display: "block" }}>
						ZENTAVOS
					</Typography>
					<Typography sx={{ fontSize: 9, color: "text.secondary", lineHeight: 1 }}>
						FINANCE SOLUTIONS
					</Typography>
				</Box>
			</Box>

			{/* Nav items */}
			<Box sx={{ flex: 1, overflowY: "auto" }}>
				<List dense disablePadding sx={{ py: 0.5 }}>
					{navItems.map((item) => {
						const isSelected = pathname === item.href;
						const isOpen = openSections[item.label] ?? false;
						const hasSubItems = !!item.subItems;

						const buttonContent = (
							<>
								<ListItemIcon sx={{ minWidth: 32, color: isSelected ? BRAND_GREEN : "#666" }}>
									{item.badge ? (
										<Badge
											badgeContent={item.badge}
											color="success"
											sx={{ "& .MuiBadge-badge": { fontSize: 9, minWidth: 16, height: 16, padding: 0 } }}
										>
											{item.icon}
										</Badge>
									) : (
										item.icon
									)}
								</ListItemIcon>
								<ListItemText
									primary={item.label}
									primaryTypographyProps={{ fontSize: 13, fontWeight: isSelected ? 600 : 400 }}
								/>
								{item.hasArrow && !item.badge && (
									hasSubItems && isOpen ? (
										<ExpandLessIcon sx={{ fontSize: 16, color: "#bbb" }} />
									) : (
										<ExpandMoreIcon sx={{ fontSize: 16, color: "#bbb" }} />
									)
								)}
							</>
						);

						return (
							<Box key={item.href}>
								<ListItem disablePadding>
									{hasSubItems ? (
										<ListItemButton
											onClick={() => toggleSection(item.label)}
											selected={isSelected}
											sx={{
												py: 0.6,
												px: 1.5,
												"&.Mui-selected": { backgroundColor: "#e8f5ee", color: BRAND_GREEN },
												"&:hover": { backgroundColor: "#f5f5f5" },
											}}
										>
											{buttonContent}
										</ListItemButton>
									) : (
										<ListItemButton
											component={Link}
											href={item.href}
											selected={isSelected}
											sx={{
												py: 0.6,
												px: 1.5,
												"&.Mui-selected": { backgroundColor: "#e8f5ee", color: BRAND_GREEN },
												"&:hover": { backgroundColor: "#f5f5f5" },
											}}
										>
											{buttonContent}
										</ListItemButton>
									)}
								</ListItem>
								{item.subItems && (
									<Collapse in={isOpen} unmountOnExit>
										<List dense disablePadding>
											{item.subItems.map((sub) => {
												const subHref = `${item.href}/${sub.toLowerCase().replace(/ /g, "-")}`;
												return (
													<ListItemButton
														key={sub}
														component={Link}
														href={subHref}
														selected={pathname === subHref}
														sx={{
															pl: 5.5,
															py: 0.4,
															"&.Mui-selected": { backgroundColor: "#e8f5ee", color: BRAND_GREEN },
															"&:hover": { backgroundColor: "#f5f5f5" },
														}}
													>
														<ListItemText
															primary={sub}
															primaryTypographyProps={{ fontSize: 12, color: pathname === subHref ? BRAND_GREEN : "#555" }}
														/>
													</ListItemButton>
												);
											})}
										</List>
									</Collapse>
								)}
							</Box>
						);
					})}
				</List>
			</Box>

			{/* Bottom bar */}
			<Box
				sx={{
					px: 1.5,
					py: 1,
					borderTop: "1px solid #f0f0f0",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Tooltip title="Sign out">
					<IconButton size="small" onClick={() => signOut({ callbackUrl: "/" })} sx={{ color: "#aaa" }}>
						<LogoutIcon fontSize="small" />
					</IconButton>
				</Tooltip>
				<Box sx={{ display: "flex", gap: 0.5 }}>
					<Tooltip title="Light mode">
						<IconButton size="small" sx={{ color: "#aaa" }}>
							<LightModeIcon fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Dark mode">
						<IconButton size="small" sx={{ color: "#aaa" }}>
							<DarkModeIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				</Box>
			</Box>
		</Box>
	);

	const topBar = (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				px: 2,
				py: 0.75,
				backgroundColor: "white",
				borderBottom: "1px solid #f0f0f0",
				gap: 1.5,
				minHeight: 52,
			}}
		>
			{/* Mobile menu */}
			<IconButton sx={{ display: { md: "none" }, mr: 0.5 }} size="small" onClick={() => setMobileOpen(true)}>
				<MenuIcon />
			</IconButton>

			{/* New button */}
			<Button
				variant="contained"
				startIcon={<AddIcon />}
				sx={{
					backgroundColor: BRAND_GREEN,
					textTransform: "none",
					borderRadius: 6,
					px: 2,
					py: 0.4,
					fontWeight: 600,
					fontSize: 13,
					flexShrink: 0,
					"&:hover": { backgroundColor: "#005a3c" },
				}}
			>
				New
			</Button>

			{/* Search */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 0.5,
					backgroundColor: "#f5f5f5",
					borderRadius: 6,
					px: 1.5,
					py: 0.4,
					width: 220,
				}}
			>
				<SearchIcon sx={{ fontSize: 17, color: "#bbb" }} />
				<InputBase placeholder="Search" sx={{ fontSize: 13, "& input": { padding: 0 } }} />
			</Box>

			<Box sx={{ flex: 1 }} />

			{/* Utility buttons */}
			{utilityItems.map((item) => (
				<Tooltip key={item.label} title={item.label}>
					<Button
						startIcon={item.icon}
						sx={{
							textTransform: "none",
							color: "#555",
							fontSize: 12,
							fontWeight: 400,
							px: 1,
							minWidth: 0,
							display: { xs: "none", lg: "flex" },
						}}
					>
						{item.label}
					</Button>
				</Tooltip>
			))}

			{/* User profile */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1,
					cursor: "pointer",
					ml: 0.5,
					pl: 1.5,
					borderLeft: "1px solid #eee",
					flexShrink: 0,
				}}
			>
				<Avatar sx={{ bgcolor: "#5c6bc0", width: 28, height: 28, fontSize: 11, fontWeight: 700 }}>
					{initials}
				</Avatar>
				<Box sx={{ display: { xs: "none", sm: "block" } }}>
					<Typography sx={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{userName}</Typography>
					<Typography sx={{ fontSize: 10, color: "text.secondary", lineHeight: 1.2 }}>
						{userEmail.length > 20 ? userEmail.slice(0, 20) + "…" : userEmail}
					</Typography>
				</Box>
				<ArrowDropDownIcon sx={{ fontSize: 18, color: "#bbb" }} />
			</Box>
		</Box>
	);

	return (
		<Box sx={{ display: "flex", minHeight: "100vh" }}>
			{/* Sidebar — desktop */}
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: "none", md: "block" },
					width: DRAWER_WIDTH,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: DRAWER_WIDTH,
						boxSizing: "border-box",
						border: "none",
						borderRight: "1px solid #f0f0f0",
					},
				}}
			>
				{sidebar}
			</Drawer>

			{/* Sidebar — mobile */}
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onClose={() => setMobileOpen(false)}
				ModalProps={{ keepMounted: true }}
				sx={{
					display: { xs: "block", md: "none" },
					"& .MuiDrawer-paper": { width: DRAWER_WIDTH },
				}}
			>
				{sidebar}
			</Drawer>

			{/* Main area */}
			<Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
				{topBar}
				<Box sx={{ flex: 1, p: { xs: 2, md: 3 }, backgroundColor: "#f8f9fa" }}>{children}</Box>
			</Box>
		</Box>
	);
}
