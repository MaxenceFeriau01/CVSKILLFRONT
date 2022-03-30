import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LogoutIcon from "@mui/icons-material/Logout"
import userService from "../../api/services/userService"

import UserContext from "../../contexts/user"

function UserPopover() {
	const navigate = useNavigate()

	const { setUser } = useContext(UserContext)

	const logout = () => {
		window.localStorage.removeItem("user")
		navigate("/login")
		userService.setRoles([])
		setUser(null)
	}

	const profile = () => {
		navigate("/my-profile")
	}

	return (
		<div className="popover">
			<div className="popover--profile" onClick={() => profile()}>
				<AccountCircleIcon /> Mon profil
			</div>
			<p />
			<div className="popover--disconnect" onClick={() => logout()}>
				<LogoutIcon />
				Se déconnecter
			</div>
		</div>
	)
}
export default UserPopover
