import { Button } from '@mui/material';
import React, { useState } from 'react';

interface CheckedItems {
  [key: string]: boolean;
}

function PoleInterets() {
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [error, setError] = useState<string | null>(null);

  const items = [
    { id: "1", name: "Activités extérieures" },
    { id: "2", name: "Activités manuelles et techniques" },
    { id: "3", name: "Curiosité intellectuelle et apprentissage" },
    { id: "4", name: "Science et technologie" },
    { id: "5", name: "Sens esthétique et expression" },
    { id: "6", name: "Créativité et conception" },
    { id: "7", name: "Dévouement aux autres" },
    { id: "8", name: "Relations personnelles" },
    { id: "9", name: "Entrepreneur" },
    { id: "10", name: "Leadership" },
    { id: "11", name: "Méthodique" },
    { id: "12", name: "Données et nombres" }
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const selectedCount = Object.values(checkedItems).filter(Boolean).length;

    if (checked && selectedCount >= 6) {
      setError("Vous ne pouvez sélectionner que 6 choix maximum.");
      return;
    }

    if (!checked && selectedCount <= 3) {
      setError("Vous devez sélectionner au moins 3 choix.");
      return;
    }

    setError(null);
    setCheckedItems({
      ...checkedItems,
      [name]: checked
    });
  };

  const handleSubmit = () => {
    // Logique de soumission des données
    console.log('Checked items:', checkedItems);
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
      <h2 className="text-2xl font-bold text-green-500 text-center mb-6">Mes Intérêts</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg">
            <label htmlFor={item.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                id={item.id}
                name={item.name}
                checked={checkedItems[item.name] || false}
                onChange={handleChange}
                className="h-5 w-5"
              />
              <span className="text-gray-700 font-semibold">{item.name}</span>
            </label>
          </div>
        ))}
      </div>
      
      <p className="mt-4 font-bold text-center text-red-500">*3 à 6 choix maximum</p>
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          className="w-full mt-6 py-2 px-4 MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-4sfg2-MuiButton-root"
          disabled={Object.values(checkedItems).filter(Boolean).length < 3}
        >
          Creation du CV-SKILL
        </Button>
      </div>
    </div>
  );
}

export default PoleInterets;