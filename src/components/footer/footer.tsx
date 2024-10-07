import Swal from "sweetalert2"
import { Help } from "@mui/icons-material"
import PdfPreviewModal from "../pdfPreview/pdfPreviewModal.component"
import usePdfPreview from "../pdfPreview/pdfPreview.hook"
import CVFile from "../../resources/files/CV.pdf"
import CoverLetterFile from "../../resources/files/CoverLetter.pdf"

function Footer() {
	const handleClick = (evt: any) => {
		Swal.fire({
			title: "<strong>Aide pratique</strong>",
			icon: "info",
			html: "Cliquez sur l'un des deux boutons ci-dessous pour consulter le document d'aide à la création d'un CV ou d'une lettre de motivation.",
			showCloseButton: true,
			showDenyButton: true,
			focusConfirm: false,
			confirmButtonText: "CV",
			denyButtonText: "Lettre de motivation",
			denyButtonColor: "#2daf8e",
		}).then(result => {
			if (result.isConfirmed) {
				CVPreview.openModal(evt)
			} else if (result.isDenied) {
				CoverLetterPreview.openModal(evt)
			}
		})
	}

	const CVPreview = usePdfPreview(CVFile)
	const CoverLetterPreview = usePdfPreview(CoverLetterFile)

	return (
		<>
			<div className="footer">
				<p>
					Besoin d’aide, d’une info ? Envoyez vos questions sur
					l’adresse mail{" "}
					<a href="mailto:jobexplorer@eedk.fr">jobexplorer@eedk.fr</a>
				</p>
				<br />
				<p>Site créé par Lilliad - Akkodis</p>
			</div>
			<button
				type="button"
				className="help-button"
				onClick={handleClick}
				title="Aide à la création de CV et de lettre de motivation"
			>
				<Help color="secondary" fontSize="large" />
			</button>
			<PdfPreviewModal
				closeModal={CVPreview.closeModal}
				currentPageNumber={CVPreview.currentPageNumber}
				decrementCurrentPage={CVPreview.decrementCurrentPage}
				incrementCurrentPage={CVPreview.incrementCurrentPage}
				isOpen={CVPreview.isOpen}
				lFile={CVPreview.lFile}
				onDocumentLoadSuccess={CVPreview.onDocumentLoadSuccess}
				totalNumberOfPages={CVPreview.totalNumberOfPages}
				url={CVPreview.url}
			/>
			<PdfPreviewModal
				closeModal={CoverLetterPreview.closeModal}
				currentPageNumber={CoverLetterPreview.currentPageNumber}
				decrementCurrentPage={CoverLetterPreview.decrementCurrentPage}
				incrementCurrentPage={CoverLetterPreview.incrementCurrentPage}
				isOpen={CoverLetterPreview.isOpen}
				lFile={CoverLetterPreview.lFile}
				onDocumentLoadSuccess={CoverLetterPreview.onDocumentLoadSuccess}
				totalNumberOfPages={CoverLetterPreview.totalNumberOfPages}
				url={CoverLetterPreview.url}
			/>
		</>
	)
}
export default Footer
