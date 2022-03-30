/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
import FileUploadIcon from "@mui/icons-material/FileUpload"
import { Button, Modal } from "@mui/material"
import { useEffect, useState } from "react"
import PreviewIcon from "@mui/icons-material/Preview"
import CancelIcon from "@mui/icons-material/Cancel"
import { Document, Page } from "react-pdf"
import DownloadIcon from "@mui/icons-material/Download"
import fileService from "../../api/services/fileService"
import FileDb from "../../api/models/fileDb"
import { base64toBlob } from "../../utils/filesUtil"

interface FileUploadProps {
	accept: string
	text: string
	register: any
	value: any // FileList | FileDb
	id: string
}

function FileUpload({ accept, text, id, register, value }: FileUploadProps) {
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
				<PreviewModal file={value?.length > 0 ? value[0] : value} />
			)}
		</label>
	)
}
export default FileUpload

function PreviewModal({ file }: any) {
	const [open, setOpen] = useState(false)
	const [numPages, setNumPages] = useState(null)
	const [pageNumber, setPageNumber] = useState(1)
	const [url, setUrl] = useState("")
	const [lFile, setLFile] = useState(file)

	const handleOpen = (e: any) => {
		e.preventDefault()
		if (file.id && !lFile.data) {
			fileService.getById(file.id).then((res: FileDb) => {
				setLFile(res)
				setUrl(base64toBlob(res.data))
			})
		}

		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	function onDocumentLoadSuccess({ numPages }: any) {
		setNumPages(numPages)
	}

	useEffect(() => {
		if (file instanceof File) {
			const blob = new Blob([file])
			setUrl(URL.createObjectURL(blob))
		}
		setLFile(file)
	}, [file])

	return (
		<>
			<div
				onClick={handleOpen}
				title="Visualiser"
				className="file-upload__preview"
			>
				<PreviewIcon fontSize="inherit" />
			</div>

			<Modal open={open} onClose={handleClose}>
				<div className="modal modal-file-preview">
					<span className="modal__close" onClick={handleClose}>
						<CancelIcon fontSize="inherit" />
					</span>
					{lFile && (
						<>
							<Document
								file={
									lFile.id
										? `data:application/pdf;base64,${lFile.data}`
										: lFile
								}
								onLoadSuccess={onDocumentLoadSuccess}
							>
								<Page pageNumber={pageNumber} />
							</Document>

							<div className="pdf-tools">
								<Button
									onClick={() =>
										setPageNumber(pageNumber - 1)
									}
									disabled={pageNumber === 1}
								>
									{"<"}
								</Button>
								<Button
									disabled={pageNumber === numPages}
									onClick={() =>
										setPageNumber(pageNumber + 1)
									}
								>
									{">"}
								</Button>
								<p>
									Page {pageNumber} sur {numPages}
								</p>
								<a href={url} download={lFile?.name}>
									<DownloadIcon />
								</a>
							</div>
						</>
					)}
				</div>
			</Modal>
		</>
	)
}
