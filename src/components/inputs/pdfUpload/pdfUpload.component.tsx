/* eslint-disable no-nested-ternary */
import FileUploadIcon from "@mui/icons-material/FileUpload"

import { PdfUploadProps } from "./pdfUpload.type"
import PdfPreview from "../../pdfPreview/pdfPreview.component"

export default function PdfUpload({
	accept,
	text,
	id,
	register,
	value,
}: PdfUploadProps) {
	return (
		<label className="file-upload" htmlFor={id}>
			<FileUploadIcon fontSize="inherit" />
			{value?.length > 0 ? (
				<b>{value[0].name}</b>
			) : value?.name ? (
				<b>{value.name}</b>
			) : (
				<span>{text}</span>
			)}
			<input {...register} id={id} type="file" accept={accept} hidden />
			{(value?.length > 0 || value?.name) && (
				<PdfPreview file={value?.length > 0 ? value[0] : value} />
			)}
		</label>
	)
}
