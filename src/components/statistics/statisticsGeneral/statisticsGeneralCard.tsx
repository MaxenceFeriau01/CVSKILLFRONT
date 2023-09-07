import {
	Avatar,
	Card,
	CardContent,
	Grid,
	Stack,
	SvgIcon,
	Typography,
} from "@mui/material"

interface StatisticCardProps {
	title: string
	backgroundColor: string
	Icon: any
	value: number
}

function StatisticCard({
	title,
	backgroundColor,
	Icon,
	value,
}: StatisticCardProps) {
	return (
		<Grid>
			<Card sx={{ height: "100%", mx: "16px" }}>
				<CardContent>
					<Stack
						alignItems="flex-start"
						direction="row"
						justifyContent="space-between"
						spacing={3}
					>
						<Stack spacing={1}>
							<Typography
								color="text.secondary"
								variant="overline"
							>
								{title}
							</Typography>
							<Typography variant="h4">{value}</Typography>
						</Stack>
						<Avatar
							sx={{
								backgroundColor,
								height: 56,
								width: 56,
							}}
						>
							<SvgIcon>
								<Icon />
							</SvgIcon>
						</Avatar>
					</Stack>
				</CardContent>
			</Card>
		</Grid>
	)
}

export default StatisticCard
