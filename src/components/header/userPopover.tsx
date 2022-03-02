import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import userContext from "../../contexts/user"

function UserPopover() {
	const navigate = useNavigate()

	const { user, setUser } = useContext(userContext)

	const logout = () => {
		window.localStorage.removeItem("user")
		navigate("/login")
		setUser(null)
	}

	const profile = () => {
		navigate("/my-profile")
	}

	return (
		<div className="popover">
			<div className="popover--profile" onClick={() => profile()}>
				Mon profil
			</div>
			<p />
			<div className="popover--disconnect" onClick={() => logout()}>
				Se déconnecter
			</div>
		</div>
	)
}
export default UserPopover
