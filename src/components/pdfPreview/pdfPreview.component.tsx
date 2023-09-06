import CancelIcon from "@mui/icons-material/Cancel"
import DownloadIcon from "@mui/icons-material/Download"
import PreviewIcon from "@mui/icons-material/Preview"
import { Button, Modal } from "@mui/material"
import { Document, Page } from "react-pdf"
import usePdfPreview from "./pdfPreview.hook"
import { PdfPreviewProps } from "./pdfPreview.type"

export default function PdfPreview({ file }: PdfPreviewProps) {
	const {
		openModal,
		closeModal,
		lFile,
		onDocumentLoadSuccess,
		currentPageNumber,
		totalNumberOfPages,
		isOpen,
		url,
		incrementCurrentPage,
		decrementCurrentPage,
	} = usePdfPreview(file)
	return (
		<>
			<div
				onClick={openModal}
				title="Visualiser"
				className="file-upload__preview"
			>
				<PreviewIcon fontSize="inherit" />
			</div>

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
