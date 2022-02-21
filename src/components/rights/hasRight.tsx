import { ReactElement } from "react"
import { hasRoles } from "../../utils/rights"

interface HasRightProps {
	children: ReactElement<any, any>
	roles?: Array<string>
}

function HasRight({ children, roles }: HasRightProps) {
	if (hasRoles(roles || [])) {
		return children
	}
	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <></>
}
export default HasRight
