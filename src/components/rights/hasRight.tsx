import { ReactElement, useEffect, useState } from "react"
import userService from "../../api/services/userService"
import { hasRoles, isAuth } from "../../utils/rights"

/**
 * @param roles  accepted roles
 * @param children  elements display if the roles are correct
 */
interface HasRightProps {
	children: ReactElement<any, any>
	roles?: Array<string>
}

function HasRight({ children, roles }: HasRightProps) {
	if (isAuth()) {
		const [usersRoles, setUsersRoles] = useState<null | Array<string>>(null)
		useEffect(() => {
			userService.getUserRoles().then(res => setUsersRoles(res))
		}, [])

		if (usersRoles && hasRoles(roles || [], usersRoles)) {
			return children
		}
	}
	return null
}
export default HasRight
