import { UseFormReturn } from "react-hook-form"
import { showConfirm } from "./popupUtil"

// eslint-disable-next-line import/prefer-default-export
export const base64toBlob = (data: string) => {
	const bytes = atob(data)
	let { length } = bytes
	const out = new Uint8Array(length)

	// eslint-disable-next-line no-plusplus
	while (length--) {
		out[length] = bytes.charCodeAt(length)
	}

	const url = URL.createObjectURL(
		new Blob([out], { type: "application/pdf" })
	)
	return url
}

export const getFileBase64 = async (
	file: File,
	form: UseFormReturn<any>
): Promise<number> => {
	if (!file.type.match(/image\/[a-z]+/d)) {
		showConfirm("Format de fichier incorrect.", "error")
		return 1
	}

	const reader = new FileReader()
	reader.onload = (evt: any) => {
		form.setValue("image", evt.target.result)
	}
	reader.readAsDataURL(file)

	return 0
}
