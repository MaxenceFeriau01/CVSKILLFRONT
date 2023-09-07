import { useState, useEffect } from "react"
import { useMutation } from "react-query"
import visitService from "../../../api/services/visitService"

function useAddVisits() {
	const [counted, setCounted] = useState<boolean>(
		!!localStorage.getItem("counted") &&
			localStorage.getItem("counted") === "true"
	)

	const incrementVisit = useMutation(
		() => visitService.incrementVisitCounter(),
		{
			onSuccess: () => {
				localStorage.setItem("counted", "true")
				setCounted(true)
			},
			onError: () => {
				localStorage.setItem("counted", "false")
				setCounted(false)
			},
		}
	)

	useEffect(() => {
		if (!counted) {
			incrementVisit.mutate()
		}
	}, [])
}

export default useAddVisits
