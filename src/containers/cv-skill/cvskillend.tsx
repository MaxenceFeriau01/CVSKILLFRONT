/* eslint-disable prefer-promise-reject-errors */
import React, { useCallback, useEffect, useRef, useState } from "react"
import { PictureAsPdf } from "@mui/icons-material"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import CvSkillDto, { LocationState } from "../../api/models/cvskill"
import cvskillService from "../../api/services/cvskillService"
import userService from "../../api/services/userService"
import CentresInteret from "./CentresInteretProp"
import DiagrammeAtouts from "./DiagrammeAtoutsProps"
import DiagrammePersonnalite from "./diagrammePersonnaliteProps"
import InformationsPersonnelles from "./InformationsPersonnellesProps"
import CercleInterets from "./InterestsCircle"

function Cvskillend() {
	const navigate = useNavigate()
	const location = useLocation()
	const state = location.state as LocationState | null
	const [userId, setUserId] = useState<number | null>(null)
	const [cvSkillId, setCvSkillId] = useState<number | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const queryClient = useQueryClient()

	// Effet pour charger les données initiales
	useEffect(() => {
		const fetchData = async () => {
			const storedUserId = localStorage.getItem("selectedUserId")
			const storedCvSkillId = localStorage.getItem("selectedCvSkillId")

			try {
				// Récupération des rôles de l'utilisateur
				const userRoles = await userService.getUserRoles()
				setIsAdmin(userRoles.includes("ROLE_ADMIN"))

				if (storedUserId) {
					setUserId(Number(storedUserId))
				} else if (userRoles.includes("ROLE_USER")) {
					const user = await userService.getSelf()
					if (user?.id) {
						setUserId(Number(user.id))
						const cvSkill =
							await cvskillService.getCvSkillsByUserId(
								Number(user.id)
							)
						if (cvSkill?.id) {
							setCvSkillId(Number(cvSkill.id))
						} else {
							setError("CV Skill non trouvé pour cet utilisateur")
						}
					} else {
						setError(
							"Impossible de récupérer l'utilisateur connecté"
						)
					}
				} else {
					setError("ID utilisateur non trouvé dans le localStorage")
				}

				if (storedCvSkillId) {
					setCvSkillId(Number(storedCvSkillId))
				} else if (!userRoles.includes("ROLE_USER")) {
					setError("ID du CV Skill non trouvé dans le localStorage")
				}
			} catch (error) {
				setError("Impossible de récupérer les données utilisateur")
				setUserId(null)
				setCvSkillId(null)
			}
		}

		fetchData()
	}, [])

	// Requête pour obtenir les données du CV Skill
	const {
		data: cvSkillData,
		isLoading: isCvSkillLoading,
		isError: isCvSkillError,
	} = useQuery<CvSkillDto | null, Error>(
		["cvSkill", cvSkillId],
		() =>
			cvSkillId
				? cvskillService.getCvSkillById(cvSkillId)
				: Promise.reject("Aucun ID de CV Skill disponible"),
		{
			enabled: !!cvSkillId,
			onError: (error: Error) => setError(error.message),
		}
	)

	// Requête pour obtenir la photo du profil
	const { data: photoData, isLoading: isPhotoLoading } =
		useQuery<ArrayBuffer | null>(
			["photo", cvSkillId],
			() => (cvSkillId ? cvskillService.getPhoto(cvSkillId) : null),
			{ enabled: !!cvSkillId }
		)

	const photoUrl = photoData
		? URL.createObjectURL(new Blob([photoData], { type: "image/jpeg" }))
		: null

	// Mutation pour uploader une photo
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
			onError: () => {
				Swal.fire({
					icon: "error",
					title: "Erreur lors de l'upload de la photo",
					text: "Veuillez réessayer plus tard.",
				})
			},
		}
	)

	// Mutation pour supprimer un CV Skill
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
			onError: () => {
				Swal.fire({
					icon: "error",
					title: "Erreur lors de la suppression du CV Skill",
					text: "Veuillez réessayer plus tard.",
				})
			},
		}
	)

	// Gestion de l'upload de photo
	const handlePhotoUpload = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0]
			if (file && cvSkillId) {
				uploadPhotoMutation.mutate(file)
			}
		},
		[cvSkillId, uploadPhotoMutation]
	)

	// Fonctions de navigation pour l'édition des différentes sections
	const handleEditPhotoClick = () => fileInputRef.current?.click()

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
		} else if (userId) {
			navigate("/cvSkill/poleloisirsInteret", {
				state: {
					editMode: true,
					cvSkillId,
					userId,
					poleLoisirInterets: cvSkillData?.poleLoisirInterets || [],
				},
			})
		} else {
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
			navigate("/cvSkill/polePersonnalite", {
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

	const handleEditPersonnalite2 = () => {
		if (isAdmin) {
			navigate("/cvSkill/polePersonnalite2", {
				state: {
					editMode: true,
					cvSkillId: cvSkillData?.id,
					userId: cvSkillData?.user?.id,
					polePersonnalitesTypes: cvSkillData?.polePersonnalitesTypes,
				},
			})
		}
	}

	// Gestion de la suppression du CV Skill
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

	// Nettoyage de l'URL de la photo lors du démontage du composant
	useEffect(
		() => () => {
			if (photoUrl) URL.revokeObjectURL(photoUrl)
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

	// Rendu principal du composant
	return (
		<div className="container mx-auto p-4 max-w-4xl relative overflow-y-auto h-[calc(100vh-8rem)] pb-16">
			<style>{`
                .container::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
			<h2 className="text-2xl font-bold text-green-500 text-center mb-6">
				Mon CV Skill
			</h2>
			{error && <p className="text-red-500 text-center">{error}</p>}

			<Box sx={{ textAlign: "center", mb: 4 }}>
				{photoUrl ? (
					<img
						src={photoUrl}
						alt="Profil"
						style={{
							width: 200,
							height: 200,
							borderRadius: "50%",
							margin: "0 auto",
						}}
					/>
				) : (
					<Typography>Aucune photo</Typography>
				)}
				<Button onClick={handleEditPhotoClick} className="mt-2">
					{photoUrl ? "Modifier la photo" : "Ajouter une photo"}
				</Button>
				<input
					type="file"
					ref={fileInputRef}
					onChange={handlePhotoUpload}
					style={{ display: "none" }}
					accept="image/*"
				/>
			</Box>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<CercleInterets
					interets={
						cvSkillData.poleInterets?.map(
							interet => interet.interet
						) || []
					}
					onModifier={handleEditInterets}
					isAdmin={isAdmin}
				/>

				<DiagrammeAtouts
					atouts={cvSkillData.poleAtouts || []}
					onModifier={handleEditAtouts}
					isAdmin={isAdmin}
				/>

				<DiagrammePersonnalite
					polePersonnalitesTypes={
						cvSkillData.polePersonnalitesTypes || []
					}
					polePersonnaliteTraits={
						cvSkillData.polePersonnaliteTraits || []
					}
					onModifierType={handleEditPersonnalite2}
					onModifierTraits={handleEditPersonnalite}
					isAdmin={isAdmin}
				/>

				<InformationsPersonnelles
					user={cvSkillData.user}
					onEditInfo={handleEditPersonalInfo}
				/>

				<CentresInteret
					poleLoisirInterets={cvSkillData.poleLoisirInterets}
					onModifier={handleEditLoisirInteret}
				/>

				<div className="flex justify-center mt-8">
					<Button
						variant="contained"
						onClick={() => navigate("/companies")}
						className="mr-4"
					>
						Retour au tableau de bord
					</Button>
					<Button
						variant="contained"
						color="primary"
						startIcon={<PictureAsPdf />}
					>
						Enregistrer en PDF
					</Button>
					{isAdmin && (
						<Button
							variant="contained"
							color="secondary"
							onClick={handleDeleteCvSkill}
						>
							Supprimer le CV Skill
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default Cvskillend
