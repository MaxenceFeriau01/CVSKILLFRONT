import Pageable from "./Pageable"

class Page<T> {
	content!: Array<T>

	pageable: Pageable = new Pageable()

	totalElements!: number

	totalPages!: number

	number!: number

	size!: number

	numberOfElements!: number

	last!: boolean

	first!: boolean

	empty!: boolean
}

export default Page
