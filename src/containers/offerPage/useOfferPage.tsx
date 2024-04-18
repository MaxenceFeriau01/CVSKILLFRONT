import { useState } from "react"
import { useQuery } from "react-query"
import Offer from "../../api/models/offer"
import offerService from "../../api/services/offerService"

function useOfferPage() {
	const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>()
	const offers = useQuery<Offer[]>(["offers"], () =>
		offerService.getAllWithFilters()
	)

	const onSelectOffer = (offer?: Offer) => {
		setSelectedOffer(offer)
	}

	return {
		offers,
		selectedOffer,
		setSelectedOffer,
		onSelectOffer,
	}
}

export default useOfferPage
