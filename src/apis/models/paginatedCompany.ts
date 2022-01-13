import Company from "./company"

class PaginatedCompany {
	content!: Company[]

	totalPages!: number

	number!: number
}

export default PaginatedCompany
