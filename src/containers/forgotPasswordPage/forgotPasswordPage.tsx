import { Button, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { Link } from "react-router-dom"
import userService from "../../api/services/userService"
import useHideElement from "../../hooks/hideElement"
import logo from "../../resources/images/logo.svg"

function ForgotPassword() {
	useHideElement(["header", "footer"])
	const { handleSubmit, control } = useForm()

	const postForgotPassword = useMutation((email: string) =>
		userService.forgotPassword(email)
	)

	const onSubmit = (data: any) => {
		postForgotPassword.mutate(data?.email)
	}
	return (
		<section className="forgot-password">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="forgot-password-form"
			>
				<Typography variant="h4" mb={2}>
					Mot de passe oublié
				</Typography>
				<img src={logo} alt="logo" />

				{postForgotPassword.isSuccess ? (
					<>
						<p className="forgot-password-success">
							Votre demande de réinitialisation de mot de passe a
							été reçue. Vous recevrez sous peu un e-mail
							contenant des instructions supplémentaires.
						</p>
						<Link to="/login">Retour à la page de connexion</Link>
					</>
				) : (
					<>
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
									helperText="Entrez votre email de connexion !"
								/>
							)}
						/>
						<Button type="submit">Confirmer</Button>
					</>
				)}
			</form>
		</section>
	)
}

export default ForgotPassword
