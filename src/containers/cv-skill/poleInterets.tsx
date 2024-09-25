/* eslint-disable object-shorthand */
import React, { useEffect, useState } from "react"
import { useMutation } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Typography, CircularProgress } from "@mui/material"
import Swal from "sweetalert2"
import CvSkill, {
	LocationState,
	PoleLoisirInteretType,
} from "../../api/models/cvskill"
import cvskillService from "../../api/services/cvskillService"

const INTERESTS = [
	{ id: "1", name: "Activités extérieures" },
	{ id: "2", name: "Activités manuelles et techniques" },
	{ id: "3", name: "Curiosité intellectuelle et apprentissage" },
	{ id: "4", name: "Science et technologie" },
	{ id: "5", name: "Sens esthétique et expression" },
	{ id: "6", name: "Créativité et conception" },
	{ id: "7", name: "Dévouement aux autres" },
	{ id: "8", name: "Relations personnelles" },
	{ id: "9", name: "Entrepreneur" },
	{ id: "10", name: "Leadership" },
	{ id: "11", name: "Méthodique" },
	{ id: "12", name: "Données et nombres" },
]

function PoleInterets() {
	const [selectedInterests, setSelectedInterests] = useState<string[]>([])
	const [poleLoisirInterets, setPoleLoisirInterets] = useState<
		Array<{ name: string; type: PoleLoisirInteretType }>
	>([])
	const [error, setError] = useState<string | null>(null)
	const [userId, setUserId] = useState<number | null>(null)
	const [cvSkillId, setCvSkillId] = useState<number | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const location = useLocation()
	const navigate = useNavigate()
	const { editMode } = (location.state as LocationState) || {
		editMode: false,
	}

	// Effet pour charger les données initiales
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const storedUserId = localStorage.getItem("selectedUserId")
				const storedCvSkillId =
					localStorage.getItem("selectedCvSkillId")

				if (!storedUserId)
					throw new Error("ID utilisateur sélectionné non trouvé")
				setUserId(Number(storedUserId))
				if (storedCvSkillId) setCvSkillId(Number(storedCvSkillId))

				if (editMode && storedCvSkillId) {
					const cvSkill = await cvskillService.getCvSkillById(
						Number(storedCvSkillId)
					)
					if (cvSkill) {
						if (cvSkill.poleInterets) {
							setSelectedInterests(
								cvSkill.poleInterets.map(
									interet => interet.interet
								)
							)
						}
						if (cvSkill.poleLoisirInterets) {
							setPoleLoisirInterets(cvSkill.poleLoisirInterets)
						}
					}
				} else {
					const storedInterests = localStorage.getItem(
						`selectedInterests-${storedUserId}`
					)
					if (storedInterests)
						setSelectedInterests(JSON.parse(storedInterests))

					const storedPoleLoisirInterets = localStorage.getItem(
						`poleLoisirInterets-${storedUserId}`
					)
					if (storedPoleLoisirInterets)
						setPoleLoisirInterets(
							JSON.parse(storedPoleLoisirInterets)
						)
				}
			} catch (error) {
				setError(
					"Impossible de récupérer les données. Veuillez réessayer."
				)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [editMode])

	// Mutation pour créer un nouveau CV Skill
	const createCvSkillMutation = useMutation(
		(newCvSkill: Partial<CvSkill>) => {
			if (!userId) throw new Error("User ID invalide")
			return cvskillService.createCvSkill(newCvSkill as CvSkill, userId)
		},
		{
			onMutate: () => setIsLoading(true),
			onSuccess: (data: CvSkill) => {
				if (data.id) {
					localStorage.setItem(
						"selectedCvSkillId",
						data.id.toString()
					)
					Swal.fire({
						icon: "success",
						title: "CV Skill créé avec succès",
						showConfirmButton: false,
						timer: 1500,
					})
					navigate("/cvskill/Cvskillend", {
						state: { userId, cvSkillId: data.id },
					})
				} else {
					setError(
						"Erreur lors de la création du CV Skill: ID non défini"
					)
				}
			},
			onError: (error: any) => {
				setError(
					error.response?.data?.message ||
						"Erreur inconnue lors de la création"
				)
			},
			onSettled: () => setIsLoading(false),
		}
	)

	// Mutation pour mettre à jour un CV Skill existant
	const updateCvSkillMutation = useMutation(
		(updatedCvSkill: Partial<CvSkill>) => {
			if (!cvSkillId || !userId)
				throw new Error("CV Skill ID ou User ID invalide")
			return cvskillService.updateCvSkill(
				cvSkillId,
				updatedCvSkill as CvSkill,
				userId
			)
		},
		{
			onMutate: () => setIsLoading(true),
			onSuccess: () => {
				Swal.fire({
					icon: "success",
					title: "Intérêts mis à jour avec succès",
					showConfirmButton: false,
					timer: 1500,
				})
				navigate("/cvskill/Cvskillend", {
					state: { userId, cvSkillId },
				})
			},
			onError: (error: any) => {
				setError(
					error.response?.data?.message ||
						"Erreur lors de la mise à jour. Veuillez réessayer."
				)
			},
			onSettled: () => setIsLoading(false),
		}
	)

	// Gestion du changement de sélection des intérêts
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target
		let updatedInterests: string[]

		if (checked) {
			if (selectedInterests.length >= 6) {
				setError("Vous ne pouvez sélectionner que 6 choix maximum.")
				return
			}
			updatedInterests = [...selectedInterests, name]
		} else {
			updatedInterests = selectedInterests.filter(item => item !== name)
		}

		setSelectedInterests(updatedInterests)
		setError(null)

		if (!editMode && userId) {
			localStorage.setItem(
				`selectedInterests-${userId}`,
				JSON.stringify(updatedInterests)
			)
		}
	}

	// Gestion de la soumission du formulaire
	const handleSubmit = async () => {
		if (!userId) {
			setError("ID utilisateur manquant. Impossible de continuer.")
			return
		}

		if (selectedInterests.length < 3 || selectedInterests.length > 6) {
			setError("Veuillez sélectionner entre 3 et 6 intérêts.")
			return
		}

		const interetsData = selectedInterests.map(interet => ({ interet }))

		if (editMode && cvSkillId) {
			try {
				const currentCvSkill = await cvskillService.getCvSkillById(
					cvSkillId
				)
				const updatedCvSkill: Partial<CvSkill> = {
					...currentCvSkill,
					poleInterets: interetsData,
					poleLoisirInterets: poleLoisirInterets,
				}
				updateCvSkillMutation.mutate(updatedCvSkill)
			} catch {
				setError("Erreur lors de la mise à jour. Veuillez réessayer.")
			}
		} else {
			const storedAtouts = JSON.parse(
				localStorage.getItem(`selectedAtouts-${userId}`) || "[]"
			)
			const storedPersonalityTraits = JSON.parse(
				localStorage.getItem(`selectedPersonalityTraits-${userId}`) ||
					"[]"
			)
			const storedPersonalityType =
				localStorage.getItem(`selectedPersonalityType-${userId}`) || ""
			const storedAssociatedTraits = JSON.parse(
				localStorage.getItem(`selectedAssociatedTraits-${userId}`) ||
					"[]"
			)

			if (
				!storedAtouts.length ||
				!storedPersonalityTraits.length ||
				!storedPersonalityType
			) {
				setError(
					"Certaines informations sont manquantes. Veuillez remplir toutes les sections."
				)
				return
			}

			const newCvSkill: Partial<CvSkill> = {
				poleAtouts: storedAtouts.map((atout: string) => ({ atout })),
				poleInterets: interetsData,
				polePersonnaliteTraits: storedPersonalityTraits.map(
					(trait: string) => ({ personnaliteTrait: trait })
				),
				polePersonnalitesTypes: [
					{
						personnaliteType: storedPersonalityType,
						associatedTraits: storedAssociatedTraits,
					},
				],
				poleLoisirInterets: poleLoisirInterets,
			}

			createCvSkillMutation.mutate(newCvSkill)
		}

		// Nettoyage du localStorage
		const itemsToRemove = [
			"selectedAtouts",
			"selectedPersonalityTraits",
			"selectedPersonalityType",
			"selectedAssociatedTraits",
			"selectedInterests",
			"poleLoisirInterets",
		]
		itemsToRemove.forEach(item =>
			localStorage.removeItem(`${item}-${userId}`)
		)
	}

	if (isLoading) return <CircularProgress />
	if (error) return <Typography color="error">{error}</Typography>

	return (
		<div className="container mx-auto p-4 max-w-md relative overflow-y-auto h-[calc(100vh-8rem)] pb-16">
			<style>{`
                .container::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
			<h2 className="text-2xl font-bold text-green-500 text-center mb-6">
				{editMode ? "Modifier vos intérêts" : "Mes Intérêts"}
			</h2>
			{error && <p className="text-red-500 text-center">{error}</p>}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				{INTERESTS.map(interest => (
					<div key={interest.id} className="border p-4 rounded-lg">
						<label
							htmlFor={interest.id}
							className="flex items-center space-x-3 cursor-pointer"
						>
							<input
								type="checkbox"
								id={interest.id}
								name={interest.name}
								checked={selectedInterests.includes(
									interest.name
								)}
								onChange={handleChange}
								className="h-5 w-5 text-green-500 border-green-500 focus:ring-green-500"
							/>
							<span className="text-gray-700 font-semibold">
								{interest.name}
							</span>
						</label>
					</div>
				))}
			</div>
			<p className="mt-4 font-bold text-center text-red-500">
				*3 à 6 choix
			</p>
			<div className="flex justify-center mt-8">
				<Button
					onClick={handleSubmit}
					variant="contained"
					color="primary"
					className="w-full mt-6 py-2 px-4 MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-4sfg2-MuiButton-root"
					disabled={
						selectedInterests.length < 3 ||
						selectedInterests.length > 6
					}
				>
					{editMode
						? "Mettre à jour les intérêts"
						: "Sauvegarder les choix"}
				</Button>
			</div>
		</div>
	)
}

export default PoleInterets
