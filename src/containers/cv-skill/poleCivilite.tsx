import { Alert, Button, InputLabel, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactSelectOption from "../../api/models/reactSelectOption";
import { CIVILITY_OPTIONS } from "../../components/controls/constants";
import CustomSelect from "../../components/inputs/customSelect";
import "./cv-skill.scss";
import UploadPhoto from "./uploadPhoto";

interface UserControlsProps {
	errors?: Record<string, any>;
}

interface FormValues {
	civility: string;
	name: string;
	firstName: string;
	phone: string;
	email: string;
	dateOfBirth: string;
	diplome: string;
}

function Cvskillpage({ errors }: UserControlsProps) {
	const { control, handleSubmit, getValues } = useForm<FormValues>({
		defaultValues: {
			civility: "",
			name: "",
			firstName: "",
			phone: "",
			email: "",
			dateOfBirth: "",
			diplome: "",
		},
	});

	const navigate = useNavigate();

	const onSubmit = (data: FormValues) => {
		console.log("Form data:", data);
		navigate("/cvskill/polePersonnalite");
	};

	const handleClick = () => {
		const currentValues = getValues();
		console.log("Current form values:", currentValues);
		navigate("/cvskill/polePersonnalite", { state: currentValues });
	};

	return (
		<div className="container mx-auto p-4 max-w-md relative overflow-y-auto h-[calc(100vh-8rem)] pb-16">
			<style>
				{`
					.container::-webkit-scrollbar {
						display: none;
					}
				`}
			</style>
			<h2 className="text-2xl font-bold text-green-500 text-center mb-6">
				Pole Civilité
			</h2>
			<div className="">
				<UploadPhoto />
			</div>

			<div className="space-y-4 mt-16">
				<div className="mb-4">
					<div className="">
						<InputLabel className="block text-sm font-medium text-gray-700 mb-1">
							Civilité *
						</InputLabel>
						<Controller
							rules={{
								required: "La civilité est requise",
							}}
							name="civility"
							control={control}
							render={({ field: { value, onChange, onBlur } }) => (
								<CustomSelect
									isSearchable
									options={CIVILITY_OPTIONS}
									placeholder="Choisissez..."
									onBlur={onBlur}
									value={CIVILITY_OPTIONS.find(
										(c: ReactSelectOption) => c.value === value
									)}
									onChange={(val: ReactSelectOption) => onChange(val.value)}
									className="select-form-control z-60"
								/>
							)}
						/>
						{errors?.civility && (
							<Alert severity="error" className="mt-2 text-sm text-red-600">
								{errors.civility.message}
							</Alert>
						)}
					</div>

					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								required
								label="Nom"
								variant="outlined"
								autoComplete="family-name"
								className="w-full mt-4"
								InputProps={{
									className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
								}}
							/>
						)}
					/>
					<Controller
						name="firstName"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								required
								label="Prénom"
								variant="outlined"
								autoComplete="given-name"
								className="w-full mt-4"
								InputProps={{
									className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
								}}
							/>
						)}
					/>
					<Controller
						name="phone"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								required
								label="Telephone"
								variant="outlined"
								type="tel"
								autoComplete="tel"
								className="w-full mt-4"
								InputProps={{
									className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
								}}
							/>
						)}
					/>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								type="email"
								required
								label="Email"
								variant="outlined"
								autoComplete="email"
								className="w-full mt-4"
								InputProps={{
									className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
								}}
							/>
						)}
					/>
					<div className="mt-4">
						<Controller
							name="dateOfBirth"
							control={control}
							rules={{
								required: "La date de naissance est requise",
							}}
							render={({ field }) => (
								<TextField
									{...field}
									label="Date de naissance"
									type="date"
									InputLabelProps={{
										shrink: true,
									}}
									inputProps={{
										max: "2100-01-01",
									}}
									className="w-full hide-calendar"
								/>
							)}
						/>
						{errors?.dateOfBirth && (
							<Alert severity="error" className="mt-2 text-sm text-red-600">
								{errors.dateOfBirth.message}
							</Alert>
						)}
					</div>
					<div className="mt-4">
						<InputLabel className="block text-sm font-medium text-gray-700 mb-1">
							Sélection de votre dernière classe fréquentée ou diplôme obtenu
						</InputLabel>
						<Controller
							name="diplome"
							control={control}
							render={({ field }) => (
								<CustomSelect
									{...field}
									isSearchable
									options={[
										{ value: "brevet", label: "Brevet des collèges" },
										{
											value: "cap",
											label: "CAP (Certificat d'Aptitude Professionnelle)",
										},
										{
											value: "bep",
											label: "BEP (Brevet d'Études Professionnelles)",
										},
										{
											value: "bac",
											label: "Baccalauréat (général, technologique ou professionnel)",
										},
										{
											value: "bts",
											label: "BTS (Brevet de Technicien Supérieur)",
										},
										{
											value: "dut",
											label: "DUT (Diplôme Universitaire de Technologie)",
										},
										{ value: "licence", label: "Licence (Bac+3)" },
										{ value: "master", label: "Master (Bac+5)" },
										{ value: "doctorat", label: "Doctorat (Bac+8)" },
										{ value: "autre", label: "Autre diplôme ou formation" },
									]}
									placeholder="Choisissez..."
									className="select-form-control"
								/>
							)}
						/>
					</div>

					<Button
						variant="contained"
						color="primary"
						onClick={handleClick}
						type="button"
						className="w-full mt-6 py-2 px-4 MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-4sfg2-MuiButton-root"
					>
						Page suivante
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Cvskillpage;