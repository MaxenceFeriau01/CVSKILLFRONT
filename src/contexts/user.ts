import React from "react"

export const defaultState = {
	user: null,
	userRoles: [],
	setUser: () => {},
}

const UserContext = React.createContext<any>(defaultState)

export default UserContext
