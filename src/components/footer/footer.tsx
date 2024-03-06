import { useEffect, useState } from "react"
import { MESSAGES } from "./constant"

function Footer() {
	const [message, setMessage] = useState<{
		label: string
		link: string
		isMail: boolean
	}>(MESSAGES[0])

	useEffect(() => {
		let index: number = 0

		const displayMessageSchedular = () => {
			setMessage(MESSAGES[index])
			index = (index + 1) % MESSAGES.length
		}

		const intervalId = setInterval(displayMessageSchedular, 5000)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	return (
		<div className="footer">
			<p>
				{message.label}&nbsp;
				{message.isMail ? (
					<a href={`mailto:${message.link}`}>{message.link}</a>
				) : (
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={message.link}
					>
						{message.link}
					</a>
				)}
			</p>
		</div>
	)
}
export default Footer
