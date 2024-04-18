import Offer from "../../api/models/offer"
import { parseOfferType } from "../../enums/OfferType"

interface OfferTileProps {
	offer: Offer
	onClick: (offer: Offer) => any
	selectedOfferId?: number
}

function OfferTile({ offer, onClick, selectedOfferId }: OfferTileProps) {
	return (
		<div
			onClick={() => onClick(offer)}
			className={`offer-tile ${selectedOfferId ? "w-full" : ""}${
				selectedOfferId === offer.id ? " offer-tile--selected" : ""
			}`}
		>
			<div className="offer-tile__image">
				<img alt="Logo" src={offer.imageUrl} width="300" height="140" />
			</div>
			<h4>{offer.title}</h4>
			<div className="overflow-hidden w-5/6">
				<b>{parseOfferType(offer.type)}</b>
			</div>
			<span className="offer-tile__postal">{offer.city}</span>
		</div>
	)
}

export default OfferTile
