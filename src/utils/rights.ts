import User from "../api/models/user"

export function hasRoles(roles: Array<string>): boolean {
	// Mean it's public root

	if (roles.length === 0) {
		return true
	}
	const storageItem = localStorage.getItem("user")
	let user: User | null = null
	if (storageItem !== null) {
		user = JSON.parse(storageItem)
	}
	// If few roles are required but no token
	if (
		roles.length > 0 &&
		(user === null || Array.isArray(user.roles) === false)
	) {
		return false
	}
	return roles.every(role => user?.roles.includes(role))
}

export function isAuth(): boolean {
	const storageItem = localStorage.getItem("user")

	if (storageItem !== null) {
		return true
	}
	return false
}

export enum ROLE {
	ADMIN = "ROLE_ADMIN",
	USER = "ROLE_USER",
	COMPANY = "ROLE_COMPANY",
}
