/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import React, { useMemo } from "react"
import { Box, Typography, Button, Grid, styled } from "@mui/material"
import {
	SportsBasketball,
	SportsTennis,
	SportsMma,
	DirectionsBike,
	Pets,
	SportsGymnastics,
	DirectionsRun,
	AcUnit,
	Snowboarding,
	Palette,
	LocalMovies,
	TheaterComedy,
	MusicNote,
	Celebration,
	Language,
	Casino,
	MenuBook,
	Park,
	PhotoCamera,
	Radio,
	Tv,
	TheaterComedy as Theater,
	Flight,
	SportsScore,
	SportsEsports,
} from "@mui/icons-material"

enum PoleLoisirInteretType {
	SPORT = "SPORT",
	INTERET = "INTERET",
}

interface PoleLoisirInteret {
	name: string
	type: PoleLoisirInteretType
}

interface CentresInteretProps {
	poleLoisirInterets: PoleLoisirInteret[] | undefined
	onModifier: () => void
	printMode?: boolean
	hideModifyButton?: boolean
	compact: boolean
}

const COLORS = [
	"#FF00FF",
	"#00FFFF",
	"#FF0000",
	"#00FF00",
	"#FFFF00",
	"#FF8000",
	"#8000FF",
	"#FF1493",
	"#00FF7F",
	"#1E90FF",
	"#FFD700",
	"#FF4500",
	"#9400D3",
	"#00CED1",
]

const TitreStylise = styled(Typography)`
	font-family: "Bungee", cursive;
	font-size: 1.4rem;
	font-weight: 700;
	text-transform: uppercase;
	color: #333;
	margin-bottom: 1rem;
`

const ICONS: { [key: string]: React.ComponentType } = {
	"Sports de balle": SportsBasketball,
	"Sports de raquettes": SportsTennis,
	"Sports de Combats": SportsMma,
	"Sports cyclistes": DirectionsBike,
	"Sports équestres": Pets,
	"Sports gymniques": SportsGymnastics,
	"Sports athlétiques": DirectionsRun,
	"Sports de glace": AcUnit,
	"Sports de glisse": Snowboarding,
	"Arts plastiques": Palette,
	Cinéma: LocalMovies,
	Cirque: TheaterComedy,
	Danse: MusicNote,
	Fête: Celebration,
	Internet: Language,
	Jeux: Casino,
	Lecture: MenuBook,
	Musique: MusicNote,
	"Parcs de loisirs": Park,
	Photographie: PhotoCamera,
	// eslint-disable-next-line object-shorthand
	Radio: Radio,
	Télévision: Tv,
	Théâtre: Theater,
	Tourisme: Flight,
	Sport: SportsScore,
	"Jeux vidéo": SportsEsports,
}

const CentresInteret: React.FC<CentresInteretProps> = ({
	poleLoisirInterets,
	onModifier,
	printMode = false,
	hideModifyButton = false,
}) => {
	if (!poleLoisirInterets) return null

	const getRandomFilledCircles = () => Math.floor(Math.random() * 6) + 1

	const uniqueColors = useMemo(() => {
		const shuffled = COLORS.sort(() => 0.5 - Math.random())
		return shuffled.slice(0, poleLoisirInterets.length)
	}, [poleLoisirInterets])

	const renderInteretItem = (item: PoleLoisirInteret, index: number) => {
		const color = uniqueColors[index]
		const filledCircles = getRandomFilledCircles()
		const Icon = ICONS[item.name] || SportsScore
		return (
			<Grid
				item
				xs={6}
				key={index}
				style={{ textAlign: "center", marginBottom: "20px" }}
			>
				<Box className="flex items-center justify-center mb-2">
					<Box
						sx={{
							fontSize: "1.5rem",
							// eslint-disable-next-line object-shorthand
							color: color,
							marginRight: "0.5rem",
						}}
					>
						<Icon />
					</Box>
					<Typography>{item.name}</Typography>
				</Box>
				<Box className="flex justify-center">
					{Array.from({ length: 6 }).map((_, ballIndex) => (
						<Box
							key={ballIndex}
							sx={{
								width: "15px",
								height: "15px",
								borderRadius: "50%",
								backgroundColor:
									ballIndex < filledCircles
										? color
										: "transparent",
								border: `2px solid ${color}`,
								marginRight: "3px",
								transition: "all 0.3s ease",
								"&:hover": {
									transform: "scale(1.2)",
									boxShadow: `0 0 10px ${color}`,
								},
							}}
						/>
					))}
				</Box>
			</Grid>
		)
	}

	return (
		<Box
			className="border p-5 rounded-lg relative flex flex-col"
			sx={{
				minHeight: "450px",
				height: "auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<TitreStylise variant="h5" className="mb-4 text-center">
				Mes Loisirs et Interets
			</TitreStylise>
			<Box
				className="flex-grow"
				style={{
					minHeight: "350px",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<Grid
					container
					spacing={2}
					justifyContent="center"
					alignItems="flex-start"
				>
					{poleLoisirInterets.map(renderInteretItem)}
				</Grid>
			</Box>
			<Box className="mt-4 text-center">
				{!printMode && !hideModifyButton && onModifier && (
					<Button
						onClick={onModifier}
						variant="outlined"
						color="primary"
					>
						Modifier les centres d'intérêt
					</Button>
				)}
			</Box>
		</Box>
	)
}

export default CentresInteret
