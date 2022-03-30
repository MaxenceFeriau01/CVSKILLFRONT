import { useEffect, useState } from "react"
import UserContext, { defaultState } from "./user"

interface UserProviderProps {
	children: any
}

function UserProvider({ children }: UserProviderProps) {
	useEffect(() => {
		// get user with jwt token from local storage
		const storageItem = localStorage.getItem("user")
		let lUser
		if (storageItem !== null) lUser = JSON.parse(storageItem)

		if (lUser) {
			setUser(lUser)
		}
	}, [])
	const [user, setUser] = useState(defaultState.user)

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
