/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import React from "react"
import { Box, Typography, Button } from "@mui/material"

interface PolePersonnaliteTrait {
	personnaliteTrait: string
}

interface PolePersonnaliteType {
	personnaliteType: string
	associatedTraits: string[]
}

interface DiagrammePersonnaliteProps {
	polePersonnalitesTypes: PolePersonnaliteType[]
	polePersonnaliteTraits: PolePersonnaliteTrait[]
	onModifierType: () => void
	onModifierTraits: () => void
	isAdmin: boolean
}

const COLORS = ["#36A2EB", "#4BC0C0", "#FFCE56", "#FF6384", "#9966FF"]

const DiagrammePersonnalite: React.FC<DiagrammePersonnaliteProps> = ({
	polePersonnalitesTypes,
	polePersonnaliteTraits,
	onModifierType,
	onModifierTraits,
	isAdmin,
}) => {
	const traitsPersonnels = polePersonnaliteTraits
		.map(t => t.personnaliteTrait)
		.slice(0, 5)
	const traitsAssocies =
		polePersonnalitesTypes[0]?.associatedTraits.slice(0, 5) || []

	const createPieChart = (
		data: string[],
		centerX: number,
		centerY: number
	) => {
		const totalItems = data.length
		const anglePas = (2 * Math.PI) / totalItems
		const radius = 100

		return data.map((item, index) => {
			const startAngle = index * anglePas
			const endAngle = (index + 1) * anglePas

			const startX = centerX + radius * Math.cos(startAngle)
			const startY = centerY + radius * Math.sin(startAngle)
			const endX = centerX + radius * Math.cos(endAngle)
			const endY = centerY + radius * Math.sin(endAngle)

			const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1"

			const pathD = `
                M ${centerX} ${centerY}
                L ${startX} ${startY}
                A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
                Z
            `

			const midAngle = (startAngle + endAngle) / 2
			const textX = centerX + (radius + 20) * Math.cos(midAngle)
			const textY = centerY + (radius + 20) * Math.sin(midAngle)

			return (
				<g key={index}>
					<path d={pathD} fill={COLORS[index % COLORS.length]} />
					<line
						x1={centerX + radius * Math.cos(midAngle)}
						y1={centerY + radius * Math.sin(midAngle)}
						x2={textX}
						y2={textY}
						stroke={COLORS[index % COLORS.length]}
						strokeWidth="2"
					/>
					<text
						x={textX}
						y={textY}
						textAnchor={textX > centerX ? "start" : "end"}
						dominantBaseline="middle"
						fill={COLORS[index % COLORS.length]}
						fontSize="10"
						dx={textX > centerX ? "5" : "-5"}
					>
						{item}
					</text>
				</g>
			)
		})
	}

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
				Ma Personnalité
			</Typography>
			<Box
				className="flex-grow"
				style={{ minHeight: "350px", position: "relative" }}
			>
				<svg
					viewBox="0 0 600 300"
					style={{
						width: "100%",
						height: "100%",
						position: "absolute",
						top: 0,
						left: 0,
					}}
				>
					<g>{createPieChart(traitsAssocies, 150, 150)}</g>
					<g>{createPieChart(traitsPersonnels, 450, 150)}</g>
				</svg>
			</Box>
			{isAdmin && (
				<Box className="mt-4 text-center">
					<Button
						onClick={onModifierType}
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
						MODIFIER LES TYPES
					</Button>
					<Button
						onClick={onModifierTraits}
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
						MODIFIER LES TRAITS
					</Button>
				</Box>
			)}
		</Box>
	)
}

export default DiagrammePersonnalite
