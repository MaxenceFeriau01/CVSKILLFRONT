import React from "react"

export const defaultState = {
	user: null,
	setUser: () => {},
}

const UserContext = React.createContext<any>(defaultState)

export default UserContext
