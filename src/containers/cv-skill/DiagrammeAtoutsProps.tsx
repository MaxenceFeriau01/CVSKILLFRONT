/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import React from "react"
import {
	Box,
	Typography,
	Button,
	styled,
	useTheme,
	useMediaQuery,
} from "@mui/material"

interface AtoutItem {
	atout: string
}

interface DiagrammeAtoutsProps {
	atouts: AtoutItem[]
	onModifier: () => void
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
const ResponsiveSvg = styled("svg")(({ theme }) => ({
	width: "100%",
	height: "auto",
	[theme.breakpoints.down("sm")]: {
		height: "300px",
	},
	[theme.breakpoints.up("md")]: {
		height: "400px",
	},
}))
const DiagrammeAtouts: React.FC<DiagrammeAtoutsProps> = ({
	atouts,
	onModifier,
	isAdmin,
}) => {
	const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]

	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

	// Trier les atouts par longueur de chaîne décroissante
	const sortedAtouts = [...atouts].sort(
		(a, b) => b.atout.length - a.atout.length
	)

	// Trouver la longueur maximale pour calculer les pourcentages
	const maxLength = sortedAtouts[0]?.atout.length || 1

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
			<TitreStylise
				variant={isMobile ? "h6" : "h5"}
				sx={{ mb: 2, textAlign: "center" }}
			>
				Mes Atouts Pour Réussir
			</TitreStylise>
			<Box
				className="flex-grow"
				style={{ minHeight: "350px", position: "relative" }}
				sx={{ flexGrow: 1, position: "relative" }}
			>
				<ResponsiveSvg viewBox="0 0 300 300" />
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
						{sortedAtouts.slice(0, 5).map((atout, index) => {
							const percentage = Math.round(
								(atout.atout.length / maxLength) * 100
							)
							return (
								<g
									key={index}
									transform={`translate(0, ${index * 45})`}
								>
									<rect
										x="0"
										y="0"
										width={`${percentage}%`}
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
									<text
										x={`${percentage}%`}
										y="20"
										fill="black"
										fontSize="14"
										fontWeight="bold"
										dx="10"
									>
										{`${percentage}%`}
									</text>
								</g>
							)
						})}
					</g>
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
						MODIFIER MES ATOUTS
					</Button>
				</Box>
			)}
		</Box>
	)
}

export default DiagrammeAtouts
