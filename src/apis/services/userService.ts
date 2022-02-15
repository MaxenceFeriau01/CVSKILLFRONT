/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import Credentials from "../models/credentials"
import User from "../models/user"
import GeneralService from "./generalService"

class UserService extends GeneralService<User> {
	register(user: User): Promise<User> {
		// ajout des filtres

		return this.http
			.post<User>(`${this.url}/register`, user)
			.then(GeneralService.handleResponse)
			.catch(GeneralService.handleError)
	}

	authenticate(credentials: Credentials): Promise<User> {
		return this.http
			.post<User>(`${this.url}/authenticate`, credentials)
			.then(GeneralService.handleResponse)
			.catch(GeneralService.handleError)
	}
}

const userService = new UserService("/users")

export default userService
