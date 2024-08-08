import { Button } from "@mui/material"
import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface CheckedItems {
	[key: string]: boolean
}

function PolePersonnalite() {
	const [checkedItems, setCheckedItems] = useState<CheckedItems>({})
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()
	const location = useLocation()
	const formData = location.state

	const items = [
		{ id: "1", name: "Sociabilité" },
		{ id: "2", name: "Esprit de compétition" },
		{ id: "3", name: "Conscience des autres" },
		{ id: "4", name: "Stabilité émotionnelle" },
		{ id: "5", name: "Intuition" },
		{ id: "6", name: "Méticulosité" },
		{ id: "7", name: "Sécurité - Pragmatisme" },
		{ id: "8", name: "Ouverture Imagination" },
	]

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target
		const checkedCount = Object.values(checkedItems).filter(Boolean).length

		if (checked && checkedCount >= 3) {
			setError("Vous ne pouvez sélectionner que 3 choix maximum.")
			return
		}

		setCheckedItems(prev => ({ ...prev, [name]: checked }))
		setError(null)
	}

	const handleSubmit = () => {
		const selectedItems = Object.entries(checkedItems)
			.filter(([_, value]) => value)
			.map(([key, _]) => key)
		localStorage.setItem(
			"selectedPersonalityTraits",
			JSON.stringify(selectedItems)
		)
		navigate("/cvskill/polePersonnalite2", {
			state: { civilite: formData, personnalite1: selectedItems },
		})
	}

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
				Pôle Personnalité
			</h2>
			<p className="mt-6 font-bold">Partie 1</p>
			{error && <p className="text-red-500 text-center">{error}</p>}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				{items.map(item => (
					<div key={item.id} className="border p-4 rounded-lg">
						<label
							htmlFor={item.id}
							className="flex items-center space-x-3 cursor-pointer"
						>
							<input
								type="checkbox"
								id={item.id}
								name={item.name}
								checked={checkedItems[item.name] || false}
								onChange={handleChange}
								className="h-5 w-5 text-green-500 border-green-500 focus:ring-green-500"
							/>
							<span className="text-gray-700 font-semibold">
								{item.name}
							</span>
						</label>
					</div>
				))}
			</div>
			<p className="mt-4 font-bold text-center text-red-500">
				*3 choix maximum
			</p>
			<div className="flex justify-center mt-8">
				<Button
					onClick={handleSubmit}
					variant="contained"
					color="primary"
					className="w-full mt-6 py-2 px-4 MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-4sfg2-MuiButton-root"
					disabled={
						Object.values(checkedItems).filter(Boolean).length === 0
					}
				>
					Page suivante
				</Button>
			</div>
		</div>
	)
}

export default PolePersonnalite
