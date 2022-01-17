import { Button, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import useHideElement from "../../hooks/hideElement"
import logo from "../../resources/images/logo.png"

function RegistrationPage() {
	useHideElement(["sidebar", "header"])

	const { handleSubmit, control } = useForm()
	return (
		<section className="registration">
			<form className="registration-form">
				<Typography variant="h4" mb={2}>
					Inscription
				</Typography>
				<img src={logo} alt="logo" />
				<Controller
					name="nom"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							value={value}
							onChange={onChange}
							label="Nom"
							variant="standard"
							autoComplete="family-name"
						/>
					)}
				/>
				<Controller
					name="firstName"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							value={value}
							onChange={onChange}
							label="Prénom"
							variant="standard"
							autoComplete="given-name"
						/>
					)}
				/>
				<Controller
					name="telephone"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							value={value}
							onChange={onChange}
							label="Telephone"
							variant="standard"
							type="tel"
							autoComplete="tel"
						/>
					)}
				/>
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
							variant="standard"
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
							variant="standard"
							autoComplete="password"
						/>
					)}
				/>
				<Button type="submit">S'inscrire</Button>
				<span className="registration-form-registration">
					Déja inscrit? <Link to="/login">Se connecter</Link>
				</span>
			</form>
		</section>
	)
}

export default RegistrationPage
