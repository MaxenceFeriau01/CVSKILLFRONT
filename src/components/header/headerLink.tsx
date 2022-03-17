import { useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { INavLink } from "../../utils/constants"
import HasRight from "../rights/hasRight"
import HeaderLinkMenu from "./headerLinkMenu"

function HeaderLink({ text, Icon, url, roles, subMenu }: INavLink) {
	const [open, setOpen] = useState(false)
	const anchorRef = useRef<HTMLDivElement>(null)

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen)
	}
	return (
		<HasRight roles={roles}>
			{url !== null ? (
				<NavLink className="header-link" to={url}>
					<Icon fontSize="inherit" />
					<span>{text}</span>
				</NavLink>
			) : (
				<div
					ref={anchorRef}
					onClick={handleToggle}
					className="header-link"
				>
					<Icon fontSize="inherit" />
					<span>{text}</span>
					<HeaderLinkMenu
						subMenu={subMenu}
						anchorRef={anchorRef}
						open={open}
						setOpen={setOpen}
					/>
				</div>
			)}
		</HasRight>
	)
}
export default HeaderLink
