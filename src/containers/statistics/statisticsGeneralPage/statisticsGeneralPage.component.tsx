import { Box, Container, Grid, TextField } from "@mui/material"
import dayjs from "dayjs"
import {
	APPLYINGS_COLOR,
	APPLYINGS_ICON,
	APPLYINGS_TITLE,
	OFFERS_COLOR,
	OFFERS_ICON,
	OFFERS_TITLE,
	USERS_COLOR,
	USERS_ICON,
	USERS_TITLE,
	VISITS_COLOR,
	VISITS_ICON,
	VISITS_TITLE,
} from "./statisticsGeneralPage.constant"
import useStatisticsGeneralPage from "./statisticsGeneralPage.hook"
import StatisticCard from "../../../components/statistics/statisticsGeneral/statisticsGeneralCard"

function StatisticsGeneralPage() {
	const { startedAt, setStartedAt, endedAt, setEndedAt, generalStats } =
		useStatisticsGeneralPage()

	return (
		<div style={{ width: "100%" }}>
			<h1 style={{ textAlign: "center" }}>Statistiques générales</h1>
			<div style={{ textAlign: "center" }}>
				<TextField
					type="date"
					inputProps={{
						pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}",
					}}
					onChange={(evt: any) =>
						setStartedAt(
							evt.target.value
								? dayjs(evt.target.value).format("YYYY-MM-DD")
								: dayjs().startOf("year").format("YYYY-MM-DD")
						)
					}
					style={{ marginInline: "16px" }}
					value={startedAt}
					required
					helperText="Date de début"
				/>
				<TextField
					type="date"
					inputProps={{
						pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}",
					}}
					onChange={(evt: any) =>
						setEndedAt(
							evt.target.value
								? dayjs(evt.target.value).format("YYYY-MM-DD")
								: dayjs().format("YYYY-MM-DD")
						)
					}
					style={{ marginInline: "16px" }}
					value={endedAt}
					required
					helperText="Date de fin"
				/>
			</div>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="xl">
					<Grid container spacing={3}>
						<StatisticCard
							title={USERS_TITLE}
							Icon={USERS_ICON}
							value={generalStats.data?.numbersUsers || 0}
							backgroundColor={USERS_COLOR}
						/>
						<StatisticCard
							title={APPLYINGS_TITLE}
							Icon={APPLYINGS_ICON}
							value={generalStats.data?.numbersApplyings || 0}
							backgroundColor={APPLYINGS_COLOR}
						/>
						<StatisticCard
							title={VISITS_TITLE}
							Icon={VISITS_ICON}
							value={generalStats.data?.numbersVisits || 0}
							backgroundColor={VISITS_COLOR}
						/>
						<StatisticCard
							title={OFFERS_TITLE}
							Icon={OFFERS_ICON}
							value={generalStats?.data?.numbersOffers || 0}
							backgroundColor={OFFERS_COLOR}
						/>
					</Grid>
				</Container>
			</Box>
		</div>
	)
}
export default StatisticsGeneralPage
