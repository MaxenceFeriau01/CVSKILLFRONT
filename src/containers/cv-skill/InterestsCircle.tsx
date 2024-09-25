/* eslint-disable react/no-array-index-key */
import React from "react"
import { Box, Typography, Button, styled } from "@mui/material"

interface CercleInteretsProps {
	interets: (
		| boolean
		| React.ReactChild
		| React.ReactFragment
		| React.ReactPortal
		| null
		| undefined
	)[]
	onModifier: () => void
	isAdmin: boolean
}

const TitreStylise = styled(Typography)`
	font-family: "Bungee", cursive; // Vous devrez importer cette police
	font-size: 1.4rem;
	font-weight: 700;
	text-transform: uppercase;
	background: linear-gradient(
		45deg,
		#ff00ff,
		#00ffff,
		#ff0000,
		#00ff00,
		#ffff00
	);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	animation: rainbow 6s ease infinite;
	background-size: 400% 400%;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

	@keyframes rainbow {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
`

function CercleInterets({
	interets,
	onModifier,
	isAdmin,
}: CercleInteretsProps) {
	const totalInterets = interets.length
	const anglePas = (2 * Math.PI) / totalInterets
	const colors = ["#36A2EB", "#4BC0C0", "#FFCE56", "#FF6384", "#9966FF"]

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
			<TitreStylise variant="h5" className="mb-4 text-center">
				Mes Intérêts Pour Réussir
			</TitreStylise>
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
					<g transform="translate(200, 150)" />
					{interets.map(
						(
							interet:
								| boolean
								| React.ReactChild
								| React.ReactFragment
								| React.ReactPortal
								| null
								| undefined,
							index: number
						) => {
							const startAngle = index * anglePas
							const endAngle = (index + 1) * anglePas
							const innerRadius = 60
							const outerRadius = 100

							const innerStartX =
								150 + innerRadius * Math.cos(startAngle)
							const innerStartY =
								150 + innerRadius * Math.sin(startAngle)
							const innerEndX =
								150 + innerRadius * Math.cos(endAngle)
							const innerEndY =
								150 + innerRadius * Math.sin(endAngle)
							const outerStartX =
								150 + outerRadius * Math.cos(startAngle)
							const outerStartY =
								150 + outerRadius * Math.sin(startAngle)
							const outerEndX =
								150 + outerRadius * Math.cos(endAngle)
							const outerEndY =
								150 + outerRadius * Math.sin(endAngle)

							const largeArcFlag =
								endAngle - startAngle <= Math.PI ? "0" : "1"

							const pathD = `
                                M ${innerStartX} ${innerStartY}
                                L ${outerStartX} ${outerStartY}
                                A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}
                                L ${innerEndX} ${innerEndY}
                                A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
                            `

							const midAngle = (startAngle + endAngle) / 2
							const textX =
								150 + (outerRadius + 20) * Math.cos(midAngle)
							const textY =
								150 + (outerRadius + 20) * Math.sin(midAngle)

							return (
								<g key={index}>
									<path
										d={pathD}
										fill={colors[index % colors.length]}
									/>
									<line
										x1={
											150 +
											outerRadius * Math.cos(midAngle)
										}
										y1={
											150 +
											outerRadius * Math.sin(midAngle)
										}
										x2={textX}
										y2={textY}
										stroke={colors[index % colors.length]}
										strokeWidth="2"
									/>
									<text
										x={textX}
										y={textY}
										textAnchor={
											textX > 150 ? "start" : "end"
										}
										dominantBaseline="middle"
										fill={colors[index % colors.length]}
										fontSize="11"
										dx={textX > 150 ? "5" : "-5"}
									>
										{interet}
									</text>
								</g>
							)
						}
					)}
					<circle cx="150" cy="150" r="60" fill="white" />
					<text
						x="150"
						y="140"
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize="14"
						fontWeight="bold"
					>
						Mes Interets
					</text>
					<text
						x="150"
						y="160"
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize="14"
						fontWeight="bold"
					>
						Pour Réussir
					</text>
				</svg>
			</Box>
			{isAdmin && (
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
						MODIFIER MES INTERETS
					</Button>
				</Box>
			)}
		</Box>
	)
}

export default CercleInterets
