import { useEffect, useState } from "react"
import userService from "../api/services/userService"
import UserContext, { defaultState } from "./user"
import User from "../api/models/user"

interface UserProviderProps {
	children: any
}

function UserProvider({ children }: UserProviderProps) {
	const [user, setUser] = useState<User>()
	const [userRoles, setUserRoles] = useState<string[]>([])

	useEffect(() => {
		// get user with jwt token from local storage
		const storageItem = localStorage.getItem("user")
		let lUser
		if (storageItem !== null) lUser = JSON.parse(storageItem)

		if (lUser) {
			userService.getSelf().then(res => setUser(res))
		}
	}, [])

	useEffect(() => {
		if (user != null)
			userService.getUserRoles().then(res => setUserRoles(res))
	}, [user])

	return (
		<UserContext.Provider
			value={{
				user,
				userRoles,
				setUser,
				setUserRoles,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
