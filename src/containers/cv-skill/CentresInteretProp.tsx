/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import React from "react"
import { Box, Typography, Button, Grid } from "@mui/material"
import { Check } from "@mui/icons-material"

interface PoleLoisirInteret {
	name: string
}

interface CentresInteretProps {
	poleLoisirInterets: PoleLoisirInteret[] | undefined
	onModifier: () => void
}

const CentresInteret: React.FC<CentresInteretProps> = ({
	poleLoisirInterets,
	onModifier,
}) => {
	if (!poleLoisirInterets) return null

	// Function to generate a random color
	const getRandomColor = () => {
		const letters = "0123456789ABCDEF"
		let color = "#"
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)]
		}
		return color
	}

	return (
		<Box
			className="border p-5 rounded-lg relative flex flex-col"
			sx={{
				minHeight: "450px",
				height: "auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "center", // Center content horizontally
			}}
		>
			<Typography variant="h5" className="font-semibold mb-2 text-center">
				Mes Loisirs et Intérêts
			</Typography>
			<Box
				className="flex-grow"
				style={{
					minHeight: "350px",
					position: "relative",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Grid
					container
					spacing={2}
					justifyContent="center"
					alignItems="center"
				>
					{poleLoisirInterets.map((item, index) => {
						const color = getRandomColor() // Get a random color for this interest
						const filledCircles = 6 - index // Number of filled circles based on index
						return (
							<Grid
								item
								xs={6}
								sm={4}
								md={3}
								key={index}
								style={{ textAlign: "center" }}
							>
								<Box className="flex items-center justify-center mb-2">
									<Check
										className="mr-2"
										style={{ fontSize: "1rem" }}
									/>
									<Typography>{item.name}</Typography>
								</Box>
								{/* Render 6 balls below each interest */}
								<Box className="flex justify-center">
									{Array.from({ length: 6 }).map(
										(_, ballIndex) => (
											<Box
												key={ballIndex}
												sx={{
													width: "20px",
													height: "20px",
													borderRadius: "50%",
													backgroundColor:
														ballIndex <
														filledCircles
															? color
															: "transparent", // Fill color based on index
													border: `2px solid ${color}`, // Border color
													marginRight: "5px",
												}}
											/>
										)
									)}
								</Box>
							</Grid>
						)
					})}
				</Grid>
			</Box>
			<Box className="mt-4 text-center">
				<Button
					onClick={onModifier}
					variant="outlined"
					size="small"
					sx={{
						borderColor: "#4caf50",
						color: "#4caf50",
						fontSize: "0.8rem",
						padding: "4px 12px",
						marginRight: "8px",
						"&:hover": {
							backgroundColor: "#4caf50",
							color: "white",
						},
					}}
				>
					Modifier les centres d'intérêt
				</Button>
			</Box>
		</Box>
	)
}

export default CentresInteret
