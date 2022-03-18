/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import Company from "../models/company"
import GeneralService from "./generalService"

class CompanyService extends GeneralService<Company | any> {
	apply(companyId: number): Promise<void> {
		return this.post(null, `/${companyId}/apply`)
	}

	active(activated: boolean, companyId: number): Promise<void> {
		return this.post({ activated }, `/${companyId}/active`)
	}

	getAllSimplePaginated(filters?: Object): Promise<any> {
		return this.getAllPaginated(filters, `/simple`)
	}
}

const companyService = new CompanyService("companies")

export default companyService
