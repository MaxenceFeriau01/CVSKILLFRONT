import React from "react"
import User from "../api/models/user"

interface IUserContext {
	user: User | null
	setUser: () => void
}

export const defaultState = {
	user: null,
	setUser: () => {},
}

const UserContext = React.createContext<any>(defaultState)

export default UserContext
