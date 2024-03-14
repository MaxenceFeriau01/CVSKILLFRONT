/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import Company from "../models/company"
import Page from "../models/utils/Page"
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

	getAllExport(filters?: Object): Promise<Page<Company>> {
		return this.http
			.get<Page<Company>>(`${this.url}/export`, {
				params: filters,
			})
			.then(this.handleResponse)
			.catch(this.handleError)
	}
}

const companyService = new CompanyService("companies")

export default companyService
