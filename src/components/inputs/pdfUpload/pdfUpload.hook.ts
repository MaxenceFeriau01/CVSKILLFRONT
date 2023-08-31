import { FieldValues, UseFormSetValue } from "react-hook-form"
import fileService from "../../../api/services/fileService"

const usePdfUpload = (
	file: any,
	id: string,
	setValue: UseFormSetValue<FieldValues>
) => {
	const isPdfPresent = () => file?.length > 0 || file?.name

	const deleteFile = async () => {
		if (file?.name) {
			await fileService.delete(file.id).then(() => {})
		}
		const inputElement = document.getElementById(id) as HTMLInputElement
		if (inputElement) {
			inputElement.value = ""
		}
		setValue(id, null)
	}

	return {
		isPdfPresent,
		deleteFile,
	}
}

export default usePdfUpload
