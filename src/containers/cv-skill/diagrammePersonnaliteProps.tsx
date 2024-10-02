/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import React from "react"
import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material"
import { styled } from "@mui/system"

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
	printMode?: boolean
	compact: boolean
}

const TitreStylise = styled(Typography)`
	font-family: "Bungee", cursive;
	font-size: 1.4rem;
	font-weight: 700;
	text-transform: uppercase;
	color: #333;
	margin-bottom: 1rem;
`

const COLORS = ["#36A2EB", "#4BC0C0", "#FFCE56", "#FF6384", "#9966FF"]

const DiagrammePersonnalite: React.FC<DiagrammePersonnaliteProps> = ({
	polePersonnalitesTypes,
	polePersonnaliteTraits,
	onModifierType,
	onModifierTraits,
	isAdmin,
	printMode,
	compact: boolean,
}) => {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

	const traitsPersonnels = polePersonnaliteTraits
		.map(t => t.personnaliteTrait)
		.slice(0, 5)
	const traitsAssocies =
		polePersonnalitesTypes[0]?.associatedTraits.slice(0, 5) || []

	const createPieChart = (
		data: string[],
		centerX: number,
		centerY: number,
		innerRadius: number,
		outerRadius: number
	) => {
		const totalItems = data.length
		const anglePas = (2 * Math.PI) / totalItems

		return data.map((item, index) => {
			const startAngle = index * anglePas
			const endAngle = (index + 1) * anglePas

			const innerStartX = centerX + innerRadius * Math.cos(startAngle)
			const innerStartY = centerY + innerRadius * Math.sin(startAngle)
			const innerEndX = centerX + innerRadius * Math.cos(endAngle)
			const innerEndY = centerY + innerRadius * Math.sin(endAngle)
			const outerStartX = centerX + outerRadius * Math.cos(startAngle)
			const outerStartY = centerY + outerRadius * Math.sin(startAngle)
			const outerEndX = centerX + outerRadius * Math.cos(endAngle)
			const outerEndY = centerY + outerRadius * Math.sin(endAngle)

			const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1"

			const pathD = `
                M ${innerStartX} ${innerStartY}
                L ${outerStartX} ${outerStartY}
                A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}
                L ${innerEndX} ${innerEndY}
                A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
            `

			const midAngle = (startAngle + endAngle) / 2
			const textX = centerX + (outerRadius + 20) * Math.cos(midAngle)
			const textY = centerY + (outerRadius + 20) * Math.sin(midAngle)

			return (
				<g key={index}>
					<path d={pathD} fill={COLORS[index % COLORS.length]} />
					<line
						x1={centerX + outerRadius * Math.cos(midAngle)}
						y1={centerY + outerRadius * Math.sin(midAngle)}
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
						fontSize={isSmallScreen ? "9" : "10"}
						dx={textX > centerX ? "5" : "-5"}
					>
						{item}
					</text>
				</g>
			)
		})
	}

	const svgWidth = 600
	const svgHeight = isSmallScreen ? 600 : 300
	const circleRadius = isSmallScreen ? 80 : 100
	const innerRadius = circleRadius * 0.6
	const gap = isSmallScreen ? 40 : 132
	const circle1CenterX = svgWidth / 2 - (circleRadius + gap / 2)
	const circle2CenterX = svgWidth / 2 + (circleRadius + gap / 2)
	const circleCenterY = svgHeight / 2

	return (
		<Box
			className="border p-5 rounded-lg relative flex flex-col"
			sx={{
				minHeight: isSmallScreen ? "700px" : "450px",
				height: "auto",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<TitreStylise variant="h5" className="mb-4 text-center">
				Ma Personnalité Pour Réussir
			</TitreStylise>
			<Box
				className="flex-grow"
				style={{
					minHeight: isSmallScreen ? "600px" : "350px",
					position: "relative",
				}}
			>
				<svg
					viewBox={`0 0 ${svgWidth} ${svgHeight}`}
					style={{
						width: "100%",
						height: "100%",
						position: "absolute",
						top: 0,
						left: 0,
					}}
				>
					<g>
						{createPieChart(
							traitsAssocies,
							circle1CenterX,
							circleCenterY,
							innerRadius,
							circleRadius
						)}
					</g>
					<g>
						{createPieChart(
							traitsPersonnels,
							circle2CenterX,
							circleCenterY,
							innerRadius,
							circleRadius
						)}
					</g>
					<text
						x={circle1CenterX}
						y={circleCenterY}
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize={isSmallScreen ? "10" : "12"}
						fontWeight="bold"
					>
						Types
					</text>
					<text
						x={circle2CenterX}
						y={circleCenterY}
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize={isSmallScreen ? "10" : "12"}
						fontWeight="bold"
					>
						Traits
					</text>
				</svg>
			</Box>
			{isAdmin && !printMode && (
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
							marginRight: "10px",
							marginBottom: isSmallScreen ? "8px" : 0,
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
