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

	const profil = () => {
		navigate("/profil")
	}

	return (
		<div className="popover">
			<div className="popover--profil" onClick={() => profil()}>
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
