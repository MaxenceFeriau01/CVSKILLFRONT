import React, { forwardRef } from "react"
import { Box, Grid, styled, Typography } from "@mui/material"
import CvSkillDto from "../../api/models/cvskill"
import InformationsPersonnelles from "./InformationsPersonnellesProps"
import CentresInteret from "./CentresInteretProp"
import DiagrammePersonnalite from "./diagrammePersonnaliteProps"
import DiagrammeAtouts from "./DiagrammeAtoutsProps"
import CercleInterets from "./InterestsCircle"

interface CvSkillPrintProps {
	cvSkillData: CvSkillDto
	photoUrl: string | null
}

const PrintContainer = styled(Box)`
	@media print {
		width: 210mm;
		height: 297mm;
		overflow: hidden;
		page-break-after: always;
	}
`

const ScaledContent = styled(Box)`
	@media print {
		transform-origin: top left;
		transform: scale(0.5);
		width: 142.86%;
		height: 142.86%;
	}
`

const PrintImage = styled("img")`
	width: 150px;
	height: 150px;
	border-radius: 50%;
	margin: 0 auto;
`

const CvSkillPrint = forwardRef<HTMLDivElement, CvSkillPrintProps>(
	({ cvSkillData, photoUrl }, ref) => {
		if (!cvSkillData) {
			return <Typography>Données CV Skill non disponibles</Typography>
		}

		return (
			<PrintContainer ref={ref}>
				<ScaledContent>
					<Grid container spacing={4}>
						{/* Colonne de gauche */}
						<Grid item xs={12} md={4}>
							<Box sx={{ textAlign: "center", mb: 4 }}>
								{photoUrl ? (
									<PrintImage src={photoUrl} alt="Profil" />
								) : (
									<Typography>Aucune photo</Typography>
								)}
							</Box>
							<InformationsPersonnelles
								user={cvSkillData.user}
								onEditInfo={() => {}}
								compact
							/>
							<Box mt={4}>
								<CentresInteret
									poleLoisirInterets={
										cvSkillData.poleLoisirInterets
									}
									onModifier={() => {}}
									compact
								/>
							</Box>
						</Grid>
						{/* Colonne de droite */}
						<Grid item xs={12} md={8}>
							<DiagrammePersonnalite
								polePersonnalitesTypes={
									cvSkillData.polePersonnalitesTypes || []
								}
								polePersonnaliteTraits={
									cvSkillData.polePersonnaliteTraits || []
								}
								onModifierType={() => {}}
								onModifierTraits={() => {}}
								isAdmin={false}
								compact
							/>
							<Box mt={4}>
								<DiagrammeAtouts
									atouts={cvSkillData.poleAtouts || []}
									onModifier={() => {}}
									isAdmin={false}
									compact
								/>
							</Box>
							<Box mt={4}>
								<CercleInterets
									interets={
										cvSkillData.poleInterets?.map(
											interet => interet.interet
										) || []
									}
									onModifier={() => {}}
									isAdmin={false}
									compact
								/>
							</Box>
						</Grid>
					</Grid>
				</ScaledContent>
			</PrintContainer>
		)
	}
)

export default CvSkillPrint
