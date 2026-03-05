"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Container,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { MainTemplate } from "@/app/shared_components/MainTemplate";

interface Service {
	id: string;
	name: string;
	short_description: string;
	description: string;
	category: string;
	features: string[];
	is_active: boolean;
}

const CATEGORIES = ["all", "Tax", "Accounting", "Payroll", "Advisory", "Technology"];

const services: Service[] = [
	{
		id: "1",
		name: "Tax Preparation & Filing",
		short_description: "Professional tax preparation for individuals and businesses.",
		description: "Our certified tax professionals handle all aspects of tax preparation and filing, ensuring maximum deductions and full compliance with current tax laws. We serve individuals, self-employed professionals, and small businesses.",
		category: "Tax",
		features: ["Federal & state returns", "Business tax filing", "Maximized deductions", "Year-round support"],
		is_active: true,
	},
	{
		id: "2",
		name: "Bookkeeping",
		short_description: "Accurate monthly bookkeeping and financial record maintenance.",
		description: "Stay on top of your finances with our comprehensive bookkeeping services. We maintain accurate records, reconcile accounts, and provide monthly financial statements so you always know where your business stands.",
		category: "Accounting",
		features: ["Monthly reconciliation", "Financial statements", "Expense categorization", "Cloud-based access"],
		is_active: true,
	},
	{
		id: "3",
		name: "Payroll Processing",
		short_description: "End-to-end payroll management and compliance.",
		description: "We handle all aspects of payroll processing, from calculating wages and withholdings to filing payroll taxes and generating reports. Stay compliant and ensure your employees are paid accurately and on time.",
		category: "Payroll",
		features: ["Direct deposit setup", "Tax withholding & filing", "Employee self-service", "Multi-state payroll"],
		is_active: true,
	},
	{
		id: "4",
		name: "Tax Planning",
		short_description: "Strategic tax planning to minimize your tax liability.",
		description: "Proactive tax planning goes beyond annual filing. Our advisors work with you throughout the year to identify opportunities to reduce your tax burden, plan major financial decisions, and prepare for future tax obligations.",
		category: "Tax",
		features: ["Year-round planning", "Estimated tax payments", "Retirement tax strategy", "Business structure advice"],
		is_active: true,
	},
	{
		id: "5",
		name: "CFO Advisory",
		short_description: "On-demand CFO services for growing businesses.",
		description: "Access high-level financial strategy without the cost of a full-time CFO. Our advisors provide cash flow analysis, financial forecasting, KPI tracking, and strategic guidance to help your business grow.",
		category: "Advisory",
		features: ["Cash flow analysis", "Financial forecasting", "KPI dashboards", "Investor reporting"],
		is_active: true,
	},
	{
		id: "6",
		name: "AI Financial Insights",
		short_description: "AI-powered automation and financial predictions.",
		description: "Leverage the power of artificial intelligence to automate data entry, generate predictive financial models, and surface actionable insights. Our AI tools help you make smarter decisions faster.",
		category: "Technology",
		features: ["Automated data entry", "Predictive analytics", "Real-time reporting", "Smart alerts"],
		is_active: true,
	},
];

const BRAND_GREEN = "#006847";

