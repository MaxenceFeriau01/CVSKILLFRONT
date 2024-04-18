import { Box, Container, Grid, TextField } from "@mui/material"
import {
	APPLYINGS_COLOR,
	APPLYINGS_ICON,
	APPLYINGS_TITLE,
	LEARN_WORKER_COLOR,
	LEARN_WORKER_ICON,
	LEARN_WORKER_TITLE,
	OFFERS_COLOR,
	OFFERS_ICON,
	OFFERS_TITLE,
	TRAINEE_COLOR,
	TRAINEE_ICON,
	TRAINEE_TITLE,
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
	const { startedAt, setStartDate, endedAt, setEndDate, generalStats } =
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
					onChange={(evt: any) => setStartDate(evt.target.value)}
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
					onChange={(evt: any) => setEndDate(evt.target.value)}
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
							title={TRAINEE_TITLE}
							Icon={TRAINEE_ICON}
							value={generalStats?.data?.numbersInterns || 0}
							backgroundColor={TRAINEE_COLOR}
						/>
						<StatisticCard
							title={LEARN_WORKER_TITLE}
							Icon={LEARN_WORKER_ICON}
							value={generalStats.data?.numbersLearnWorkers || 0}
							backgroundColor={LEARN_WORKER_COLOR}
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
