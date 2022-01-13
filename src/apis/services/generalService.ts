/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */
import axios, { AxiosInstance } from "axios"
import Swal from "sweetalert2"

class GeneralService<T> {
	// Variables
	protected url: string

	protected http: AxiosInstance

	constructor(endPoint: string) {
		this.http = axios.create()
		this.url = `${process.env.REACT_APP_BASE_API_URL}${endPoint}`
	}

	getById(id: any): Promise<T> {
		return this.http
			.get<T>(`${this.url}/${id}`)
			.then(GeneralService.handleResponse)
			.catch(GeneralService.handleError)
	}

	getWithFilters(filters?: Object): Promise<T[]> {
		// ajout des filtres

		return this.http
			.get<T[]>(this.url, { params: filters })
			.then(GeneralService.handleResponse)
			.catch(GeneralService.handleError)
	}

	post(entity: T): Promise<T> {
		return this.http
			.post<T>(this.url, entity)
			.then(GeneralService.handleResponse)
			.catch(GeneralService.handleError)
	}

	put(entity: T, id: number): Promise<T> {
		return this.http
			.put<T>(`${this.url}/${id}`, entity)
			.then(GeneralService.handleResponse)
			.catch(GeneralService.handleError)
	}

	delete(id: number): Promise<T> {
		return this.http
			.delete<T>(`${this.url}/${id}`)
			.then(GeneralService.handleResponse)
			.catch(GeneralService.handleError)
	}

	getUrl(): string {
		return this.url
	}

	static handleResponse(response: any): any {
		if (response.results) {
			return response.results
		}

		if (response.data) {
			if (response.data.content) {
				return response.data.content
			}
			return response.data
		}

		return response
	}

	static handleError(error: any): void {
		// Formatted error from backend
		if (error.response.data.message) {
			Swal.fire({
				title: `Erreur ${error.response.data.status}! `,
				text: error.response.data.message,
				icon: "error",
				confirmButtonText: "Ok",
			})
		} else {
			throw error.response
		}
	}
}

export default GeneralService
