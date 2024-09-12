import React, { useEffect, useState } from "react"
import { Button, InputLabel, TextField, Typography } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import userService from "../../api/services/userService"
import User from "../../api/models/user"
import { LocationState } from "../../api/models/cvskill"
import "./cv-skill.scss"
import cvskillService from "../../api/services/cvskillService"

function Cvskillpage() {
	const [userData, setUserData] = useState<User | null>(null)
	const navigate = useNavigate()
	const location = useLocation()
	const [loading, setLoading] = useState(true)
	const state = location.state as LocationState | null
	const { editMode, cvSkillId, userId } = state || {}

	useEffect(() => {
		const fetchData = async () => {
			const storedUserId = localStorage.getItem("selectedUserId")
			if (storedUserId) {
				try {
					setLoading(true)
					const user = await userService.getById(Number(storedUserId))
					setUserData(user)

					// Vérifier si un CV Skill existe déjà pour cet utilisateur
					const existingCvSkill =
						await cvskillService.getCvSkillsByUserId(
							Number(storedUserId)
						)

					if (existingCvSkill) {
						// Si un CV Skill existe, rediriger vers la page de modification
						navigate("/cvskill/Cvskillend", {
							state: {
								editMode: true,
								cvSkillId: existingCvSkill.id,
								userId: Number(storedUserId),
							},
						})
						return
					}

					if (editMode && cvSkillId) {
						const cvSkill = await cvskillService.getCvSkillById(
							cvSkillId
						)
						localStorage.setItem(
							`cvSkill-${cvSkillId}`,
							JSON.stringify(cvSkill)
						)
					}
				} catch (error) {
					console.error(
						"Erreur lors de la récupération des données :",
						error
					)
				} finally {
					setLoading(false)
				}
			}
		}

		fetchData()
	}, [editMode, cvSkillId, navigate])

	const handleContinue = () => {
		navigate("/cvSkill/poleloisirsInteret", {
			state: {
				...state,
				userId: userData?.id || userId,
			},
		})
	}

	if (!userData) {
		return <Typography>Chargement des données utilisateur...</Typography>
	}

	return (
		<div className="container mx-auto p-4 max-w-md relative overflow-y-auto h-[calc(100vh-8rem)] pb-16">
			<style>{`
        .container::-webkit-scrollbar {
        display: none;
        }
    `}</style>
			<h2 className="text-2xl font-bold text-green-500 text-center mb-6">
				Pôle Civilité
			</h2>

			<div className="space-y-4 mt-16">
				<div className="mb-4">
					<div className="">
						<InputLabel className="block text-sm font-medium text-gray-700 mb-1">
							Civilité
						</InputLabel>
						<TextField
							value={userData.civility || ""}
							variant="outlined"
							fullWidth
							InputProps={{
								readOnly: true,
								className:
									"rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
							}}
						/>
					</div>

					<TextField
						value={userData.name || ""}
						label="Nom"
						variant="outlined"
						fullWidth
						className="mt-4"
						InputProps={{
							readOnly: true,
							className:
								"rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
						}}
					/>

					<TextField
						value={userData.firstName || ""}
						label="Prénom"
						variant="outlined"
						fullWidth
						className="mt-4"
						InputProps={{
							readOnly: true,
							className:
								"rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
						}}
					/>

					<TextField
						value={userData.phone || ""}
						label="Téléphone"
						variant="outlined"
						fullWidth
						className="mt-4"
						InputProps={{
							readOnly: true,
							className:
								"rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
						}}
					/>

					<TextField
						value={userData.email || ""}
						label="Email"
						variant="outlined"
						fullWidth
						className="mt-4"
						InputProps={{
							readOnly: true,
							className:
								"rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
						}}
					/>

					<TextField
						value={userData.dateOfBirth || ""}
						label="Date de naissance"
						variant="outlined"
						fullWidth
						className="mt-4"
						InputProps={{
							readOnly: true,
							className:
								"rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
						}}
					/>

					<TextField
						value={userData.diploma || ""}
						label="Diplôme ou niveau d'études"
						variant="outlined"
						fullWidth
						className="mt-4"
						InputProps={{
							readOnly: true,
							className:
								"rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
						}}
					/>
				</div>

				<Button
					variant="contained"
					color="primary"
					onClick={handleContinue}
					className="w-full mt-6"
				>
					Continuer
				</Button>
			</div>
		</div>
	)
}

export default Cvskillpage
