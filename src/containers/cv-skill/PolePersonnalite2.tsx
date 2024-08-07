import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PersonalityType {
  type: string;
  traits: string[];
}

const personalityTypes: PersonalityType[] = [
  { type: "Animateur (ENFJ)", traits: ["Empathique", "Loyal", "Responsable", "Meneur"] },
  { type: "Communicateur (ENFP)", traits: ["Enthousiate", "Créatif", "Flexible", "Altruiste"] },
  { type: "Meneur (ENTJ)", traits: ["Direct", "Franc", "Décidé", "Leader"] },
  { type: "Innovateur (ENTP)", traits: ["Ingénieux", "Polyvalent", "Créatif", "Décideur"] },
  { type: "Nouricier (ESFJ)", traits: ["Coopératif", "Consciencieux", "Empathique", "Persévérant"] },
  { type: "Le bout en train (ESFP)", traits: ["Tolérant", "Enthousiate", "Sociable", "Adaptable"] },
  { type: "Organisateur (ESTJ)", traits: ["Pratique", "Réaliste", "Factuel", "Efficace"] },
  { type: "Pragmatique (ESTP)", traits: ["Flexible", "Tolérant", "Observateur", "Réaliste"] },
  { type: "Visionnaire (INFJ)", traits: ["Altruiste", "Original", "Persévérant", "Mesuré"] },
  { type: "Zélateur (INFP)", traits: ["Idéaliste", "Curieux", "Adaptable", "Tolérant"] },
  { type: "Perfectionniste (INTJ)", traits: ["Indépendant", "Déterminée", "Critique", "Organisé"] },
  { type: "Concepteur (INTP)", traits: ["Réservé", "Souple", "Critique", "Analytique"] },
  { type: "Protecteur (ISFJ)", traits: ["Responsable", "Consciencieux", "Altruiste", "Prévenant"] },
  { type: "Conciliateur (ISFP)", traits: ["Mesuré", "Tranquille", "Aimable", "Autonome"] },
  { type: "Administrateur (ISTJ)", traits: ["Sérieux", "Minutieux", "Efficace", "Responsable"] },
  { type: "Praticien (ISTP)", traits: ["Observateur", "Calme", "Mesuré", "Curieux"] },
];

function PolePersonnalite2() {
  const [selectedType, setSelectedType] = useState<string>('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    // Sauvegarder le choix
    console.log('Type de personnalité sélectionné:', selectedType);
    
    // Ici, vous pouvez ajouter la logique pour sauvegarder le type sélectionné
    // Par exemple, envoyer à une API ou stocker dans le localStorage
    localStorage.setItem('selectedPersonalityType', selectedType);

    // Naviguer vers la page suivante
    navigate('/cvskill/PoleAtouts'); // Remplacez '/page-suivante' par le chemin de votre prochaine page
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
      <h2 className="text-2xl font-bold text-green-500 text-center mb-6">Pôle Personnalité</h2>
      <p className="mt-6 font-bold">Partie 2</p>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="personality type"
          name="personality-type"
          value={selectedType}
          onChange={handleRadioChange}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalityTypes.map((personality) => (
              <div key={personality.type} className="border p-4 rounded-lg">
                <FormControlLabel
                  value={personality.type}
                  control={<Radio />}
                  label={
                    <div>
                      <p className="font-semibold">{personality.type}</p>
                      <p className="text-sm text-gray-600">{personality.traits.join(", ")}</p>
                    </div>
                  }
                  
                />
              </div>
            ))}
          </div>
        </RadioGroup>
      </FormControl>
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          className="w-full mt-6 py-2 px-4  MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-4sfg2-MuiButton-root"
          disabled={!selectedType}
        >
          Sauvegarder le choix
        </Button>
      </div>
    </div>
  );
}

export default PolePersonnalite2;