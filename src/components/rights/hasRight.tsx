import { ReactElement, useContext } from "react"
import UserContext from "../../contexts/user"
import { hasRoles, isAuth } from "../../utils/rightsUtil"

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
		const { userRoles } = useContext(UserContext)

		if (userRoles && hasRoles(roles || [], userRoles)) {
			return children
		}
	}
	return null
}
export default HasRight
