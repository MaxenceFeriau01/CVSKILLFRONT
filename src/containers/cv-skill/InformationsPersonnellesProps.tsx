/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import React from "react"
import { Box, Typography, Button } from "@mui/material"
import UserCvSkillDto from "../../api/models/usercvskill"

interface InformationsPersonnellesProps {
	user: UserCvSkillDto | undefined
	onEditInfo: () => void
}

const COLORS = [
	"#FF6384",
	"#36A2EB",
	"#FFCE56",
	"#4BC0C0",
	"#9966FF",
	"#FF9F40",
	"#FF6384",
]

const InformationsPersonnelles: React.FC<InformationsPersonnellesProps> = ({
	user,
	onEditInfo,
}) => {
	if (!user) return null

	const formatDateOfBirth = (dateOfBirth: Date | undefined): string => {
		if (!dateOfBirth) return "Non spécifié"
		return new Date(dateOfBirth).toLocaleDateString()
	}

	const infos = [
		{ label: "Nom", value: user.name },
		{ label: "Prénom", value: user.firstName },
		{
			label: "Date de naissance",
			value: formatDateOfBirth(user.dateOfBirth),
		},
		{ label: "Diplôme", value: user.diploma || "Non spécifié" },
		{ label: "Civilité", value: user.civility },
		{ label: "Email", value: user.email, isLarge: true },
		{ label: "Téléphone", value: user.phone },
	]

	const createStarDiagram = () => {
		const centerX = 300
		const centerY = 225
		const radius = 180
		const centerRadius = 70
		const totalItems = infos.length
		const anglePas = (2 * Math.PI) / totalItems

		return infos.map((info, index) => {
			const angle = index * anglePas - Math.PI / 2
			const x = centerX + radius * Math.cos(angle)
			const y = centerY + radius * Math.sin(angle)

			const startX = centerX + centerRadius * Math.cos(angle)
			const startY = centerY + centerRadius * Math.sin(angle)

			const width = info.isLarge ? 200 : 140
			const height = info.isLarge ? 60 : 50

			return (
				<g key={index}>
					<line
						x1={startX}
						y1={startY}
						x2={x}
						y2={y}
						stroke={COLORS[index % COLORS.length]}
						strokeWidth="1"
					/>
					<rect
						x={x - width / 2}
						y={y - height / 2}
						width={width}
						height={height}
						rx="10"
						ry="10"
						fill="white"
						stroke={COLORS[index % COLORS.length]}
						strokeWidth="1"
					/>
					<text
						x={x}
						y={y - height / 4}
						textAnchor="middle"
						fill={COLORS[index % COLORS.length]}
						fontSize="13"
						fontWeight="bold"
					>
						{info.label}
					</text>
					<text
						x={x}
						y={y + height / 4}
						textAnchor="middle"
						fill="black"
						fontSize="13"
					>
						{info.value}
					</text>
				</g>
			)
		})
	}

	return (
		<Box
			className="border p-5 rounded-lg relative flex flex-col"
			sx={{
				minHeight: "550px",
				height: "auto",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Typography variant="h5" className="font-semibold mb-4 text-center">
				Mes Informations Personnelles
			</Typography>
			<Box
				className="flex-grow"
				style={{ minHeight: "500px", position: "relative" }}
			>
				<svg
					viewBox="0 0 600 500"
					style={{
						width: "100%",
						height: "100%",
						position: "absolute",
						top: 0,
						left: 0,
					}}
				>
					<circle cx="300" cy="225" r="70" fill="#3f51b5" />
					<text
						x="300"
						y="220"
						textAnchor="middle"
						fill="white"
						fontSize="16"
						fontWeight="bold"
					>
						Informations
					</text>
					<text
						x="300"
						y="240"
						textAnchor="middle"
						fill="white"
						fontSize="16"
						fontWeight="bold"
					>
						Personnelles
					</text>
					{createStarDiagram()}
				</svg>
			</Box>
			<Box className="mt-4 text-center">
				<Button
					onClick={onEditInfo}
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
					MODIFIER LES INFORMATIONS
				</Button>
			</Box>
		</Box>
	)
}

export default InformationsPersonnelles
