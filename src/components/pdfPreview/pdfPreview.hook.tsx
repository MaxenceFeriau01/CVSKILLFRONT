import { useEffect, useState } from "react"
import FileDb from "../../api/models/fileDb"
import fileService from "../../api/services/fileService"
import { base64toBlob } from "../../utils/filesUtil"

export default function usePdfPreview(file: any) {
	const [isOpen, setIsOpen] = useState(false)
	const [totalNumberOfPages, setTotalNumberOfPage] = useState(null)
	const [currentPageNumber, setCurrentPageNumber] = useState(1)
	const [url, setUrl] = useState("")
	const [lFile, setLFile] = useState(file)

	useEffect(() => {
		if (file instanceof File) {
			const blob = new Blob([file])
			setUrl(URL.createObjectURL(blob))
		}
		setLFile(file)
	}, [file])

	const openModal = (e: any) => {
		e.preventDefault()
		if (file.id && !lFile.data) {
			fileService.getById(file.id).then((res: FileDb) => {
				setLFile(res)
				setUrl(base64toBlob(res.data))
			})
		}

		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	function onDocumentLoadSuccess(data: any) {
		setTotalNumberOfPage(data.numPages)
	}

	const incrementCurrentPage = () => {
		setCurrentPageNumber(currentPageNumber + 1)
	}

	const decrementCurrentPage = () => {
		setCurrentPageNumber(currentPageNumber - 1)
	}

	return {
		openModal,
		closeModal,
		onDocumentLoadSuccess,
		isOpen,
		url,
		totalNumberOfPages,
		lFile,
		currentPageNumber,
		decrementCurrentPage,
		incrementCurrentPage,
	}
}
