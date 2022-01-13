import React from "react"

interface IShowSidebarContext {
	showSidebar: boolean
	setShowSidebar: (value: boolean) => void
}

export const defaultState = {
	showSidebar: true,
	setShowSidebar: () => {},
}

const ShowSidebarContext =
	React.createContext<IShowSidebarContext>(defaultState)

export default ShowSidebarContext
