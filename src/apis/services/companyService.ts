/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import Company from "../models/company"
import PaginatedCompany from "../models/paginatedCompany"
import GeneralService from "./generalService"

class CompanyService extends GeneralService<Company> {
	getPaginationWithFilters(filters?: Object): Promise<PaginatedCompany> {
		// ajout des filtres

		return this.http
			.get<PaginatedCompany>(this.url, { params: filters })
			.then((res: any) => res.data)
			.catch(GeneralService.handleError)
	}
}

const companyService = new CompanyService("/companies")

export default companyService
