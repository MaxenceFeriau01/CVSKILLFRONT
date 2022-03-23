/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import Credentials from "../models/credentials"
import User from "../models/user"
import GeneralService from "./generalService"

class UserService extends GeneralService<User | any> {
	// keep the roles in memory
	protected roles: Array<string> = []

	register(user: FormData): Promise<User> {
		return this.post(user, "/register")
	}

	authenticate(credentials: Credentials): Promise<User> {
		return this.post(credentials, "/authenticate")
	}

	getUserRoles(): Promise<string[]> {
		if (this.roles.length > 0) {
			return new Promise(resolve => {
				resolve(this.roles)
			})
		}
		return this.get("/self/roles").then(res => {
			this.roles = res
			return res
		})
	}

	getAppliedCompanies(): Promise<number[]> {
		return this.get("/self/applied-companies").then(res => res)
	}

	getSelf(): Promise<User> {
		return this.get("/self")
	}

	active(activated: boolean, userId: number): Promise<void> {
		return this.post({ activated }, `/${userId}/active`)
	}

	forgotPassword(email: string): Promise<void> {
		return this.post({ email }, "/forgot-password")
	}

	processResetPassword(resetPassword: any): Promise<void> {
		return this.post(resetPassword, "/reset-password")
	}

	showResetPassword(token: string): Promise<void> {
		return this.get(`/${token}/reset-password`)
	}

	setRoles(roles: Array<string>): void {
		this.roles = roles
	}
}

const userService = new UserService("users")

export default userService
