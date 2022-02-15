import { Button, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { Link } from "react-router-dom"
import Credentials from "../../apis/models/credentials"
import userService from "../../apis/services/userService"
import useHideElement from "../../hooks/hideElement"
import logo from "../../resources/images/logo.svg"

function LoginPage() {
	useHideElement(["sidebar", "header", "footer"])

	const { handleSubmit, control } = useForm()

	const postAuthenticate = useMutation(
		(credentials: Credentials) => userService.authenticate(credentials),
		{
			//	onSuccess: () => {
			//	navigate("/")
			//		},
		}
	)

	const onSubmit = (data: any) => {
		postAuthenticate.mutate(data)
	}
	return (
		<section className="login">
			<form onSubmit={handleSubmit(onSubmit)} className="login-form">
				<Typography variant="h4" mb={2}>
					Authentification
				</Typography>
				<img src={logo} alt="logo" />
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
