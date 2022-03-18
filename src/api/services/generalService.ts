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

	static requestCounter: number = 0

	constructor(endPoint: string) {
		this.http = axios.create()
		this.url = `${process.env.REACT_APP_BASE_API_URL}/${endPoint}`
		// Intercept every requests
		this.http.interceptors.request.use(
			config => {
				const newConfig = config
				// Show loading spinner

				document.getElementById("overlay")!.style.display = "unset"
				GeneralService.requestCounter += 1

				// Add jwtToken to every request
				const storageItem = localStorage.getItem("user")

				if (storageItem !== null) this.user = JSON.parse(storageItem)

				if (this.user && this.user.token) {
					newConfig!.headers!.Authorization = `Bearer ${this.user.token}`
				}

				return newConfig
			},
			error => Promise.reject(error)
		)
		// Intercept every responses
		this.http.interceptors.response.use(
			response => {
				// Remove loading spinner
				GeneralService.requestCounter -= 1
				if (GeneralService.requestCounter <= 0)
					document.getElementById("overlay")!.style.display = "none"
				return response
			},
			err =>
				new Promise(() => {
					if (err.response?.status === 401) {
						localStorage.removeItem("user")
						window.location.replace("/login")
					}
					// Remove loading spinner
					GeneralService.requestCounter -= 1
					if (GeneralService.requestCounter <= 0)
						document.getElementById("overlay")!.style.display =
							"none"
					throw err
				})
		)
	}

	getById(id: any): Promise<T> {
		return this.http
			.get<T>(`${this.url}/${id}`)
			.then(this.handleResponse)
			.catch(this.handleError)
	}

	get(url: string): Promise<T> {
		return this.http
			.get<T>(`${this.url}${url}`)
			.then(this.handleResponse)
			.catch(this.handleError)
	}

	getAllWithFilters(filters?: Object): Promise<T[]> {
		// ajout des filtres

		return this.http
			.get<T[]>(this.url, { params: filters })
			.then(this.handleResponse)
			.catch(this.handleError)
	}

	getAllPaginated(filters?: Object, url: string = ""): Promise<T> {
		return this.http
			.get<T[]>(`${this.url + url}/search`, { params: filters })
			.then((res: any) => res.data)
			.catch(this.handleError)
	}

	post(entity: T, specificUrl: string = ""): Promise<T> {
		return this.http
			.post<T>(this.url + specificUrl, entity)
			.then(this.handleResponse)
			.catch(this.handleError)
	}

	put(entity: T, id: number | string): Promise<T> {
		return this.http
			.put<T>(`${this.url}/${id}`, entity)
			.then(this.handleResponse)
			.catch(this.handleError)
	}

	delete(id: number | string): Promise<T> {
		return this.http
			.delete<T>(`${this.url}/${id}`)
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
			if (response.data?.content) {
				return response.data.content
			}
			return response.data
		}

		return response
	}

	handleError(error: any): void {
		// Formatted error from backend
		if (error.response?.data?.message) {
			Swal.fire({
				position: "bottom-end",
				title: error.response.data?.message,
				icon: "error",
				showConfirmButton: false,
				showCloseButton: true,
			})
		}
		throw error.response
	}
}

export default GeneralService
