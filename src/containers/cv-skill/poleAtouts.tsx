import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AtoutType {
  id: string;
  name: string;
}

const atouts: AtoutType[] = [
  { id: "1", name: "Adaptation" },
  { id: "2", name: "Organisation" },
  { id: "3", name: "Rigueur" },
  { id: "4", name: "Dynamisme" },
  { id: "5", name: "Ténacité" },
  { id: "6", name: "Travail en équipe" },
  { id: "7", name: "Négociation" },
  { id: "8", name: "Respect des règles" },
  { id: "9", name: "Sociabilité" },
  { id: "10", name: "Maîtrise émotionnelle" },
  { id: "11", name: "Autonomie" },
  { id: "12", name: "Ambition" },
  { id: "13", name: "Goût du challenge" },
  { id: "14", name: "Leadership" },
  { id: "15", name: "Réflexion" },
  { id: "16", name: "Altruisme" },
  { id: "17", name: "Sens du service" }
];

function PoleAtouts() {
  const [selectedAtouts, setSelectedAtouts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (checked && selectedAtouts.length >= 5) {
      setError("Vous ne pouvez sélectionner que 5 choix maximum.");
      return;
    }
    setError(null);
    setSelectedAtouts(prev => 
      checked ? [...prev, name] : prev.filter(item => item !== name)
    );
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log('Atouts sélectionnés:', selectedAtouts);
    localStorage.setItem('selectedAtouts', JSON.stringify(selectedAtouts));
    navigate('/cvskill/poleInterets');
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
      <h2 className="text-2xl font-bold text-green-500 text-center mb-6">Pôle Atouts</h2>
     
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {atouts.map((atout) => (
          <div key={atout.id} className="border p-4 rounded-lg">
            <label htmlFor={atout.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                id={atout.id}
                name={atout.name}
                checked={selectedAtouts.includes(atout.name)}
                onChange={handleChange}
                className="h-5 w-5 text-green-500 border-green-500 focus:ring-green-500"
              />
              <span className="text-gray-700 font-semibold">{atout.name}</span>
            </label>
          </div>
        ))}
      </div>
      <p className="mt-4 font-bold text-center text-red-500">*5 choix maximum</p>
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          className="w-full mt-6 py-2 px-4 MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-4sfg2-MuiButton-root"
          disabled={selectedAtouts.length === 0}
        >
          Sauvegarder les choix
        </Button>
      </div>
    </div>
  );
}

export default PoleAtouts;