import { FieldValues, UseFormSetValue } from "react-hook-form"

export type PdfUploadProps = {
	accept: string
	text: string
	register: any
	value: any // FileList | FileDb
	id: string
	setValue: UseFormSetValue<FieldValues>
}
