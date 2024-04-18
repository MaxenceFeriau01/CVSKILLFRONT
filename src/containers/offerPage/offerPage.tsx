import { useContext } from "react"
import Offer from "../../api/models/offer"
import Widget from "../../components/widget/widget.component"
import { IMAGES } from "./constants"
import OfferTile from "./offerTile"
import useOfferPage from "./useOfferPage"
import UserContext from "../../contexts/user"
import OfferDetailsView from "./offerDetailsView"

function OfferPage() {
	const { user } = useContext(UserContext)
	const { offers, selectedOffer, setSelectedOffer, onSelectOffer } =
		useOfferPage()

	return (
		<section className="page offer-page">
			<header className="offer-page-header">
				<h1>Offres en alternance</h1>
			</header>
			<section
				className={`content offer-container ${
					user && user.token ? "" : "!max-h-full"
				}`}
			>
				<div
					className={`offer-list-content ${
						selectedOffer ? "tablet:w-1/2" : ""
					}`}
				>
					{offers.data && offers.data.length > 0 ? (
						offers.data.map(offer => (
							<OfferTile
								selectedOfferId={
									selectedOffer ? selectedOffer.id : 0
								}
								key={offer.reference}
								offer={offer}
								onClick={(result: Offer) =>
									onSelectOffer(result)
								}
							/>
						))
					) : (
						<p className="text-info text-md mt-10 tablet:text-lg">
							Il n'y a aucune offre d'aternance actuellement.
						</p>
					)}
					{IMAGES.map(item => (
						<div
							className={`offer-tile ${
								selectedOffer?.id ? "w-full" : ""
							}`}
						>
							<div
								className="offer-tile__image"
								onClick={() => {
									window.open(item.url, "_blank")
								}}
							>
								<img
									alt="Logo"
									src={item.src}
									width="300"
									height="140"
								/>
							</div>
							<span className="offer-tile__postal">
								<b>{item.title.toLocaleUpperCase()}</b>
							</span>
						</div>
					))}
				</div>
				<OfferDetailsView
					key={selectedOffer?.reference}
					selectedOffer={selectedOffer}
					onClose={() => setSelectedOffer(undefined)}
				/>
			</section>
		</section>
	)
}

export default OfferPage
