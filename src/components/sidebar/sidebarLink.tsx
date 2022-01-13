import { Link } from "react-router-dom"

interface SidebarLinkProps {
	text: string
	Icon: any
	url: string
}

function SidebarLink({ text, Icon, url }: SidebarLinkProps) {
	return (
		<Link className="link" to={url}>
			<Icon />
			<h2>{text}</h2>
		</Link>
	)
}
export default SidebarLink
