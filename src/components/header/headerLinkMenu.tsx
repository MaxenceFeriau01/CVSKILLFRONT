import * as React from "react"

import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import { useNavigate } from "react-router-dom"
import { ISubMenuItem } from "../../utils/constants"

interface HeaderLinkMenuProps {
	anchorRef: any
	open: boolean
	setOpen: any
	subMenu: Array<ISubMenuItem> | undefined
}

function HeaderLinkMenu({
	anchorRef,
	open,
	setOpen,
	subMenu,
}: HeaderLinkMenuProps) {
	const navigate = useNavigate()
	const handleClose = (
		event: Event | React.SyntheticEvent,
		url: string | null = null
	) => {
		url && navigate(url)
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return
		}

		setOpen(false)
	}

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === "Tab") {
			event.preventDefault()
			setOpen(false)
		} else if (event.key === "Escape") {
			setOpen(false)
		}
	}
	return (
		<Popper
			className="header-link-menu"
			open={open}
			anchorEl={anchorRef.current}
			role={undefined}
			placement="bottom-start"
			transition
			disablePortal
		>
			{({ TransitionProps, placement }) => (
				<Grow
					{...TransitionProps}
					style={{
						transformOrigin:
							placement === "bottom-start"
								? "left top"
								: "left bottom",
					}}
				>
					<Paper>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList
								autoFocusItem={open}
								id="composition-menu"
								aria-labelledby="composition-button"
								onKeyDown={e => handleListKeyDown(e)}
							>
								{subMenu?.map(m => (
									<MenuItem
										key={m.text}
										onClick={e => handleClose(e, m.url)}
									>
										<m.Icon />
										{m.text}
									</MenuItem>
								))}
							</MenuList>
						</ClickAwayListener>
					</Paper>
				</Grow>
			)}
		</Popper>
	)
}
export default HeaderLinkMenu
