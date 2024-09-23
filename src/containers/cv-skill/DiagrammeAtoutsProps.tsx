/* eslint-disable react/no-array-index-key */
import React from "react"
import { Box, Typography, Button } from "@mui/material"

interface AtoutItem {
	atout: string
}

interface DiagrammeAtoutsProps {
	atouts: AtoutItem[]
	onModifier: () => void
}

// eslint-disable-next-line react/function-component-definition
const DiagrammeAtouts: React.FC<DiagrammeAtoutsProps> = ({
	atouts,
	onModifier,
}) => {
	const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
	const maxBarWidth = 70 // Pourcentage de la largeur maximale

	return (
		<Box
			className="border p-5 rounded-lg relative flex flex-col"
			sx={{
				minHeight: "450px",
				height: "auto",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Typography variant="h5" className="font-semibold mb-2 text-center">
				Mes Atouts
			</Typography>
			<Box
				className="flex-grow"
				style={{ minHeight: "350px", position: "relative" }}
			>
				<svg
					viewBox="0 0 300 300"
					style={{
						width: "100%",
						height: "100%",
						position: "absolute",
						top: 0,
						left: 0,
					}}
				>
					<g transform="translate(30, 30)">
						{atouts.slice(0, 5).map((atout, index) => {
							const barWidth = maxBarWidth - index * 7
							return (
								<g
									key={index}
									transform={`translate(0, ${index * 45})`}
								>
									<rect
										x="0"
										y="0"
										width={`${barWidth}%`}
										height="30"
										fill={colors[index]}
										rx="5"
										ry="5"
									/>
									<text
										x="5"
										y="20"
										fill="white"
										fontSize="14"
										fontWeight="bold"
									>
										{atout.atout}
									</text>
								</g>
							)
						})}
					</g>
				</svg>
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
						"&:hover": {
							backgroundColor: "#4caf50",
							color: "white",
						},
					}}
				>
					MODIFIER MES ATOUTS
				</Button>
			</Box>
		</Box>
	)
}

export default DiagrammeAtouts
