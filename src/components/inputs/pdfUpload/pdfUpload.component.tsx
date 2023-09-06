/* eslint-disable no-nested-ternary */
import FileUploadIcon from "@mui/icons-material/FileUpload"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

import PdfPreview from "../../pdfPreview/pdfPreview.component"
import usePdfUpload from "./pdfUpload.hook"
import { PdfUploadProps } from "./pdfUpload.type"
import useAlert from "../../../hooks/useAlert"

export default function PdfUpload({
	accept,
	text,
	id,
	register,
	value,
	setValue,
}: PdfUploadProps) {
	const { isPdfPresent, deleteFile } = usePdfUpload(value, id, setValue)
	const { promptConfirm } = useAlert()

	return (
		<div className="relative">
			<label className="file-upload" htmlFor={id}>
				<FileUploadIcon fontSize="inherit" />
				{value?.length > 0 ? (
					<b>{value[0].name}</b>
				) : value?.name ? (
					<b>{value?.name}</b>
				) : (
					<span>{text}</span>
				)}
				<input
					{...register}
					id={id}
					type="file"
					accept={accept}
					hidden
				/>
				{isPdfPresent() && (
					<PdfPreview file={value?.length > 0 ? value[0] : value} />
				)}
			</label>
			{isPdfPresent() && (
				<HighlightOffIcon
					className="absolute -top-3 -right-2 bg-background rounded-full cursor-pointer z-10"
					color="error"
					onClick={() => promptConfirm(() => deleteFile())}
				/>
			)}
		</div>
	)
}
