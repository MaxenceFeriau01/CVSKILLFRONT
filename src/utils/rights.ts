/**
 *
 * @param roles  accepted roles
 * @param userRoles  current user roles
 * @return true if the user has the roles, false otherwise
 */

export function hasRoles(
	roles: Array<string>,
	userRoles: Array<string>
): boolean {
	// Mean it's public route
	if (roles.length === 0) {
		return true
	}

	return roles.every(role => userRoles.includes(role))

	// If few roles are required but no token
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
