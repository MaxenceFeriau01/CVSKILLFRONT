import HomeIcon from "@mui/icons-material/Home"
import MenuIcon from "@mui/icons-material/Menu"
import { useContext } from "react"
import { Link } from "react-router-dom"
import LoginIcon from "@mui/icons-material/Login"
import ShowSidebarContext from "../../contexts/showSidebar"

function Header() {
	const { showSidebar, setShowSidebar } = useContext(ShowSidebarContext)

	function toggleSideBar() {
		setShowSidebar(!showSidebar)
	}
	return (
		<div className="header">
			<MenuIcon
				onClick={() => toggleSideBar()}
				className="header_svg--menu"
			/>
			<Link to="/">
				<HomeIcon className="header_svg--home" />
			</Link>

			<Link className="header_svg--login" to="/login">
				<LoginIcon /> Connexion
			</Link>
		</div>
	)
}
export default Header
