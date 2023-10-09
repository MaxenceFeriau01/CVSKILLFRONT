import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import Swal from "sweetalert2"
import dayjs from "dayjs"
import userService from "../../../api/services/userService"
import UserContext from "../../../contexts/user"

/**
 * Show profile alert prompt to invite user to update his profile
 */
function useProfilePopup() {
	const { user } = useContext(UserContext)
	const navigate = useNavigate()

	const refreshProfile = useMutation(() => userService.refreshProfile(), {
		onSuccess: () => Swal.close(),
	})

	useEffect(() => {
		// Current date
		const currentDate = dayjs()
		let formattedDate
		if (user?.lastModifiedDate) {
			formattedDate = dayjs(user?.lastModifiedDate)
		} else {
			formattedDate = dayjs(user?.createdDate)
		}

		// Calculate month difference between current date and user update date
		const diffInMonths = currentDate.diff(formattedDate, "months", false)

		// Check if difference is superior to 3 months
		if (diffInMonths > 3) {
			Swal.fire({
				title: "<strong>Votre situation a évolué (adresse mail, code postal, scolarité, … ) ?</strong>",
				icon: "info",
				html: "<p>N’oubliez pas de mettre à jour votre profil ! (Rubrique « Mon profil » en haut à droite de l’écran).</p>",
				showCloseButton: false,
				showDenyButton: true,
				focusConfirm: false,
				confirmButtonText: "Mettre à jour",
				denyButtonText: "Ignorer",
				denyButtonColor: "#2daf8e",
			}).then(result => {
				if (result.isConfirmed) {
					navigate("/my-profile")
				} else if (result.isDenied) {
					refreshProfile.mutate()
				}
			})
		}
	}, [user])
}

export default useProfilePopup
