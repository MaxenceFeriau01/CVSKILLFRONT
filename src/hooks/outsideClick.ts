import { useEffect } from "react"

function useOutsideClick(ref: any, action: any) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event: any) {
			if (ref.current && !ref.current.contains(event.target)) {
				action()
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside)
		document.addEventListener("touchend", handleClickOutside)
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside)
			document.removeEventListener("touchend", handleClickOutside)
		}
	}, [ref])
}

export default useOutsideClick
