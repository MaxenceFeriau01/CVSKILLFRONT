/* eslint-disable prefer-promise-reject-errors */
import React, { useCallback, useEffect, useRef, useState } from "react"
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	styled,
	Typography,
} from "@mui/material"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
// eslint-disable-next-line import/no-extraneous-dependencies
import { useReactToPrint } from "react-to-print"
import CvSkillDto, { LocationState } from "../../api/models/cvskill"
import cvskillService from "../../api/services/cvskillService"
import userService from "../../api/services/userService"
import CentresInteret from "./CentresInteretProp"
import DiagrammeAtouts from "./DiagrammeAtoutsProps"
import DiagrammePersonnalite from "./diagrammePersonnaliteProps"
import InformationsPersonnelles from "./InformationsPersonnellesProps"
import CercleInterets from "./InterestsCircle"
import CvSkillPrint from "./cvSkillPrint"

const TitreStylise = styled(Typography)`
	font-family: "Bungee", cursive;
	font-size: 1.9rem;
	font-weight: 700;
	text-transform: uppercase;
	background: linear-gradient(
		45deg,
		#ff00ff,
		#00ffff,
		#ff0000,
		#00ff00,
		#ffff00
	);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	animation: rainbow 6s ease infinite;
	background-size: 400% 400%;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

	@keyframes rainbow {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
`

const ActionButton = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(1),
	width: "100%",
	borderColor: "#4caf50",
	color: "#4caf50",
	"&:hover": {
		backgroundColor: "#4caf50",
		color: "white",
	},
}))

function Cvskillend() {
	const navigate = useNavigate()
	const location = useLocation()
	const state = location.state as LocationState | null
	const [userId, setUserId] = useState<number | null>(null)
	const [cvSkillId, setCvSkillId] = useState<number | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const printRef = useRef<HTMLDivElement>(null)

	const queryClient = useQueryClient()

	useEffect(() => {
		const fetchData = async () => {
			const storedUserId = localStorage.getItem("selectedUserId")
			const storedCvSkillId = localStorage.getItem("selectedCvSkillId")

			try {
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

	const { data: photoData, isLoading: isPhotoLoading } =
		useQuery<ArrayBuffer | null>(
			["photo", cvSkillId],
			() => (cvSkillId ? cvskillService.getPhoto(cvSkillId) : null),
			{ enabled: !!cvSkillId }
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
			onError: () => {
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
			onError: () => {
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

	const handlePrint = useReactToPrint({
		content: () => printRef.current,
		documentTitle: `CV_Skill_${cvSkillData?.user?.firstName}_${cvSkillData?.user?.name}`,
	})

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

	return (
		<div className="container mx-auto p-4 max-w-7xl relative overflow-y-auto h-[calc(100vh-8rem)] pb-16">
			<style>{`
        .container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
			{error && <p className="text-red-500 text-center">{error}</p>}
			<Grid container spacing={4}>
				{/* Colonne de gauche */}
				<Grid item xs={12} md={4}>
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
					</Box>
					<InformationsPersonnelles
						user={cvSkillData.user}
						onEditInfo={handleEditPersonalInfo}
						compact
					/>
					<Box mt={4}>
						<CentresInteret
							poleLoisirInterets={cvSkillData.poleLoisirInterets}
							onModifier={handleEditLoisirInteret}
							compact
						/>
					</Box>
					{/* Boutons d'action */}
					<Box mt={4}>
						<ActionButton onClick={() => navigate("/companies")}>
							Retour au tableau de bord
						</ActionButton>
						<ActionButton onClick={handlePrint}>
							Imprimer en PDF (1 page)
						</ActionButton>
						<ActionButton onClick={handleEditPhotoClick}>
							{photoUrl
								? "Modifier la photo"
								: "Ajouter une photo"}
						</ActionButton>
						<input
							type="file"
							ref={fileInputRef}
							onChange={handlePhotoUpload}
							style={{ display: "none" }}
							accept="image/*"
						/>
						{isAdmin && (
							<ActionButton
								onClick={handleDeleteCvSkill}
								color="secondary"
							>
								Supprimer le CV Skill
							</ActionButton>
						)}
					</Box>
				</Grid>
				<Grid item xs={12} md={8}>
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
						compact
					/>
					<Box mt={4}>
						<DiagrammeAtouts
							atouts={cvSkillData.poleAtouts || []}
							onModifier={handleEditAtouts}
							isAdmin={isAdmin}
							compact
						/>
					</Box>
					<Box mt={4}>
						<CercleInterets
							interets={
								cvSkillData.poleInterets?.map(
									interet => interet.interet
								) || []
							}
							onModifier={handleEditInterets}
							isAdmin={isAdmin}
							compact
						/>
					</Box>
				</Grid>
			</Grid>

			{/* Composant CvSkillPrint pour l'impression */}
			<div style={{ display: "none" }}>
				<CvSkillPrint
					ref={printRef}
					cvSkillData={cvSkillData}
					photoUrl={photoUrl}
				/>
			</div>
		</div>
	)
}

export default Cvskillend
