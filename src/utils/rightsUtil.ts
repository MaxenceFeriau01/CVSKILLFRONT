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
	let hasRole = false
	roles.forEach(role => {
		if (userRoles.includes(role)) {
			hasRole = true
		}
	})
	return hasRole
}

export function isAuth(): boolean {
	const storageItem = localStorage.getItem("user")

	if (storageItem !== null) {
		return true
	}
	return false
}
