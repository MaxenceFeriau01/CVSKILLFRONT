/* eslint-disable prettier/prettier */
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

	const { data: users, isLoading: isLoadingUsers } = useQuery<User[], Error>(
		"allUsers",
		() => userService.getAllUsers()
	)

	const filteredUsers = useMemo(() => {
		if (!users || !Array.isArray(users) || searchInput.length < 4) return []
		return users.filter(
			(user: User) =>
				user &&
				typeof user.firstName === "string" &&
				typeof user.name === "string" &&
				`${user.firstName} ${user.name}`
					.toLowerCase()
					.includes(searchInput.toLowerCase())
		)
	}, [users, searchInput])

	const fetchCvSkill = async (userId: number): Promise<CvSkillDto | null> => {
		try {
			return await cvskillService.getCvSkillsByUserId(userId)
		} catch (error) {
			console.error("Error fetching CV Skill:", error)
			return null
		}
	}

	const { data: cvSkill, isLoading: isLoadingCvSkill } = useQuery<
		CvSkillDto | null,
		Error
	>(
		["cvSkill", selectedUser?.id],
		() =>
			selectedUser?.id
				? fetchCvSkill(Number(selectedUser.id))
				: Promise.resolve(null),
		{
			enabled: !!selectedUser?.id,
		}
	)

	const handleUserSelect = (user: User | null) => {
		setSelectedUser(user)
		if (user?.id) {
			localStorage.setItem("selectedUserId", user.id.toString())
		} else {
			localStorage.removeItem("selectedUserId")
		}
	}

	const handleViewCvSkill = () => {
		if (selectedUser?.id && cvSkill?.id) {
			localStorage.setItem("selectedUserId", selectedUser.id.toString())
			localStorage.setItem("selectedCvSkillId", cvSkill.id.toString())
			navigate("/cvskill/cvskillend")
		} else {
			console.error("User ID or CV Skill ID is missing")
		}
	}

	const handleCreateCvSkill = () => {
		if (selectedUser?.id) {
			localStorage.setItem("selectedUserId", selectedUser.id.toString())
			navigate("/cvSkill/pageAcceuil")
		} else {
			console.error("User ID is missing")
		}
	}

	return (
		<Box className="container mx-auto p-4 max-w-md">
			<h2 className="text-2xl font-bold text-green-500 text-center mb-6">
				Rechercher votre CV Skill
			</h2>

			<Autocomplete
				options={filteredUsers}
				getOptionLabel={(option: User) =>
					option
						? `${option.firstName || ""} ${
								option.name || ""
					}`.trim()
						: ""
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
