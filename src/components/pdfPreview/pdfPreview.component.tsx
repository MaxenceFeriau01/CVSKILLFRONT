import PreviewIcon from "@mui/icons-material/Preview"
import usePdfPreview from "./pdfPreview.hook"
import { PdfPreviewProps } from "./pdfPreview.type"
import PdfPreviewModal from "./pdfPreviewModal.component"

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
			<PdfPreviewModal
				closeModal={closeModal}
				currentPageNumber={currentPageNumber}
				decrementCurrentPage={decrementCurrentPage}
				incrementCurrentPage={incrementCurrentPage}
				isOpen={isOpen}
				lFile={lFile}
				onDocumentLoadSuccess={onDocumentLoadSuccess}
				totalNumberOfPages={totalNumberOfPages}
				url={url}
			/>
		</>
	)
}
