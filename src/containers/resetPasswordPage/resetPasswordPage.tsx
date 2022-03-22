import { Alert, Button, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import userService from "../../api/services/userService"
import useHideElement from "../../hooks/hideElement"
import logo from "../../resources/images/logo.svg"

function ResetPassword() {
	useHideElement(["header", "footer"])
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
	} = useForm()

	const { token } = useParams()
	const navigate = useNavigate()

	const postResetPassword = useMutation(
		(newPassword: any) => userService.processResetPassword(newPassword),
		{
			onSuccess: () => {
				Swal.fire({
					title: "Votre mot de passe a été changé, vous pouvez vous connecter !",
					icon: "success",
					position: "bottom-end",
					showConfirmButton: false,
					timer: 1500,
				}).then(() => navigate("/login"))
			},
		}
	)

	const getResetPassword = useQuery(
		[],
		() => userService.showResetPassword(token || ""),

		{
			retry: false,
		}
	)

	const onSubmit = (data: any) => {
		postResetPassword.mutate({
			userId: getResetPassword.data,
			password: data.password,
		})
	}
	return (
		<section className="reset-password">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="reset-password-form"
			>
				<Typography variant="h4" mb={2}>
					Réinitialisation
				</Typography>
				<img src={logo} alt="logo" />

				<Controller
					name="password"
					rules={{
						minLength: {
							value: 8,
							message:
								"Le mot de passe doit avoir ou moins avoir 8 caractères",
						},
					}}
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							disabled={getResetPassword.isError}
							type="password"
							required
							value={value}
							onChange={onChange}
							label="Mot de passe"
							variant="outlined"
							autoComplete="off"
						/>
					)}
				/>
				{errors?.password && (
					<Alert severity="error">{errors.password.message}</Alert>
				)}
				<Controller
					name="confirmPassword"
					control={control}
					rules={{
						validate: value =>
							value === watch("password") ||
							"Les mots de passe ne correspondent pas",
					}}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							disabled={getResetPassword.isError}
							type="password"
							required
							value={value}
							onChange={onChange}
							label="Confirmation du mot de passe"
							variant="outlined"
							autoComplete="off"
						/>
					)}
				/>
				{errors?.confirmPassword && (
					<Alert severity="error">
						{errors.confirmPassword.message}
					</Alert>
				)}
				<Button type="submit" disabled={getResetPassword.isError}>
					Confirmer
				</Button>
			</form>
		</section>
	)
}

export default ResetPassword
