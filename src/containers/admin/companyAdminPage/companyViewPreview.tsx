import { Modal } from "@mui/material"
import { GridRowId } from "@mui/x-data-grid"
import { useQuery } from "react-query"
import companyService from "../../../api/services/companyService"
import CompanyDetailsView from "../../companyPage/companyDetailsView"

interface CompanyViewPreviewProps {
	openModal: boolean
	setOpenModal: (openModal: boolean) => void
	companyId: GridRowId
}
function CompanyViewPreview({
	openModal,
	setOpenModal,
	companyId,
}: CompanyViewPreviewProps) {
	const apiCompany = useQuery(
		"company",
		() => companyService.getById(companyId),
		{ enabled: openModal }
	)
	return apiCompany.data ? (
		<Modal open={openModal} onClose={() => setOpenModal(false)}>
			<div className="modal modal-company-preview w-full tablet:w-1/2">
				<CompanyDetailsView company={apiCompany.data} />
			</div>
		</Modal>
	) : null
}

export default CompanyViewPreview
