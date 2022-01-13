import React, { useState } from "react"
import ShowSidebarContext, { defaultState } from "./showSidebar"

interface ShowSidebarProviderProps {
	children: any
}

function ShowSidebarProvider({ children }: ShowSidebarProviderProps) {
	const [showSidebar, setShowSidebar] = useState(defaultState.showSidebar)

	return (
		<ShowSidebarContext.Provider
			value={{
				showSidebar,
				setShowSidebar: () => setShowSidebar(!showSidebar),
			}}
		>
			{children}
		</ShowSidebarContext.Provider>
	)
}

export default ShowSidebarProvider
