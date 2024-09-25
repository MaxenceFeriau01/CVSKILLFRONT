/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react"
import { Button, InputLabel, TextField, Typography } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import userService from "../../api/services/userService"
import cvskillService from "../../api/services/cvskillService"
import User from "../../api/models/user"
import { LocationState } from "../../api/models/cvskill"
import "./cv-skill.scss"

function Cvskillpage() {
	const [userData, setUserData] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const location = useLocation()
	const state = location.state as LocationState | null
	const { editMode, cvSkillId, userId } = state || {}

	useEffect(() => {
		const fetchData = async () => {
			const storedUserId = localStorage.getItem("selectedUserId")
			if (!storedUserId) return

			try {
				setLoading(true)
				const user = await userService.getById(Number(storedUserId))
				setUserData(user)

				// Vérification de l'existence d'un CV Skill pour l'utilisateur
				const existingCvSkill =
					await cvskillService.getCvSkillsByUserId(
						Number(storedUserId)
					)

				if (existingCvSkill) {
					// Redirection vers la page de modification si un CV Skill existe
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
				// Gestion silencieuse de l'erreur
			} finally {
				setLoading(false)
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

	if (loading) {
		return <Typography>Chargement des données utilisateur...</Typography>
	}

	if (!userData) {
		return <Typography>Aucune donnée utilisateur trouvée.</Typography>
	}

	// Liste des champs à afficher
	const fields = [
		{ label: "Civilité", value: userData.civility },
		{ label: "Nom", value: userData.name },
		{ label: "Prénom", value: userData.firstName },
		{ label: "Téléphone", value: userData.phone },
		{ label: "Email", value: userData.email },
		{ label: "Date de naissance", value: userData.dateOfBirth },
		{ label: "Diplôme ou niveau d'études", value: userData.diploma },
	]

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
				{fields.map((field, index) => (
					<div key={index} className="mb-4">
						<InputLabel className="block text-sm font-medium text-gray-700 mb-1">
							{field.label}
						</InputLabel>
						<TextField
							value={field.value || ""}
							variant="outlined"
							fullWidth
							InputProps={{
								readOnly: true,
								className:
									"rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
							}}
						/>
					</div>
				))}

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
