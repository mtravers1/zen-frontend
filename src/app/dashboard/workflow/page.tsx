import { Box, Card, CardContent, Typography } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function WorkflowPage() {
	return (
		<Box>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
				<Box sx={{ p: 0.75, borderRadius: 1.5, bgcolor: "primary.main", display: "flex" }}>
					<AccountTreeIcon sx={{ color: "white", fontSize: 20 }} />
				</Box>
				<Box>
					<Typography variant="h6" fontWeight={700}>Workflow</Typography>
					<Typography variant="body2" color="text.secondary">Automate and manage business workflows</Typography>
				</Box>
			</Box>
			<Card variant="outlined" sx={{ borderRadius: 2 }}>
				<CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 8 }}>
					<ConstructionIcon sx={{ fontSize: 48, color: "#ccc", mb: 2 }} />
					<Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>Coming Soon</Typography>
					<Typography variant="body2" color="text.secondary">
						Workflow automation is under development. Check back soon.
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
}
