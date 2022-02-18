/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */
import axios, { AxiosInstance } from "axios"
import Swal from "sweetalert2"
import User from "../models/user"

class GeneralService<T> {
	// Variables
	protected url: string

	protected http: AxiosInstance

	protected user: User = new User()

	constructor(endPoint: string) {
		this.http = axios.create()
		this.url = `${process.env.REACT_APP_BASE_API_URL}${endPoint}`
		this.http.interceptors.response.use(
			response => response,
			err =>
				new Promise((resolve, reject) => {
					if (err.response?.status === 401) {
						localStorage.removeItem("user")
						window.location.replace("/login")
					}
					throw err
				})
		)
	}

	authHeader() {
		const storageItem = localStorage.getItem("user")

		if (storageItem !== null) this.user = JSON.parse(storageItem)

		if (this.user && this.user.token) {
			// for Node.js Express back-end
			return { Authorization: `Bearer ${this.user.token}` }
		}
		return undefined
	}

	get(id: any, specificUrl: string = ""): Promise<T> {
		return this.http
			.get<T>(`${this.url}${specificUrl}/${id}`, {
				headers: this.authHeader(),
			})
			.then(this.handleResponse)
			.catch(this.handleError)
	}

	getAllWithFilters(filters?: Object): Promise<T[]> {
		// ajout des filtres

		return this.http
			.get<T[]>(this.url, { params: filters, headers: this.authHeader() })
			.then(this.handleResponse)
			.catch(this.handleError)
	}

	getAllPaginated(filters?: Object): Promise<T> {
		return this.http
			.get<T[]>(this.url, { params: filters, headers: this.authHeader() })
			.then((res: any) => res.data)
			.catch(this.handleError)
	}

	post(entity: T, specificUrl: string = ""): Promise<T> {
		return this.http
			.post<T>(this.url + specificUrl, entity, {
				headers: this.authHeader(),
			})
			.then(this.handleResponse)
			.catch(this.handleError)
	}

	put(entity: T, id: number | string): Promise<T> {
		return this.http
			.put<T>(`${this.url}/${id}`, entity, {
				headers: this.authHeader(),
			})
			.then(this.handleResponse)
			.catch(this.handleError)
	}

	delete(id: number | string): Promise<T> {
		return this.http
			.delete<T>(`${this.url}/${id}`, {
				headers: this.authHeader(),
			})
			.then(this.handleResponse)
			.catch(this.handleError)
	}

	getUrl(): string {
		return this.url
	}

	handleResponse(response: any): any {
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

	handleError(error: any): void {
		// Formatted error from backend
		if (error.response.data.message) {
			Swal.fire({
				position: "bottom-end",
				title: error.response.data.message,
				icon: "error",
				showConfirmButton: false,
				timer: 1500,
				showCloseButton: true,
			})
		}
		throw error.response
	}
}

export default GeneralService
