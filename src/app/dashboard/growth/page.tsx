import { Box, Card, CardContent, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function GrowthPage() {
	return (
		<Box>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
				<Box sx={{ p: 0.75, borderRadius: 1.5, bgcolor: "primary.main", display: "flex" }}>
					<TrendingUpIcon sx={{ color: "white", fontSize: 20 }} />
				</Box>
				<Box>
					<Typography variant="h6" fontWeight={700}>Growth Solutions</Typography>
					<Typography variant="body2" color="text.secondary">Tools to grow and scale your business</Typography>
				</Box>
			</Box>
			<Card variant="outlined" sx={{ borderRadius: 2 }}>
				<CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 8 }}>
					<ConstructionIcon sx={{ fontSize: 48, color: "#ccc", mb: 2 }} />
					<Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>Coming Soon</Typography>
					<Typography variant="body2" color="text.secondary">
						Growth solutions are under development. Check back soon.
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
}
