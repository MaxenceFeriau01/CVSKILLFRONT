import React, { useEffect, useState } from "react"
import {
	Button,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import Swal from "sweetalert2"
import cvskillService from "../../api/services/cvskillService"
import CvSkillDto, { LocationState } from "../../api/models/cvskill"

interface polePersonnaliteType {
	id?: number
	personnaliteType: string
	associatedTraits: string[]
}

interface PersonalityType {
	type: string
	traits: string[]
}

const personalityTypes: PersonalityType[] = [
	{
		type: "Animateur (ENFJ)",
		traits: ["Empathique", "Loyal", "Responsable", "Meneur"],
	},
	{
		type: "Communicateur (ENFP)",
		traits: ["Enthousiate", "Créatif", "Flexible", "Altruiste"],
	},
	{ type: "Meneur (ENTJ)", traits: ["Direct", "Franc", "Décidé", "Leader"] },
	{
		type: "Innovateur (ENTP)",
		traits: ["Ingénieux", "Polyvalent", "Créatif", "Décideur"],
	},
	{
		type: "Nouricier (ESFJ)",
		traits: ["Coopératif", "Consciencieux", "Empathique", "Persévérant"],
	},
	{
		type: "Le bout en train (ESFP)",
		traits: ["Tolérant", "Enthousiate", "Sociable", "Adaptable"],
	},
	{
		type: "Organisateur (ESTJ)",
		traits: ["Pratique", "Réaliste", "Factuel", "Efficace"],
	},
	{
		type: "Pragmatique (ESTP)",
		traits: ["Flexible", "Tolérant", "Observateur", "Réaliste"],
	},
	{
		type: "Visionnaire (INFJ)",
		traits: ["Altruiste", "Original", "Persévérant", "Mesuré"],
	},
	{
		type: "Zélateur (INFP)",
		traits: ["Idéaliste", "Curieux", "Adaptable", "Tolérant"],
	},
	{
		type: "Perfectionniste (INTJ)",
		traits: ["Indépendant", "Déterminé", "Critique", "Organisé"],
	},
	{
		type: "Concepteur (INTP)",
		traits: ["Réservé", "Souple", "Critique", "Analytique"],
	},
	{
		type: "Protecteur (ISFJ)",
		traits: ["Responsable", "Consciencieux", "Altruiste", "Prévenant"],
	},
	{
		type: "Conciliateur (ISFP)",
		traits: ["Mesuré", "Tranquille", "Aimable", "Autonome"],
	},
	{
		type: "Administrateur (ISTJ)",
		traits: ["Sérieux", "Minutieux", "Efficace", "Responsable"],
	},
	{
		type: "Praticien (ISTP)",
		traits: ["Observateur", "Calme", "Mesuré", "Curieux"],
	},
]

function PolePersonnalite2() {
	const [selectedType, setSelectedType] = useState<string>("")
	const [error, setError] = useState<string | null>(null)
	const location = useLocation()
	const navigate = useNavigate()
	const state = location.state as LocationState
	const [userId, setUserId] = useState<number | null>(null)
	const [cvSkillId, setCvSkillId] = useState<number | null>(null)
	const { editMode } = state

	useEffect(() => {
		const fetchData = async () => {
			const storedUserId = localStorage.getItem("selectedUserId")
			const storedCvSkillId = localStorage.getItem("selectedCvSkillId")

			try {
				if (!storedUserId) {
					throw new Error("ID utilisateur sélectionné non trouvé")
				}
				setUserId(Number(storedUserId))

				if (storedCvSkillId) {
					setCvSkillId(Number(storedCvSkillId))
					const cvSkill = await cvskillService.getCvSkillById(
						Number(storedCvSkillId)
					)
					if (
						cvSkill &&
						cvSkill.polePersonnalitesTypes &&
						cvSkill.polePersonnalitesTypes.length > 0
					) {
						setSelectedType(
							cvSkill.polePersonnalitesTypes[0].personnaliteType
						)
					}
				} else {
					const storedType = localStorage.getItem(
						`selectedPersonalityType-${storedUserId}`
					)
					if (storedType) {
						setSelectedType(storedType)
					}
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des données:",
					error
				)
				setError(
					"Impossible de récupérer les données. Veuillez réessayer."
				)
			}
		}

		fetchData()
	}, [editMode])

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newType = event.target.value
		setSelectedType(newType)
		setError(null)

		if (!editMode && userId) {
			const selectedPersonality = personalityTypes.find(
				p => p.type === newType
			)
			if (selectedPersonality) {
				localStorage.setItem(
					`selectedPersonalityType-${userId}`,
					newType
				)
				localStorage.setItem(
					`selectedAssociatedTraits-${userId}`,
					JSON.stringify(selectedPersonality.traits)
				)
			}
		}
	}

	const updateCvSkillMutation = useMutation<
		CvSkillDto,
		Error,
		{ id: number; cvSkillDto: CvSkillDto; userId: number }
	>(
		({ id, cvSkillDto, userId }) =>
			cvskillService.updateCvSkill(id, cvSkillDto, userId),
		{
			onSuccess: () => {
				Swal.fire({
					icon: "success",
					title: "Type de personnalité mis à jour avec succès",
					showConfirmButton: false,
					timer: 1500,
				})
				navigate("/cvskill/Cvskillend", {
					state: { userId, cvSkillId },
				})
			},
			onError: error => {
				console.error(
					"Erreur lors de la mise à jour du type de personnalité:",
					error
				)
				setError("Erreur lors de la mise à jour. Veuillez réessayer.")
			},
		}
	)

	const handleSubmit = async () => {
		if (!userId) {
			setError("ID utilisateur manquant. Impossible de continuer.")
			return
		}

		const selectedPersonality = personalityTypes.find(
			p => p.type === selectedType
		)
		if (!selectedPersonality) {
			setError("Veuillez sélectionner un type de personnalité.")
			return
		}

		const personalityData: polePersonnaliteType = {
			personnaliteType: selectedPersonality.type,
			associatedTraits: selectedPersonality.traits,
		}

		if (editMode && cvSkillId) {
			try {
				const currentCvSkill = await cvskillService.getCvSkillById(
					cvSkillId
				)
				const updatedCvSkill: CvSkillDto = new CvSkillDto({
					...currentCvSkill,
					polePersonnalitesTypes: [personalityData],
				})
				updateCvSkillMutation.mutate({
					id: cvSkillId,
					cvSkillDto: updatedCvSkill,
					userId,
				})
			} catch (error) {
				console.error(
					"Erreur lors de la récupération du CV Skill:",
					error
				)
				setError("Erreur lors de la mise à jour. Veuillez réessayer.")
			}
		} else {
			localStorage.setItem(
				`selectedPersonalityType-${userId}`,
				selectedType
			)
			localStorage.setItem(
				`selectedAssociatedTraits-${userId}`,
				JSON.stringify(selectedPersonality.traits)
			)
			navigate("/cvskill/PoleAtouts", {
				state: {
					...state,
					userId,
					cvSkillId,
					polePersonnalitesTypes: [personalityData],
				},
			})
		}
	}
	return (
		<div className="container mx-auto p-4 max-w-md relative overflow-y-auto h-[calc(100vh-8rem)] pb-16">
			<style>{`
                .container::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
			<h2 className="text-2xl font-bold text-green-500 text-center mb-6">
				{editMode
					? "Modifier le type de personnalité"
					: "Pôle Personnalité"}
			</h2>
			{error && <p className="text-red-500 text-center mb-4">{error}</p>}
			<p className="mt-6 font-bold">Partie 2</p>
			<FormControl component="fieldset">
				<RadioGroup
					aria-label="personality type"
					name="personality-type"
					value={selectedType}
					onChange={handleRadioChange}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{personalityTypes.map(personality => (
							<div
								key={personality.type}
								className="border p-4 rounded-lg"
							>
								<FormControlLabel
									value={personality.type}
									control={
										<Radio className="text-blue-500 focus:ring-blue-500" />
									}
									label={
										<div>
											<p className="font-semibold">
												{personality.type}
											</p>
											<p className="text-sm text-gray-600">
												{personality.traits.join(", ")}
											</p>
										</div>
									}
								/>
							</div>
						))}
					</div>
				</RadioGroup>
			</FormControl>
			<div className="mt-8 flex justify-center">
				<Button
					onClick={handleSubmit}
					variant="contained"
					color="primary"
					className="w-full mt-6 py-2 px-4 MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-4sfg2-MuiButton-root"
					disabled={!selectedType}
				>
					{editMode ? "Mettre à jour" : "Sauvegarder le choix"}
				</Button>
			</div>
		</div>
	)
}

export default PolePersonnalite2
