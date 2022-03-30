import { useEffect } from "react"

function useHideElement(references: string[]) {
	useEffect(() => {
		references.forEach(element => {
			const itemToHide: Element =
				document.getElementsByClassName(element)[0]
			itemToHide.classList.add("hidden")
		})

		return () => {
			references.forEach(element => {
				const itemToHide: Element =
					document.getElementsByClassName(element)[0]
				itemToHide.classList.remove("hidden")
			})
		}
	}, [])
}

export default useHideElement
