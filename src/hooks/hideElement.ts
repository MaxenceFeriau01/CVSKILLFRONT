import { useEffect } from "react"

function useHideElement(references: string[]) {
	useEffect(() => {
		references.forEach(element => {
			const itemToHide: Element =
				document.getElementsByClassName(element)[0]
			itemToHide.classList.add("d-none")
		})

		return () => {
			references.forEach(element => {
				const itemToHide: Element =
					document.getElementsByClassName(element)[0]
				itemToHide.classList.remove("d-none")
			})
		}
	}, [])
}

export default useHideElement
