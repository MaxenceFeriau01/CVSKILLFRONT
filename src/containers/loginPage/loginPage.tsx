import { Button, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import useHideElement from "../../hooks/hideElement"
import logo from "../../resources/images/logo.png"

function LoginPage() {
	useHideElement(["sidebar", "header"])

	const { handleSubmit, control } = useForm()
	return (
		<section className="login">
			<form className="login-form">
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
