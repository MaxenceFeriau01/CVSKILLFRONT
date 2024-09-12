import { Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import Swal from "sweetalert2"
import { LocationState } from "../../api/models/cvskill"
import cvskillService from "../../api/services/cvskillService"
import userService from "../../api/services/userService"

interface AtoutType {
	id: string
	name: string
}

const atouts: AtoutType[] = [
	{ id: "1", name: "Adaptation" },
	{ id: "2", name: "Organisation" },
	{ id: "3", name: "Rigueur" },
	{ id: "4", name: "Dynamisme" },
	{ id: "5", name: "Ténacité" },
	{ id: "6", name: "Travail en équipe" },
	{ id: "7", name: "Négociation" },
	{ id: "8", name: "Respect des règles" },
	{ id: "9", name: "Sociabilité" },
	{ id: "10", name: "Maîtrise émotionnelle" },
	{ id: "11", name: "Autonomie" },
	{ id: "12", name: "Ambition" },
	{ id: "13", name: "Goût du challenge" },
	{ id: "14", name: "Leadership" },
	{ id: "15", name: "Réflexion" },
	{ id: "16", name: "Altruisme" },
	{ id: "17", name: "Sens du service" },
]

function PoleAtouts() {
	const [selectedAtouts, setSelectedAtouts] = useState<string[]>([])
	const [error, setError] = useState<string | null>(null)
	const location = useLocation()
	const state = location.state as LocationState
	const [userId, setUserId] = useState<number | null>(null)
	const [cvSkillId, setCvSkillId] = useState<number | null>(null)
	const { editMode } = state

	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const storedUserId = localStorage.getItem("selectedUserId")
				const storedCvSkillId =
					localStorage.getItem("selectedCvSkillId")

				if (!storedUserId) {
					throw new Error("ID utilisateur sélectionné non trouvé")
				}
				setUserId(Number(storedUserId))

				if (storedCvSkillId) {
					setCvSkillId(Number(storedCvSkillId))
				}

				if (editMode && storedCvSkillId) {
					const cvSkill = await cvskillService.getCvSkillById(
						Number(storedCvSkillId)
					)
					if (cvSkill && cvSkill.poleAtouts) {
						setSelectedAtouts(
							cvSkill.poleAtouts.map(atout => atout.atout)
						)
					}
				} else {
					const storedAtouts = localStorage.getItem(
						`selectedAtouts-${storedUserId}`
					)
					if (storedAtouts) {
						setSelectedAtouts(JSON.parse(storedAtouts))
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
		let updatedAtouts: string[]
		if (checked) {
			if (selectedAtouts.length >= 5) {
				setError("Vous ne pouvez sélectionner que 5 choix maximum.")
				return
			}
			updatedAtouts = [...selectedAtouts, name]
		} else {
			updatedAtouts = selectedAtouts.filter(item => item !== name)
		}
		setSelectedAtouts(updatedAtouts)
		setError(null)

		if (!editMode && userId) {
			localStorage.setItem(
				`selectedAtouts-${userId}`,
				JSON.stringify(updatedAtouts)
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
					title: "Atouts mis à jour avec succès",
					showConfirmButton: false,
					timer: 1500,
				})
				navigate("/cvskill/Cvskillend", {
					state: { userId, cvSkillId },
				})
			},
			onError: error => {
				console.error(
					"Erreur lors de la mise à jour des atouts:",
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

		const atoutsData = selectedAtouts.map(atout => ({ atout }))

		if (editMode && cvSkillId) {
			try {
				const currentCvSkill = await cvskillService.getCvSkillById(
					cvSkillId
				)
				const updatedCvSkill = {
					...currentCvSkill,
					poleAtouts: atoutsData,
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
				`selectedAtouts-${userId}`,
				JSON.stringify(selectedAtouts)
			)
			navigate("/cvskill/poleInterets", {
				state: {
					...state,
					userId,
					cvSkillId,
					poleAtouts: atoutsData,
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
				{editMode ? "Modifier vos atouts" : "Pôle Atouts"}
			</h2>
			{error && <p className="text-red-500 text-center">{error}</p>}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				{atouts.map(atout => (
					<div key={atout.id} className="border p-4 rounded-lg">
						<label
							htmlFor={atout.id}
							className="flex items-center space-x-3 cursor-pointer"
						>
							<input
								type="checkbox"
								id={atout.id}
								name={atout.name}
								checked={selectedAtouts.includes(atout.name)}
								onChange={handleChange}
								className="h-5 w-5 text-green-500 border-green-500 focus:ring-green-500"
							/>
							<span className="text-gray-700 font-semibold">
								{atout.name}
							</span>
						</label>
					</div>
				))}
			</div>
			<p className="mt-4 font-bold text-center text-red-500">
				*5 choix maximum
			</p>
			<div className="flex justify-center mt-8">
				<Button
					onClick={handleSubmit}
					variant="contained"
					color="primary"
					className="w-full mt-6 py-2 px-4 MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-4sfg2-MuiButton-root"
					disabled={
						selectedAtouts.length < 3 || selectedAtouts.length > 5
					}
				>
					{editMode
						? "Mettre à jour les atouts"
						: "Sauvegarder les choix"}
				</Button>
			</div>
		</div>
	)
}

export default PoleAtouts
