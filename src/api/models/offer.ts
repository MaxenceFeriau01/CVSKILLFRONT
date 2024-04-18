import OfferType from "../../enums/OfferType"

class Offer {
	id!: number

	title!: string

	city!: string

	reference!: string

	expiresAt!: string

	description!: string

	beginsAt!: string

	imageUrl!: string

	applyUrl!: string

	type!: OfferType

	longitude?: number

	latitude?: number
}

export default Offer
