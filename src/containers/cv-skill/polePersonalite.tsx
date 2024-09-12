import { Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import Swal from "sweetalert2"
import { LocationState } from "../../api/models/cvskill"
import cvskillService from "../../api/services/cvskillService"
import userService from "../../api/services/userService"

interface CheckedItems {
	[key: string]: boolean
}

const items = [
	{ id: "1", name: "Sociabilité" },
	{ id: "2", name: "Esprit de compétition" },
	{ id: "3", name: "Conscience des autres" },
	{ id: "4", name: "Stabilité émotionnelle" },
	{ id: "5", name: "Intuition" },
	{ id: "6", name: "Méticulosité" },
	{ id: "7", name: "Sécurité - Pragmatisme" },
	{ id: "8", name: "Ouverture Imagination" },
]

function PolePersonnalite() {
	const [checkedItems, setCheckedItems] = useState<CheckedItems>({})
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()
	const location = useLocation()
	const state = location.state as LocationState
	const [userId, setUserId] = useState<number | null>(null)
	const [cvSkillId, setCvSkillId] = useState<number | null>(null)
	const { editMode } = state

	useEffect(() => {
		const fetchData = async () => {
			try {
				const storedUserId = localStorage.getItem("selectedUserId")
				const storedCvSkillId =
					localStorage.getItem("selectedCvSkillId")

				if (storedUserId) {
					setUserId(Number(storedUserId))
				} else {
					throw new Error("ID utilisateur sélectionné non disponible")
				}

				if (storedCvSkillId) {
					setCvSkillId(Number(storedCvSkillId))
				}

				if (editMode && storedCvSkillId) {
					const cvSkill = await cvskillService.getCvSkillById(
						Number(storedCvSkillId)
					)
					if (cvSkill && cvSkill.polePersonnaliteTraits) {
						const initialCheckedItems: CheckedItems = {}
						cvSkill.polePersonnaliteTraits.forEach(trait => {
							initialCheckedItems[trait.personnaliteTrait] = true
						})
						setCheckedItems(initialCheckedItems)
					}
				} else {
					const storedTraits = localStorage.getItem(
						`selectedPersonalityTraits-${storedUserId}`
					)
					if (storedTraits) {
						const parsedTraits = JSON.parse(storedTraits)
						const initialCheckedItems: CheckedItems = {}
						parsedTraits.forEach((trait: string) => {
							initialCheckedItems[trait] = true
						})
						setCheckedItems(initialCheckedItems)
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

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target
		const updatedCheckedItems = { ...checkedItems, [name]: checked }
		const checkedCount =
			Object.values(updatedCheckedItems).filter(Boolean).length

		if (checkedCount > 3) {
			setError("Vous ne pouvez sélectionner que 3 choix maximum.")
			return
		}

		setCheckedItems(updatedCheckedItems)
		setError(null)

		if (!editMode && userId) {
			localStorage.setItem(
				`selectedPersonalityTraits-${userId}`,
				JSON.stringify(
					Object.keys(updatedCheckedItems).filter(
						key => updatedCheckedItems[key]
					)
				)
			)
		}
	}

	const updateCvSkillMutation = useMutation(
		(updatedCvSkill: any) => {
			if (cvSkillId && userId) {
				return cvskillService.updateCvSkill(
					cvSkillId,
					updatedCvSkill,
					userId
				)
			}
			throw new Error("CV Skill ID ou User ID invalide")
		},
		{
			onSuccess: () => {
				Swal.fire({
					icon: "success",
					title: "Traits de personnalité mis à jour avec succès",
					showConfirmButton: false,
					timer: 1500,
				})
				navigate("/cvskill/Cvskillend", {
					state: { userId, cvSkillId },
				})
			},
			onError: error => {
				console.error(
					"Erreur lors de la mise à jour des traits de personnalité:",
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

		const selectedItems = Object.keys(checkedItems).filter(
			key => checkedItems[key]
		)

		if (selectedItems.length === 0) {
			setError("Veuillez sélectionner au moins un trait de personnalité.")
			return
		}

		const polePersonnaliteTraits = selectedItems.map(trait => ({
			personnaliteTrait: trait,
		}))

		if (editMode && cvSkillId) {
			try {
				const currentCvSkill = await cvskillService.getCvSkillById(
					cvSkillId
				)
				const updatedCvSkill = {
					...currentCvSkill,
					polePersonnaliteTraits,
				}
				updateCvSkillMutation.mutate(updatedCvSkill)
			} catch (error) {
				console.error(
					"Erreur lors de la récupération du CV Skill:",
					error
				)
				setError("Erreur lors de la mise à jour. Veuillez réessayer.")
			}
		} else {
			localStorage.setItem(
				`selectedPersonalityTraits-${userId}`,
				JSON.stringify(selectedItems)
			)
			navigate("/cvskill/polePersonnalite2", {
				state: {
					...state,
					userId,
					cvSkillId,
					polePersonnaliteTraits,
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
					? "Modifier les traits de personnalité"
					: "Pôle Personnalité"}
			</h2>
			<p className="mt-6 font-bold">Partie 1</p>
			{error && <p className="text-red-500 text-center">{error}</p>}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				{items.map(item => (
					<div key={item.id} className="border p-4 rounded-lg">
						<label
							htmlFor={item.id}
							className="flex items-center space-x-3 cursor-pointer"
						>
							<input
								type="checkbox"
								id={item.id}
								name={item.name}
								checked={checkedItems[item.name] || false}
								onChange={handleChange}
								className="h-5 w-5 text-green-500 border-green-500 focus:ring-green-500"
							/>
							<span className="text-gray-700 font-semibold">
								{item.name}
							</span>
						</label>
					</div>
				))}
			</div>
			<p className="mt-4 font-bold text-center text-red-500">
				*3 choix maximum
			</p>
			<div className="flex justify-center mt-8">
				<Button
					onClick={handleSubmit}
					variant="contained"
					color="primary"
					className="w-full mt-6 py-2 px-4 MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-4sfg2-MuiButton-root"
					disabled={
						Object.values(checkedItems).filter(Boolean).length ===
							0 ||
						Object.values(checkedItems).filter(Boolean).length > 3
					}
				>
					{editMode
						? "Mettre à jour les traits de personnalité"
						: "Page suivante"}
				</Button>
			</div>
		</div>
	)
}

export default PolePersonnalite