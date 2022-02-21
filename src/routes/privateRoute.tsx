import { Navigate, useLocation } from "react-router-dom"
import { ReactElement } from "react"
import { isAuth, hasRoles } from "../utils/rights"

interface PrivateRouteProps {
	children: ReactElement<any, any>
	roles?: Array<string>
}
// Show the specific route according  to the user's roles
function PrivateRoute({ children, roles }: PrivateRouteProps) {
	const location = useLocation()

	if (!isAuth()) {
		return <Navigate to="/login" state={{ from: location }} />
	}

	if (!hasRoles(roles || [])) {
		return <Navigate to="/403" />
	}

	return children
}

export default PrivateRoute
