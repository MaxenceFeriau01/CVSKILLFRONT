/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import React from "react"
import { Box, Typography, Button, styled, Divider } from "@mui/material"
import UserCvSkillDto from "../../api/models/usercvskill"

interface InformationsPersonnellesProps {
	user: UserCvSkillDto | undefined
	onEditInfo: () => void
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

const InfoItem = styled(Box)`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.5rem;
`

const InfoLabel = styled(Typography)`
	font-weight: bold;
	color: #555;
`

const InfoValue = styled(Typography)`
	color: #333;
`

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
		{ label: "Civilité", value: user.civility },
		{ label: "Nom", value: user.name },
		{ label: "Prénom", value: user.firstName },
		{
			label: "Date de naissance",
			value: formatDateOfBirth(user.dateOfBirth),
		},
		{ label: "Diplôme", value: user.diploma || "Non spécifié" },
	]

	const contact = [
		{ label: "Email", value: user.email },
		{ label: "Téléphone", value: user.phone },
	]

	return (
		<Box className="border p-5 rounded-lg">
			<TitreStylise variant="h5">Informations Personnelles</TitreStylise>

			{infos.map((info, index) => (
				<InfoItem key={index}>
					<InfoLabel>{info.label}:</InfoLabel>
					<InfoValue>{info.value}</InfoValue>
				</InfoItem>
			))}

			<Divider sx={{ my: 2 }} />

			<TitreStylise gutterBottom>Contact</TitreStylise>
			{contact.map((info, index) => (
				<InfoItem key={index}>
					<InfoLabel>{info.label}:</InfoLabel>
					<InfoValue>{info.value}</InfoValue>
				</InfoItem>
			))}

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
