/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import Company from "../models/company"
import GeneralService from "./generalService"

class CompanyService extends GeneralService<Company | any> {}

const companyService = new CompanyService("/companies")

export default companyService
