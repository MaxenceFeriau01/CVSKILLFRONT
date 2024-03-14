import CancelIcon from "@mui/icons-material/Cancel"
import DownloadIcon from "@mui/icons-material/Download"
import { Button, Modal } from "@mui/material"
import { Document, Page } from "react-pdf"
import { PdfPreviewModalProps } from "./pdfPreview.type"

export default function PdfPreviewModal({
	closeModal,
	currentPageNumber,
	decrementCurrentPage,
	incrementCurrentPage,
	isOpen,
	lFile,
	onDocumentLoadSuccess,
	totalNumberOfPages,
	url,
}: PdfPreviewModalProps) {
	const getFilename = (fileName: string) => {
		const fileNameArgs = fileName.split("/")
		const nameArgs = fileNameArgs[0].split(".")
		if (nameArgs.length > 1) {
			return `${nameArgs[0]}.${nameArgs[nameArgs.length - 1]}`
		}
		return fileNameArgs[fileNameArgs.length - 1]
	}

	const handleDownload = () => {
		const name = getFilename(lFile?.name ?? getFilename(url))
		const a = document.createElement("a")
		a.href = url
		a.download = name
		a.hidden = true
		a.click()
	}

	return (
		<Modal open={isOpen} onClose={closeModal}>
			<div className="modal modal-file-preview">
				<span className="modal__close" onClick={closeModal}>
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
							// eslint-disable-next-line react/jsx-no-bind
							onLoadSuccess={onDocumentLoadSuccess}
						>
							<Page pageNumber={currentPageNumber} />
						</Document>

						<div className="pdf-tools">
							<Button
								onClick={() => decrementCurrentPage()}
								disabled={currentPageNumber === 1}
							>
								{"<"}
							</Button>
							<Button
								disabled={
									currentPageNumber === totalNumberOfPages
								}
								onClick={() => incrementCurrentPage()}
							>
								{">"}
							</Button>
							<p>
								Page {currentPageNumber} sur{" "}
								{totalNumberOfPages}
							</p>
							<button
								type="button"
								onClick={handleDownload}
								title="Télécharger le document"
							>
								<DownloadIcon />
							</button>
						</div>
					</>
				)}
			</div>
		</Modal>
	)
}
