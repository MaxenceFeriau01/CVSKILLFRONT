export type ContactDialogProps = {
	isOpen: boolean
	closeModal: () => void
}

export type ContactEmail = {
	name: string
	company: string
	email: string
	phone: string
	content: string
}