export default function SolutionsPage() {
	const [activeCategory, setActiveCategory] = useState(0);
	const [selectedService, setSelectedService] = useState<Service | null>(null);

	const filtered = useMemo(() => {
		const cat = CATEGORIES[activeCategory];
		return cat === "all" ? services : services.filter((s) => s.category === cat);
	}, [activeCategory]);

	return (
		<MainTemplate>
			{/* Hero */}
			<Box
				sx={{
					bgcolor: BRAND_GREEN,
					color: "white",
					py: { xs: 8, md: 10 },
					textAlign: "center",
				}}
			>
				<Container maxWidth="md">
					<Typography
						variant="h3"
						fontWeight={800}
						sx={{ mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}
					>
						Our Solutions
					</Typography>
					<Typography variant="h6" sx={{ opacity: 0.85, fontWeight: 400, mb: 4 }}>
						Comprehensive financial services designed for small businesses and individuals.
					</Typography>
					<Button
						component={Link}
						href="/contact-us"
						variant="contained"
						size="large"
						sx={{
							bgcolor: "#E0E721",
							color: "#1a1a1a",
							fontWeight: 700,
							textTransform: "none",
							"&:hover": { bgcolor: "#c8cf1a" },
						}}
					>
						Get Started
					</Button>
				</Container>
			</Box>

			{/* Category filter */}
			<Box sx={{ borderBottom: "1px solid #eee", bgcolor: "white", position: "sticky", top: 64, zIndex: 10 }}>
				<Container maxWidth="lg">
					<Tabs
						value={activeCategory}
						onChange={(_, v) => setActiveCategory(v)}
						sx={{
							"& .MuiTab-root": {
								textTransform: "none",
								fontSize: 14,
								fontWeight: 500,
								minHeight: 52,
							},
							"& .MuiTabs-indicator": { bgcolor: BRAND_GREEN },
							"& .Mui-selected": { color: `${BRAND_GREEN} !important` },
						}}
						variant="scrollable"
						scrollButtons="auto"
					>
						{CATEGORIES.map((cat) => (
							<Tab
								key={cat}
								label={cat === "all" ? "All Services" : cat}
							/>
						))}
					</Tabs>
				</Container>
			</Box>

			{/* Services grid */}
			<Box sx={{ bgcolor: "#f8f9fa", py: { xs: 6, md: 8 } }}>
				<Container maxWidth="lg">
					<Grid container spacing={3}>
						{filtered.map((service) => (
							<Grid item xs={12} sm={6} md={4} key={service.id}>
								<Card
									variant="outlined"
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
										borderRadius: 2,
										transition: "box-shadow 0.2s, border-color 0.2s",
										"&:hover": {
											boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
											borderColor: BRAND_GREEN,
										},
									}}
								>
									<CardContent
										sx={{
											flex: 1,
											display: "flex",
											flexDirection: "column",
											p: 3,
										}}
									>
										<Chip
											label={service.category}
											size="small"
											sx={{
												alignSelf: "flex-start",
												mb: 2,
												fontSize: 11,
												bgcolor: "#e8f5ee",
												color: BRAND_GREEN,
												border: "none",
											}}
										/>
										<Typography variant="h6" fontWeight={700} sx={{ mb: 1, fontSize: "1.05rem" }}>
											{service.name}
										</Typography>
										<Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
											{service.short_description}
										</Typography>
										<Box sx={{ mb: 2.5 }}>
											{service.features.map((f) => (
												<Box
													key={f}
													sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}
												>
													<CheckIcon sx={{ fontSize: 14, color: BRAND_GREEN }} />
													<Typography variant="body2" sx={{ fontSize: 12 }}>
														{f}
													</Typography>
												</Box>
											))}
										</Box>
										<Button
											variant="outlined"
											fullWidth
											endIcon={<ArrowForwardIcon />}
											onClick={() => setSelectedService(service)}
											sx={{
												textTransform: "none",
												borderColor: BRAND_GREEN,
												color: BRAND_GREEN,
												"&:hover": { bgcolor: "#e8f5ee", borderColor: BRAND_GREEN },
											}}
										>
											Learn More
										</Button>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>

			{/* CTA */}
			<Box sx={{ bgcolor: "white", py: { xs: 6, md: 8 }, textAlign: "center" }}>
				<Container maxWidth="sm">
					<Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
						Ready to get started?
					</Typography>
					<Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
						Contact us today to find the right solution for your business.
					</Typography>
					<Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
						<Button
							component={Link}
							href="/contact-us"
							variant="contained"
							size="large"
							sx={{
								bgcolor: BRAND_GREEN,
								textTransform: "none",
								fontWeight: 600,
								"&:hover": { bgcolor: "#005a3c" },
							}}
						>
							Contact Us
						</Button>
						<Button
							component={Link}
							href="/"
							variant="outlined"
							size="large"
							sx={{ textTransform: "none", borderColor: BRAND_GREEN, color: BRAND_GREEN }}
						>
							Back to Home
						</Button>
					</Box>
				</Container>
			</Box>

			{/* Service detail dialog */}
			<Dialog
				open={!!selectedService}
				onClose={() => setSelectedService(null)}
				maxWidth="sm"
				fullWidth
			>
				{selectedService && (
					<>
						<DialogTitle
							sx={{
								display: "flex",
								alignItems: "flex-start",
								justifyContent: "space-between",
								pb: 1,
							}}
						>
							<Box>
								<Chip
									label={selectedService.category}
									size="small"
									sx={{ fontSize: 11, bgcolor: "#e8f5ee", color: BRAND_GREEN, border: "none", mb: 0.75 }}
								/>
								<Typography variant="h6" fontWeight={700}>
									{selectedService.name}
								</Typography>
							</Box>
							<IconButton size="small" onClick={() => setSelectedService(null)}>
								<CloseIcon fontSize="small" />
							</IconButton>
						</DialogTitle>
						<Divider />
						<DialogContent>
							<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
								{selectedService.description}
							</Typography>
							<Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
								What&apos;s included:
							</Typography>
							{selectedService.features.map((f) => (
								<Box key={f} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
									<CheckIcon sx={{ fontSize: 16, color: BRAND_GREEN }} />
									<Typography variant="body2">{f}</Typography>
								</Box>
							))}
							<Box sx={{ mt: 3, display: "flex", gap: 1.5 }}>
								<Button
									component={Link}
									href="/contact-us"
									variant="contained"
									fullWidth
									sx={{
										textTransform: "none",
										bgcolor: BRAND_GREEN,
										"&:hover": { bgcolor: "#005a3c" },
									}}
									onClick={() => setSelectedService(null)}
								>
									Get This Service
								</Button>
								<Button
									variant="outlined"
									fullWidth
									sx={{ textTransform: "none", borderColor: BRAND_GREEN, color: BRAND_GREEN }}
									onClick={() => setSelectedService(null)}
								>
									Close
								</Button>
							</Box>
						</DialogContent>
					</>
				)}
			</Dialog>
		</MainTemplate>
	);
}
