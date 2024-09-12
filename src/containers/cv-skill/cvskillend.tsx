/* eslint-disable react/function-component-definition */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback, useRef } from "react"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useNavigate, useLocation } from "react-router-dom"
import {
	Button,
	Typography,
	Box,
	CircularProgress,
	Grid,
	SvgIcon,
	Paper,
} from "@mui/material"
import Swal from "sweetalert2"
import cvskillService from "../../api/services/cvskillService"
import userService from "../../api/services/userService"
import CvSkillDto, { LocationState } from "../../api/models/cvskill"
import "./cv-skill.scss"

interface PuzzlePieceProps {
	title: string
	content: string
	color: string
	onClick: () => void
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
	title,
	content,
	color,
	onClick,
}) => (
	<Paper
		elevation={3}
		style={{
			width: "200px",
			height: "200px",
			margin: "10px",
			padding: "10px",
			backgroundColor: color,
			clipPath:
				"polygon(0% 25%, 25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%)",
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
		}}
	>
		<Typography variant="h6" align="center">
			{title}
		</Typography>
		<Typography variant="body2" align="center">
			{content}
		</Typography>
		<Button variant="contained" size="small" onClick={onClick}>
			Modifier
		</Button>
	</Paper>
)

function Cvskillend() {
	const navigate = useNavigate()
	const location = useLocation()
	const state = location.state as LocationState | null
	const [userId, setUserId] = useState<number | null>(null)
	const [cvSkillId, setCvSkillId] = useState<number | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const [isUploading, setIsUploading] = useState<boolean>(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const queryClient = useQueryClient()

	useEffect(() => {
		const fetchData = async () => {
			const storedUserId = localStorage.getItem("selectedUserId")
			const storedCvSkillId = localStorage.getItem("selectedCvSkillId")

			try {
				const userRoles = await userService.getUserRoles()
				const isAdminUser = userRoles.includes("ROLE_ADMIN")
				setIsAdmin(isAdminUser)

				if (storedUserId) {
					setUserId(Number(storedUserId))
				} else {
					setError("ID utilisateur non trouvé dans le localStorage")
				}

				if (storedCvSkillId) {
					setCvSkillId(Number(storedCvSkillId))
				} else {
					setError("ID du CV Skill non trouvé dans le localStorage")
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des données:",
					error
				)
				setError("Impossible de récupérer les données utilisateur")
				setUserId(null)
				setCvSkillId(null)
			}
		}

		fetchData()
	}, [])

	const {
		data: cvSkillData,
		isLoading: isCvSkillLoading,
		isError: isCvSkillError,
	} = useQuery<CvSkillDto | null, Error>(
		["cvSkill", cvSkillId],
		async () => {
			if (cvSkillId) {
				return cvskillService.getCvSkillById(cvSkillId)
			}
			throw new Error("Aucun ID de CV Skill disponible")
		},
		{
			enabled: !!cvSkillId,
			onError: (error: Error) => {
				console.error("Error fetching CV Skill data:", error.message)
				setError(error.message)
			},
		}
	)

	const { data: photoData, isLoading: isPhotoLoading } =
		useQuery<ArrayBuffer | null>(
			["photo", cvSkillId],
			() => (cvSkillId ? cvskillService.getPhoto(cvSkillId) : null),
			{
				enabled: !!cvSkillId,
			}
		)

	const photoUrl = photoData
		? URL.createObjectURL(new Blob([photoData], { type: "image/jpeg" }))
		: null

	const uploadPhotoMutation = useMutation(
		(file: File) => cvskillService.uploadPhoto(cvSkillId!, file),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["photo", cvSkillId])
				Swal.fire({
					icon: "success",
					title: "Photo uploadée avec succès",
					showConfirmButton: false,
					timer: 1500,
				})
			},
			onError: error => {
				console.error("Erreur lors de l'upload de la photo:", error)
				Swal.fire({
					icon: "error",
					title: "Erreur lors de l'upload de la photo",
					text: "Veuillez réessayer plus tard.",
				})
			},
		}
	)

	const deleteCvSkillMutation = useMutation(
		(id: number) => cvskillService.deleteCvSkill(id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["cvSkill", cvSkillId, userId])
				localStorage.removeItem("selectedCvSkillId")
				Swal.fire({
					icon: "success",
					title: "CV Skill supprimé avec succès",
					showConfirmButton: false,
					timer: 1500,
				})
				navigate("/companies")
			},
			onError: error => {
				console.error(
					"Erreur lors de la suppression du CV Skill:",
					error
				)
				Swal.fire({
					icon: "error",
					title: "Erreur lors de la suppression du CV Skill",
					text: "Veuillez réessayer plus tard.",
				})
			},
		}
	)

	const handlePhotoUpload = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0]
			if (file && cvSkillId) {
				uploadPhotoMutation.mutate(file)
			}
		},
		[cvSkillId, uploadPhotoMutation]
	)

	const handleEditPhotoClick = () => {
		fileInputRef.current?.click()
	}

	const handleEditPersonalInfo = () => {
		navigate("/my-profile", {
			state: {
				editMode: true,
				cvSkillId: cvSkillData?.id,
				userId: cvSkillData?.user?.id,
			},
		})
	}

	const handleEditLoisirInteret = () => {
		if (cvSkillData && cvSkillData.user) {
			navigate("/cvSkill/poleloisirsInteret", {
				state: {
					editMode: true,
					cvSkillId: cvSkillData.id,
					userId: cvSkillData.user.id,
					poleLoisirInterets: cvSkillData.poleLoisirInterets || [],
				},
			})
		} else {
			console.error("Données du CV Skill ou de l'utilisateur manquantes")
			setError(
				"Impossible de modifier les loisirs et intérêts. Données manquantes."
			)
		}
	}

	const handleEditAtouts = () => {
		if (isAdmin) {
			navigate("/cvSkill/poleAtouts", {
				state: {
					editMode: true,
					cvSkillId: cvSkillData?.id,
					userId: cvSkillData?.user?.id,
					poleAtouts: cvSkillData?.poleAtouts,
				},
			})
		}
	}

	const handleEditInterets = () => {
		if (isAdmin) {
			navigate("/cvSkill/poleInterets", {
				state: {
					editMode: true,
					cvSkillId: cvSkillData?.id,
					userId: cvSkillData?.user?.id,
					poleInterets: cvSkillData?.poleInterets,
				},
			})
		}
	}

	const handleEditPersonnalite = () => {
		if (isAdmin) {
			navigate("/cvSkill/polePersonnalite2", {
				state: {
					editMode: true,
					cvSkillId: cvSkillData?.id,
					userId: cvSkillData?.user?.id,
					polePersonnaliteTraits: cvSkillData?.polePersonnaliteTraits,
					polePersonnalitesTypes: cvSkillData?.polePersonnalitesTypes,
				},
			})
		}
	}

	const handleDeleteCvSkill = () => {
		if (isAdmin) {
			Swal.fire({
				title: "Êtes-vous sûr ?",
				text: "Cette action est irréversible !",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Oui, supprimer",
				cancelButtonText: "Annuler",
			}).then(result => {
				if (result.isConfirmed && cvSkillId) {
					deleteCvSkillMutation.mutate(cvSkillId)
				}
			})
		}
	}

	useEffect(
		() => () => {
			if (photoUrl) {
				URL.revokeObjectURL(photoUrl)
			}
		},
		[photoUrl]
	)

	if (isCvSkillLoading || isPhotoLoading) {
		return <CircularProgress />
	}

	if (isCvSkillError || error) {
		return (
			<Typography color="error">
				{error ||
					"Une erreur est survenue lors du chargement des données"}
			</Typography>
		)
	}

	if (!cvSkillData) {
		return (
			<Box className="container mx-auto p-4 max-w-2xl">
				<Typography variant="h4" className="text-center mb-6">
					CV Skill non trouvé
				</Typography>
				{isAdmin ? (
					<Box className="text-center">
						<Typography>
							Aucun CV Skill n'existe pour cet utilisateur.
						</Typography>
						<Button
							variant="contained"
							color="primary"
							onClick={() => navigate("/cvSkill/pageAcceuil")}
							className="mt-4"
						>
							Créer un CV Skill
						</Button>
					</Box>
				) : (
					<Typography className="text-center">
						Vous n'avez pas de CV Skill. Veuillez contacter un
						administrateur pour en créer un.
					</Typography>
				)}
			</Box>
		)
	}

	return (
		<Box className="container mx-auto p-4 max-w-4xl">
			<Typography variant="h4" className="text-center mb-6">
				Résumé de votre CV Skill
			</Typography>

			{/* Photo section */}
			<Box
				className="photo-container"
				style={{
					width: "150px",
					height: "150px",
					borderRadius: "50%",
					margin: "0 auto 20px",
					backgroundColor: "#f0f0f0",
					overflow: "hidden",
				}}
			>
				{isPhotoLoading || isUploading ? (
					<CircularProgress />
				) : photoUrl ? (
					<img
						src={photoUrl}
						alt={`Profil de ${
							cvSkillData?.user?.firstName || "l'utilisateur"
						}`}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				) : (
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						height="100%"
					>
						<Typography style={{ color: "#888" }}>
							Ajouter une photo
						</Typography>
					</Box>
				)}
			</Box>

			<Button
				variant="contained"
				color="primary"
				onClick={handleEditPhotoClick}
				disabled={isUploading}
				style={{ display: "block", margin: "0 auto 20px" }}
			>
				{photoUrl ? "Modifier la photo" : "Ajouter une photo"}
			</Button>

			<input
				type="file"
				ref={fileInputRef}
				onChange={handlePhotoUpload}
				style={{ display: "none" }}
				id="photo-upload-input"
				accept="image/*"
			/>

			<Grid container justifyContent="center" spacing={2}>
				<Grid item>
					<PuzzlePiece
						title="Informations personnelles"
						content={`${cvSkillData?.user?.firstName} ${cvSkillData?.user?.name}`}
						color="lightblue"
						onClick={handleEditPersonalInfo}
					/>
				</Grid>
				<Grid item>
					<PuzzlePiece
						title="Atouts"
						content={
							cvSkillData?.poleAtouts
								?.map(atout => atout.atout)
								.join(", ") || "Non spécifié"
						}
						color="lightgreen"
						onClick={handleEditAtouts}
					/>
				</Grid>
				<Grid item>
					<PuzzlePiece
						title="Intérêts"
						content={
							cvSkillData?.poleInterets
								?.map(interet => interet.interet)
								.join(", ") || "Non spécifié"
						}
						color="lightyellow"
						onClick={handleEditInterets}
					/>
				</Grid>
				<Grid item>
					<PuzzlePiece
						title="Personnalité"
						content={
							cvSkillData?.polePersonnaliteTraits
								?.map(trait => trait.personnaliteTrait)
								.join(", ") || "Non spécifié"
						}
						color="lightpink"
						onClick={handleEditPersonnalite}
					/>
				</Grid>
				<Grid item>
					<PuzzlePiece
						title="Loisirs et Centres d'Intérêts"
						content={
							cvSkillData?.poleLoisirInterets
								?.map(item => item.name)
								.join(", ") || "Non spécifié"
						}
						color="lightsalmon"
						onClick={handleEditLoisirInteret}
					/>
				</Grid>
			</Grid>

			<Box className="flex justify-between mt-8">
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate("/companies")}
					className="bg-green-500 hover:bg-green-700"
				>
					Retour au tableau de bord
				</Button>
				{isAdmin && (
					<Button
						variant="contained"
						color="secondary"
						onClick={handleDeleteCvSkill}
						className="bg-red-500 hover:bg-red-700"
					>
						Supprimer le CV Skill
					</Button>
				)}
			</Box>
		</Box>
	)
}

export default Cvskillend
