import { Button, TextField, Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import Credentials from "../../api/models/credentials"
import User from "../../api/models/user"
import userService from "../../api/services/userService"
import UserContext from "../../contexts/user"
import useHideElement from "../../hooks/hideElement"
import logo from "../../resources/images/logo.svg"

function LoginPage() {
	useHideElement(["header", "footer"])
	const navigate = useNavigate()

	const { user, setUser } = useContext(UserContext)

	const { handleSubmit, control } = useForm()

	const postAuthenticate = useMutation(
		(credentials: Credentials) => userService.authenticate(credentials),
		{
			onSuccess: (data: User) => {
				localStorage.setItem("user", JSON.stringify(data))
				localStorage.removeItem("counted")
				setUser(data)
				navigate("/companies")
			},
		}
	)
	useEffect(() => {
		if (user) {
			navigate("/companies")
		}
	}, [])

	const onSubmit = (data: any) => {
		postAuthenticate.mutate(data)
	}
	return (
		<section className="login">
			<form onSubmit={handleSubmit(onSubmit)} className="login-form">
				<Typography variant="h4" mb={2}>
					Authentification
				</Typography>
				<img src={logo} alt="logo" width="300" height="90" />
				<Controller
					name="email"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							type="email"
							required
							value={value}
							onChange={onChange}
							label="Email"
							variant="outlined"
							autoComplete="email"
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							type="password"
							required
							value={value}
							onChange={onChange}
							label="Mot de passe"
							variant="outlined"
							autoComplete="password"
						/>
					)}
				/>
				<Link className="login-forgot-password" to="/forgot-password">
					Mot de passe oublié ?
				</Link>
				<Button type="submit">Se connecter</Button>
				<span className="login-form-registration">
					Pas encore inscrit?{" "}
					<Link to="/registration">S'inscrire</Link>
				</span>
			</form>
		</section>
	)
}

export default LoginPage
