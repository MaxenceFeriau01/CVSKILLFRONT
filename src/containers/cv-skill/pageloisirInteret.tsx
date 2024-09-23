import React, { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useMutation } from "react-query"
import CvSkillDto, {
	LocationState,
	PoleLoisirInteretType,
} from "../../api/models/cvskill"
import cvskillService from "../../api/services/cvskillService"

interface PoleLoisirInteret {
	id?: number
	name: string
	type: PoleLoisirInteretType
}

function PoleLoisirsInterets() {
	const [selectedItems, setSelectedItems] = useState<PoleLoisirInteret[]>([])
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()
	const location = useLocation()
	const state = location.state as LocationState
	const [userId, setUserId] = useState<number | null>(null)
	const [cvSkillId, setCvSkillId] = useState<number | null>(null)
	const { editMode } = state

	const allItems = [
		// Sports
		{ name: "Sports de balle", type: PoleLoisirInteretType.SPORT },
		{ name: "Sports de raquettes", type: PoleLoisirInteretType.SPORT },
		{ name: "Sports de Combats", type: PoleLoisirInteretType.SPORT },
		{ name: "Sports cyclistes", type: PoleLoisirInteretType.SPORT },
		{ name: "Sports équestres", type: PoleLoisirInteretType.SPORT },
		{ name: "Sports gymniques", type: PoleLoisirInteretType.SPORT },
		{ name: "Sports athlétiques", type: PoleLoisirInteretType.SPORT },
		{ name: "Sports de glace", type: PoleLoisirInteretType.SPORT },
		{ name: "Sports de glisse", type: PoleLoisirInteretType.SPORT },
		// Intérêts
		{ name: "Arts plastiques", type: PoleLoisirInteretType.INTERET },
		{ name: "Cinéma", type: PoleLoisirInteretType.INTERET },
		{ name: "Cirque", type: PoleLoisirInteretType.INTERET },
		{ name: "Danse", type: PoleLoisirInteretType.INTERET },
		{ name: "Fête", type: PoleLoisirInteretType.INTERET },
		{ name: "Internet", type: PoleLoisirInteretType.INTERET },
		{ name: "Jeux", type: PoleLoisirInteretType.INTERET },
		{ name: "Lecture", type: PoleLoisirInteretType.INTERET },
		{ name: "Musique", type: PoleLoisirInteretType.INTERET },
		{ name: "Parcs de loisirs", type: PoleLoisirInteretType.INTERET },
		{ name: "Photographie", type: PoleLoisirInteretType.INTERET },
		{ name: "Radio", type: PoleLoisirInteretType.INTERET },
		{ name: "Télévision", type: PoleLoisirInteretType.INTERET },
		{ name: "Théâtre", type: PoleLoisirInteretType.INTERET },
		{ name: "Tourisme", type: PoleLoisirInteretType.INTERET },
		{ name: "Sport", type: PoleLoisirInteretType.INTERET },
		{ name: "Jeux vidéo", type: PoleLoisirInteretType.INTERET },
	]

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (state && state.userId) {
					setUserId(state.userId)
				} else {
					const storedUserId = localStorage.getItem("selectedUserId")
					if (storedUserId) {
						setUserId(Number(storedUserId))
					} else {
						throw new Error("ID utilisateur non trouvé")
					}
				}

				if (state && state.cvSkillId) {
					setCvSkillId(state.cvSkillId)
				} else {
					const storedCvSkillId =
						localStorage.getItem("selectedCvSkillId")
					if (storedCvSkillId) {
						setCvSkillId(Number(storedCvSkillId))
					}
				}

				if (cvSkillId) {
					const cvSkill = await cvskillService.getCvSkillById(
						cvSkillId
					)
					if (cvSkill && cvSkill.poleLoisirInterets) {
						setSelectedItems(cvSkill.poleLoisirInterets)
					}
				} else if (userId) {
					const storedItems = localStorage.getItem(
						`poleLoisirInterets-${userId}`
					)
					if (storedItems) {
						setSelectedItems(JSON.parse(storedItems))
					}
				}
				// eslint-disable-next-line no-shadow
			} catch (error) {
				setError(
					"Impossible de récupérer les données. Veuillez réessayer."
				)
			}
		}

		fetchData()
	}, [state, editMode])

	const handleChange = (item: PoleLoisirInteret) => {
		setSelectedItems(prev => {
			const isItemSelected = prev.some(
				i => i.name === item.name && i.type === item.type
			)
			let updated: PoleLoisirInteret[]

			if (isItemSelected) {
				updated = prev.filter(
					i => !(i.name === item.name && i.type === item.type)
				)
			} else {
				const sameTypeCount = prev.filter(
					i => i.type === item.type
				).length
				if (sameTypeCount >= 3) {
					setError(
						"Vous ne pouvez sélectionner que 3 choix maximum par catégorie."
					)
					return prev
				}
				updated = [...prev, item]
			}

			setError(null)
			return updated
		})
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
					title: "Loisirs et intérêts mis à jour avec succès",
					showConfirmButton: false,
					timer: 1500,
				})
				navigate("/cvskill/Cvskillend", {
					state: { userId, cvSkillId },
				})
			},
			onError: error => {
				console.error(
					"Erreur lors de la mise à jour des loisirs et intérêts:",
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

		if (selectedItems.length === 0) {
			setError(
				"Veuillez sélectionner au moins un sport ou un centre d'intérêt."
			)
			return
		}

		if (editMode && cvSkillId) {
			try {
				const currentCvSkill = await cvskillService.getCvSkillById(
					cvSkillId
				)
				const updatedCvSkill: CvSkillDto = new CvSkillDto({
					...currentCvSkill,
					poleLoisirInterets: selectedItems,
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
				`poleLoisirInterets-${userId}`,
				JSON.stringify(selectedItems)
			)
			navigate("/cvskill/polePersonnalite", {
				state: {
					...state,
					poleLoisirInterets: selectedItems,
				},
			})
		}
	}

	return (
		<div className="container mx-auto p-4 max-w-4xl relative overflow-y-auto h-[calc(100vh-8rem)] pb-16">
			<style>{`
                .container::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
			<h2 className="text-2xl font-bold text-green-500 text-center mb-6">
				{editMode
					? "Modifier vos loisirs et intérêts"
					: "Pôle Loisirs et Centres d'Intérêts"}
			</h2>
			{error && <p className="text-red-500 text-center">{error}</p>}

			<div className="flex flex-col md:flex-row justify-between">
				<div className="w-full md:w-1/2 pr-2">
					<h3 className="text-xl font-semibold mb-4">Sports</h3>
					<div className="grid grid-cols-1 gap-4">
						{allItems
							.filter(
								item =>
									item.type === PoleLoisirInteretType.SPORT
							)
							.map(item => (
								<div
									key={item.name}
									className="border p-4 rounded-lg"
								>
									<label
										htmlFor={item.name}
										className="flex items-center space-x-3 cursor-pointer"
									>
										<input
											type="checkbox"
											id={item.name}
											name={item.name}
											checked={selectedItems.some(
												i =>
													i.name === item.name &&
													i.type === item.type
											)}
											onChange={() => handleChange(item)}
											className="h-5 w-5 text-green-500 border-green-500 focus:ring-green-500"
										/>
										<span className="text-gray-700 font-semibold">
											{item.name}
										</span>
									</label>
								</div>
							))}
					</div>
				</div>

				<div className="w-full md:w-1/2 pl-2 mt-4 md:mt-0">
					<h3 className="text-xl font-semibold mb-4">
						Centres d'Intérêts
					</h3>
					<div className="grid grid-cols-1 gap-4">
						{allItems
							.filter(
								item =>
									item.type === PoleLoisirInteretType.INTERET
							)
							.map(item => (
								<div
									key={item.name}
									className="border p-4 rounded-lg"
								>
									<label
										htmlFor={item.name}
										className="flex items-center space-x-3 cursor-pointer"
									>
										<input
											type="checkbox"
											id={item.name}
											name={item.name}
											checked={selectedItems.some(
												i =>
													i.name === item.name &&
													i.type === item.type
											)}
											onChange={() => handleChange(item)}
											className="h-5 w-5 text-green-500 border-green-500 focus:ring-green-500"
										/>
										<span className="text-gray-700 font-semibold">
											{item.name}
										</span>
									</label>
								</div>
							))}
					</div>
				</div>
			</div>

			<p className="mt-4 font-bold text-center text-red-500">
				*3 choix maximum par catégorie
			</p>

			<div className="flex justify-center mt-8">
				<Button
					onClick={handleSubmit}
					variant="contained"
					color="primary"
					className="w-full max-w-md mt-6 py-2 px-4 MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-4sfg2-MuiButton-root"
					disabled={selectedItems.length === 0}
				>
					{editMode
						? "Mettre à jour les loisirs et intérêts"
						: "Page suivante"}
				</Button>
			</div>
		</div>
	)
}

export default PoleLoisirsInterets
