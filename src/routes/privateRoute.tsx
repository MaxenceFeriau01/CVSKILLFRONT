import { Navigate, useLocation } from "react-router-dom"
import { ReactElement, useEffect, useState } from "react"
import { isAuth, hasRoles } from "../utils/rightsUtil"
import userService from "../api/services/userService"

interface PrivateRouteProps {
	children: ReactElement<any, any>
	roles?: Array<string> // The specific roles how has access to the route
}
// Show the specific route according  to the user's roles
function PrivateRoute({
	children,
	roles,
}: PrivateRouteProps): ReactElement<any, any> | null {
	const [userRoles, setUserRoles] = useState<null | Array<string>>(null)
	useEffect(() => {
		userService.getUserRoles().then(res => setUserRoles(res))
	}, [])
	const location = useLocation()

	if (!isAuth()) {
		return <Navigate to="/login" state={{ from: location }} />
	}

	if (userRoles != null) {
		if (!hasRoles(roles || [], userRoles)) {
			return <Navigate to="/403" />
		}
		return children
	}

	return null
}

export default PrivateRoute
