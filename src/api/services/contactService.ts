import { ContactEmail } from "../../components/contactDialog/contactDialog.type"
import GeneralService from "./generalService"

class ContactService extends GeneralService<ContactEmail | any> {
	sendContactEmail(contact: ContactEmail) {
		return this.post(contact, "/company-contact")
	}
}

const contactService = new ContactService("email")

export default contactService
