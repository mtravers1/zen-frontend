"use client";

import { useState } from "react";
import {
	Box,
	Card,
	CardContent,
	Divider,
	Switch,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExtensionIcon from "@mui/icons-material/Extension";
import CreditCardIcon from "@mui/icons-material/CreditCard";

function ToggleRow({
	label,
	desc,
	defaultOn = false,
}: {
	label: string;
	desc: string;
	defaultOn?: boolean;
}) {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Box>
				<Typography variant="body2" fontWeight={500}>
					{label}
				</Typography>
				<Typography variant="caption" color="text.secondary">
					{desc}
				</Typography>
			</Box>
			<Switch defaultChecked={defaultOn} />
		</Box>
	);
}

export default function SettingsPage() {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<Box>
			{/* Header */}
			<Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
				<Box
					sx={{ p: 0.75, borderRadius: 1.5, bgcolor: "primary.main", display: "flex" }}
				>
					<SettingsIcon sx={{ color: "white", fontSize: 20 }} />
				</Box>
				<Box>
					<Typography variant="h6" fontWeight={700}>
						Settings
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Configure application settings and preferences
					</Typography>
				</Box>
			</Box>

			{/* Tabs */}
			<Tabs
				value={activeTab}
				onChange={(_, v) => setActiveTab(v)}
				sx={{
					mb: 2,
					mt: 1,
					"& .MuiTab-root": { textTransform: "none", fontSize: 13, minHeight: 40 },
				}}
			>
				<Tab label="General" />
				<Tab label="Notifications" />
				<Tab label="Integrations" />
				<Tab label="Billing" />
			</Tabs>

			{/* General */}
			{activeTab === 0 && (
				<Card variant="outlined" sx={{ borderRadius: 2, maxWidth: 560 }}>
					<CardContent sx={{ p: 3 }}>
						<Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
							General Settings
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
							{[
								{ label: "Dark Mode", desc: "Enable dark mode for the dashboard", on: false },
								{ label: "Compact View", desc: "Use compact spacing throughout the interface", on: false },
								{ label: "Auto-save", desc: "Automatically save changes as you type", on: true },
							].map((item, i) => (
								<Box key={item.label}>
									{i > 0 && <Divider sx={{ my: 1.5 }} />}
									<ToggleRow label={item.label} desc={item.desc} defaultOn={item.on} />
								</Box>
							))}
						</Box>
					</CardContent>
				</Card>
			)}

			{/* Notifications */}
			{activeTab === 1 && (
				<Card variant="outlined" sx={{ borderRadius: 2, maxWidth: 560 }}>
					<CardContent sx={{ p: 3 }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
							<NotificationsIcon sx={{ fontSize: 18, color: "primary.main" }} />
							<Typography variant="subtitle2" fontWeight={600}>
								Notification Preferences
							</Typography>
						</Box>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
							{[
								{ label: "Email Notifications", desc: "Receive notifications via email", on: true },
								{ label: "New Lead Alerts", desc: "Get notified when new leads come in", on: true },
								{ label: "Inquiry Updates", desc: "Notifications for service inquiry status changes", on: true },
								{ label: "Marketing Emails", desc: "Receive promotional and marketing updates", on: false },
							].map((item, i) => (
								<Box key={item.label}>
									{i > 0 && <Divider sx={{ my: 1.5 }} />}
									<ToggleRow label={item.label} desc={item.desc} defaultOn={item.on} />
								</Box>
							))}
						</Box>
					</CardContent>
				</Card>
			)}

			{/* Integrations */}
			{activeTab === 2 && (
				<Card variant="outlined" sx={{ borderRadius: 2, maxWidth: 560 }}>
					<CardContent sx={{ p: 3 }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
							<ExtensionIcon sx={{ fontSize: 18, color: "primary.main" }} />
							<Typography variant="subtitle2" fontWeight={600}>
								Integrations
							</Typography>
						</Box>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
							Integration settings coming soon. This will include:
						</Typography>
						<Box component="ul" sx={{ pl: 2.5, m: 0 }}>
							{["CRM integrations", "Email service providers", "Calendar sync", "Third-party analytics"].map(
								(item) => (
									<Typography key={item} component="li" variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
										{item}
									</Typography>
								)
							)}
						</Box>
					</CardContent>
				</Card>
			)}

			{/* Billing */}
			{activeTab === 3 && (
				<Card variant="outlined" sx={{ borderRadius: 2, maxWidth: 560 }}>
					<CardContent sx={{ p: 3 }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
							<CreditCardIcon sx={{ fontSize: 18, color: "primary.main" }} />
							<Typography variant="subtitle2" fontWeight={600}>
								Billing Settings
							</Typography>
						</Box>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
							Billing settings coming soon. This will include:
						</Typography>
						<Box component="ul" sx={{ pl: 2.5, m: 0 }}>
							{["Payment methods", "Invoice history", "Subscription management", "Tax information"].map(
								(item) => (
									<Typography key={item} component="li" variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
										{item}
									</Typography>
								)
							)}
						</Box>
					</CardContent>
				</Card>
			)}
		</Box>
	);
}
