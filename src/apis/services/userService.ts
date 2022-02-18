/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import Credentials from "../models/credentials"
import User from "../models/user"
import GeneralService from "./generalService"

class UserService extends GeneralService<User | any> {
	register(user: User): Promise<User> {
		// ajout des filtres

		return this.post(user, "/register")
	}

	authenticate(credentials: Credentials): Promise<User> {
		return this.post(credentials, "/authenticate")
	}
}

const userService = new UserService("/users")

export default userService
