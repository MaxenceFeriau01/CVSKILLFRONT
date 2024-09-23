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
}

const DiagrammePersonnalite: React.FC<DiagrammePersonnaliteProps> = ({
	polePersonnalitesTypes,
	polePersonnaliteTraits,
	onModifierType,
	onModifierTraits,
}) => {
	const traitsPersonnels = polePersonnaliteTraits.map(
		t => t.personnaliteTrait
	)
	const traitsAssocies = polePersonnalitesTypes[0]?.associatedTraits || []

	const traitColors = ["#FF6B6B", "#4ECDC4", "#45B7D1"]
	const typeColors = ["#FFD93D", "#6BCB77", "#4D96FF", "#FFFFFF"]

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
					{/* Cercle central - Ma Personnalité */}
					<circle cx="300" cy="150" r="60" fill="#4CAF50" />
					<text
						x="300"
						y="145"
						textAnchor="middle"
						fill="white"
						fontSize="14"
						fontWeight="bold"
					>
						Ma
					</text>
					<text
						x="300"
						y="165"
						textAnchor="middle"
						fill="white"
						fontSize="14"
						fontWeight="bold"
					>
						Personnalité
					</text>

					{/* Cercle gauche - Traits */}
					<circle cx="100" cy="150" r="90" fill="#FFC107" />
					<text
						x="100"
						y="80"
						textAnchor="middle"
						fill="white"
						fontSize="16"
						fontWeight="bold"
					>
						Traits
					</text>
					{traitsPersonnels.slice(0, 3).map((trait, index) => (
						<text
							key={`trait-${index}`}
							x="100"
							y={120 + index * 30}
							textAnchor="middle"
							fill={traitColors[index]}
							fontSize="14"
							fontWeight="bold"
						>
							{trait}
						</text>
					))}

					{/* Cercle droit - Types */}
					<circle cx="500" cy="150" r="90" fill="#2196F3" />
					<text
						x="500"
						y="80"
						textAnchor="middle"
						fill="white"
						fontSize="16"
						fontWeight="bold"
					>
						Types
					</text>
					{traitsAssocies.slice(0, 4).map((trait, index) => (
						<text
							key={`type-${index}`}
							x="500"
							y={110 + index * 25}
							textAnchor="middle"
							fill={typeColors[index]}
							fontSize="14"
							fontWeight="bold"
						>
							{trait}
						</text>
					))}

					{/* Connexions */}
					<line
						x1="200"
						y1="150"
						x2="230"
						y2="150"
						stroke="black"
						strokeWidth="2"
					/>
					<line
						x1="370"
						y1="150"
						x2="400"
						y2="150"
						stroke="black"
						strokeWidth="2"
					/>
				</svg>
			</Box>
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
					MODIFIER LE TYPE
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
		</Box>
	)
}

export default DiagrammePersonnalite
