/* eslint-disable no-nested-ternary */
import React, { useState, useMemo } from "react"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import {
	TextField,
	Autocomplete,
	Button,
	Typography,
	Box,
	CircularProgress,
} from "@mui/material"
import userService from "../../api/services/userService"
import cvskillService from "../../api/services/cvskillService"
import User from "../../api/models/user"
import CvSkillDto from "../../api/models/cvskill"

function CvSkillHome() {
	const [searchInput, setSearchInput] = useState("")
	const [selectedUser, setSelectedUser] = useState<User | null>(null)
	const navigate = useNavigate()

	// Récupération de tous les utilisateurs
	const { data: users, isLoading: isLoadingUsers } = useQuery<User[], Error>(
		"allUsers",
		userService.getAllUsers
	)

	// Filtrage des utilisateurs basé sur la saisie de recherche
	const filteredUsers = useMemo(() => {
		if (!users || searchInput.length < 4) return []
		return users.filter((user: User) =>
			`${user.firstName} ${user.name}`
				.toLowerCase()
				.includes(searchInput.toLowerCase())
		)
	}, [users, searchInput])

	// Récupération du CV Skill pour l'utilisateur sélectionné
	const { data: cvSkill, isLoading: isLoadingCvSkill } = useQuery<
		CvSkillDto | null,
		Error
	>(
		["cvSkill", selectedUser?.id],
		() =>
			selectedUser?.id
				? cvskillService.getCvSkillsByUserId(Number(selectedUser.id))
				: null,
		{ enabled: !!selectedUser?.id }
	)

	// Gestion de la sélection d'un utilisateur
	const handleUserSelect = (user: User | null) => {
		setSelectedUser(user)
		if (user?.id) {
			localStorage.setItem("selectedUserId", user.id.toString())
		} else {
			localStorage.removeItem("selectedUserId")
		}
	}

	// Navigation vers la vue du CV Skill
	const handleViewCvSkill = () => {
		if (selectedUser?.id && cvSkill?.id) {
			localStorage.setItem("selectedUserId", selectedUser.id.toString())
			localStorage.setItem("selectedCvSkillId", cvSkill.id.toString())
			navigate("/cvskill/cvskillend")
		}
	}

	// Navigation vers la création d'un CV Skill
	const handleCreateCvSkill = () => {
		if (selectedUser?.id) {
			localStorage.setItem("selectedUserId", selectedUser.id.toString())
			navigate("/cvSkill/pageAcceuil")
		}
	}

	return (
		<Box className="container mx-auto p-4 max-w-md">
			<Typography
				variant="h4"
				className="text-green-500 text-center mb-6"
			>
				Rechercher votre CV Skill
			</Typography>

			<Autocomplete
				options={filteredUsers}
				getOptionLabel={(option: User) =>
					`${option.firstName || ""} ${option.name || ""}`.trim()
				}
				renderInput={params => (
					<TextField
						{...params}
						label="Rechercher un utilisateur"
						onChange={e => setSearchInput(e.target.value)}
					/>
				)}
				onChange={(_, newValue) => handleUserSelect(newValue)}
				loading={isLoadingUsers}
				className="mb-4"
				noOptionsText={
					searchInput.length < 4
						? "Entrez au moins 4 caractères"
						: "Aucun résultat"
				}
			/>

			{selectedUser && (
				<Box className="mt-4">
					<Typography variant="h6">
						Utilisateur sélectionné : {selectedUser.firstName}{" "}
						{selectedUser.name}
					</Typography>

					{isLoadingCvSkill ? (
						<CircularProgress />
					) : cvSkill ? (
						<Button
							variant="contained"
							color="primary"
							onClick={handleViewCvSkill}
							className="mt-2 text-center"
						>
							Voir le CV Skill
						</Button>
					) : (
						<Button
							variant="contained"
							color="secondary"
							onClick={handleCreateCvSkill}
							className="mt-2 center"
						>
							Créer un CV Skill
						</Button>
					)}
				</Box>
			)}
		</Box>
	)
}

export default CvSkillHome
