/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */
import axios, { AxiosInstance, AxiosResponse } from "axios"
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
		this.url = `${process.env.REACT_APP_API_URL}/${endPoint}`
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
				else this.user.token = ""

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
						localStorage.removeItem("counted")
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

	getAllWithFilters(
		filters: Object | null = null,
		path: string = ""
	): Promise<T[]> {
		// ajout des filtres

		return this.http
			.get<T[]>(this.url + path, { params: filters })
			.then(this.handleResponse)
			.catch(this.handleError)
	}

	getAllPaginated(filters?: Object, path: string = ""): Promise<T> {
		return this.http
			.get<T[]>(`${this.url + path}/search`, { params: filters })
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

	patch(entity: T, id: number | string): Promise<T> {
		return this.http
			.patch<T>(`${this.url}/${id}`, entity)
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

	uploadFile(
		file: File,
		url: string,
		additionalData?: Record<string, any>
	): Promise<T> {
		const formData = new FormData()
		formData.append("file", file)

		if (additionalData) {
			Object.entries(additionalData).forEach(([key, value]) => {
				formData.append(key, value)
			})
		}

		return this.http
			.post<T>(this.url + url, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then(this.handleResponse)
			.catch(this.handleError)
	}

	getBinaryData(url: string): Promise<Blob> {
		return this.http
			.get(this.url + url, {
				responseType: "blob",
			})
			.then(response => {
				if (response.status === 404) {
					throw new Error("Photo non trouvée")
				}
				return response.data
			})
			.catch(error => {
				console.error(
					"Erreur lors de la récupération de la photo:",
					error
				)
				throw error // Propagez l'erreur pour la gérer dans le composant
			})
	}
}

export default GeneralService
