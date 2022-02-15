import { Button, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import User from "../../apis/models/user"
import userService from "../../apis/services/userService"
import useHideElement from "../../hooks/hideElement"
import logo from "../../resources/images/logo.png"

function RegistrationPage() {
	useHideElement(["sidebar", "header", "footer"])
	const navigate = useNavigate()
	const { handleSubmit, control } = useForm()

	const postRegister = useMutation(
		(newCompany: User) => userService.register(newCompany),
		{
			onSuccess: () => {
				navigate("/login")
			},
		}
	)

	const onSubmit = (data: any) => {
		postRegister.mutate(data)
	}

	return (
		<section className="registration">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="registration-form"
			>
				<Typography variant="h4" mb={2}>
					Inscription
				</Typography>
				<img src={logo} alt="logo" />
				<div className="registration-form--scroll">
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
								variant="outlined"
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
								variant="outlined"
								autoComplete="given-name"
							/>
						)}
					/>
					<Controller
						name="phone"
						control={control}
						defaultValue=""
						render={({ field: { onChange, value } }) => (
							<TextField
								required
								value={value}
								onChange={onChange}
								label="Telephone"
								variant="outlined"
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
					<Button type="submit">S'inscrire</Button>
					<span className="registration-form-registration">
						Déja inscrit? <Link to="/login">Se connecter</Link>
					</span>
				</div>
			</form>
		</section>
	)
}

export default RegistrationPage
