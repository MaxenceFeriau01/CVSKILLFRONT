enum OfferType {
	PROFESSIONAL_CONTRACT = "PROFESSIONAL_CONTRACT",
	LEARNING_CONTRACT = "LEARNING_CONTRACT",
}

export function parseOfferType(offerType?: OfferType) {
	let type: string = ""
	switch (offerType) {
		case OfferType.PROFESSIONAL_CONTRACT:
			type = "Contrat de professionnalisation"
			break
		case OfferType.LEARNING_CONTRACT:
			type = "Contrat d'apprentissage"
			break
		default:
			type = "Autre type de contrat"
			break
	}
	return type
}

export default OfferType
