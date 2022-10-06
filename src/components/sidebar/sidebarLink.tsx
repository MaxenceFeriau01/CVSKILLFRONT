import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState } from "react"
import { Collapse } from "react-collapse"
import { NavLink } from "react-router-dom"
import { INavLink } from "../../utils/constants"
import HasRight from "../rights/hasRight"

function SidebarLink({ text, Icon, url, roles, onClick, subMenu }: INavLink) {
	const [open, setOpen] = useState(true)

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen)
	}

	return (
		<HasRight roles={roles}>
			{url !== null ? (
				<NavLink className="link" to={url} onClick={onClick}>
					<Icon />
					<span>{text}</span>
				</NavLink>
			) : (
				<div className="link-collapse">
					<div className="flex">
						<Icon fontSize="inherit" />
						<span>{text}</span>
						<ExpandMoreIcon
							onClick={handleToggle}
							className={`cursor-pointer mt-1 ${
								open ? "rotate-180" : ""
							}`}
						/>
					</div>
					<Collapse isOpened={open}>
						{subMenu?.map(m => (
							<NavLink
								key={m.text}
								to={m.url || ""}
								onClick={onClick}
							>
								<p />
								{m.text}
							</NavLink>
						))}
					</Collapse>
				</div>
			)}
		</HasRight>
	)
}
export default SidebarLink
