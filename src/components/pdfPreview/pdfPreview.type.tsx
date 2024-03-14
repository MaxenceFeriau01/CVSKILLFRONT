export type PdfPreviewProps = {
	file: File
}

export type PdfPreviewModalProps = {
	isOpen: boolean
	closeModal: () => void
	lFile: any
	onDocumentLoadSuccess: any
	currentPageNumber: number
	totalNumberOfPages: any
	decrementCurrentPage: () => void
	incrementCurrentPage: () => void
	url: string
}
