import { Box, Card, CardContent, Typography } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function ReportingPage() {
	return (
		<Box>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
				<Box sx={{ p: 0.75, borderRadius: 1.5, bgcolor: "primary.main", display: "flex" }}>
					<AssessmentIcon sx={{ color: "white", fontSize: 20 }} />
				</Box>
				<Box>
					<Typography variant="h6" fontWeight={700}>Reporting</Typography>
					<Typography variant="body2" color="text.secondary">Analytics and business reports</Typography>
				</Box>
			</Box>
			<Card variant="outlined" sx={{ borderRadius: 2 }}>
				<CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 8 }}>
					<ConstructionIcon sx={{ fontSize: 48, color: "#ccc", mb: 2 }} />
					<Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>Coming Soon</Typography>
					<Typography variant="body2" color="text.secondary">
						Reporting and analytics are under development. Check back soon.
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
}
