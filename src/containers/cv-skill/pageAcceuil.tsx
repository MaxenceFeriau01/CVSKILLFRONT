import { Button } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./pageAcceuil.scss"

function PageAcceuil() {
	const navigate = useNavigate()
	const [displayText, setDisplayText] = useState("")
	const [isButtonVisible, setIsButtonVisible] = useState(false)
	const textContainerRef = useRef<HTMLDivElement>(null)

	const handleClick = () => {
		navigate("/cvskill/poleCivilite")
	}

	useEffect(() => {
		const fullText = `Bonjour,<br><br>L'association Entreprendre Ensemble a innové avec un nouveau concept, le "CV-SKILL", afin de faciliter la recherche des demandeurs de stage ou d'alternance et de mieux cibler les profils par les entreprises.<br><br>Le CV-SKILL se définit en quatre étapes :<br><br>1. Pôle Civilité (modifiable à tout moment)<br>2. Pôle Personnalité<br>3. Pôle Atout<br>4. Loisir (modifiable à tout moment)<br><br>Les pôles Personnalité et Atout ne seront pas modifiables après acceptation. Seule l'association peut revenir dessus à votre demande.<br><br>Nous espérons que cette innovation aidera tant les candidats que les recruteurs dans leurs démarches respectives.<br><br>Cordialement,<br>L'équipe d'Entreprendre Ensemble`
		let index = 0
		const speed = 50 // Vitesse de l'animation en millisecondes
		// eslint-disable-next-line no-undef
		let typingInterval: NodeJS.Timeout

		function typeWriter() {
			if (index < fullText.length) {
				setDisplayText(prevText => prevText + fullText.charAt(index))
				index += 1
				if (textContainerRef.current) {
					textContainerRef.current.scrollIntoView({
						behavior: "smooth",
						block: "end",
					})
				}
			} else {
				clearInterval(typingInterval)
				setIsButtonVisible(true)
			}
		}

		function showFullText() {
			clearInterval(typingInterval)
			setDisplayText(fullText)
			setIsButtonVisible(true)
		}

		typingInterval = setInterval(typeWriter, speed)

		const handleKeyPress = () => {
			showFullText()
		}

		window.addEventListener("keydown", handleKeyPress)

		return () => {
			clearInterval(typingInterval)
			window.removeEventListener("keydown", handleKeyPress)
		}
	}, [])

	return (
		<div className="container  mx-auto p-4 max-w-2xl  relative overflow-y-auto h-[calc(100vh-8rem)] pb-16">
			<style>
				{`
    .container::-webkit-scrollbar {
        display: none;
    }
    `}
			</style>
			<div className="flex-grow overflow-auto flex flex-col justify-center items-center">
				<div className="container mx-auto p-4 max-w-full">
					<h2 className="text-2xl font-bold text-green-500 text-center mb-6 bg-green-100 p-2 rounded">
						CV-SKILL
					</h2>
					<div
						id="typewriter"
						className="typewriter-text mb-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto"
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{ __html: displayText }}
						ref={textContainerRef}
					/>
					{isButtonVisible && (
						<div className="flex justify-center mt-8 mb-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleClick}
								type="button"
								className="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-4sfg2-MuiButton-root"
							>
								Passons à l'étape de création de votre CV-SKILL
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default PageAcceuil
