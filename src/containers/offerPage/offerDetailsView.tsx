import { Cancel } from "@mui/icons-material"
import { Button } from "@mui/material"
import dayjs from "dayjs"
import Offer from "../../api/models/offer"
import HasRight from "../../components/rights/hasRight"
import Role from "../../enums/Role"
import { parseOfferType } from "../../enums/OfferType"

interface OfferDetailsViewProps {
	selectedOffer?: Offer
	onClose: () => void
}

function OfferDetailsView({ selectedOffer, onClose }: OfferDetailsViewProps) {
	return (
		<section
			className={`${
				selectedOffer ? "offer-details-container" : "w-0 invisible"
			}`}
		>
			<div className="offer-details-container-view">
				<header>
					{onClose && (
						<span
							className="offer-details-container--close"
							onClick={onClose}
						>
							<Cancel fontSize="inherit" />
						</span>
					)}
					<span className="text-xl mb-1 text-primary font-bold">
						{selectedOffer?.title}
					</span>
					<span>{selectedOffer?.city.toLocaleUpperCase()}</span>
					<span>
						<b>Référence : </b>
						{selectedOffer?.reference}
					</span>
					<HasRight roles={[Role.USER]}>
						<Button
							className="mt-2 mb-1 w-32"
							href={selectedOffer?.applyUrl || ""}
							target="_blank"
						>
							Postuler
						</Button>
					</HasRight>
					<span className="mt-2">
						<b>Type : </b>
						{parseOfferType(selectedOffer?.type)}
					</span>
					<span>
						<b>Début de contrat : </b>
						{dayjs(selectedOffer?.beginsAt).format(
							"dddd DD MMMM YYYY"
						)}
					</span>
					<span>
						<b>Fin de candidature : </b>
						{dayjs(selectedOffer?.expiresAt).format(
							"dddd DD MMMM YYYY"
						)}
					</span>
				</header>
				<div className="offer-details-container-view-content">
					<p
						className="mb-2"
						dangerouslySetInnerHTML={{
							__html: selectedOffer?.description || "",
						}}
					/>
					{selectedOffer?.longitude && selectedOffer.latitude && (
						<iframe
							src={`https://www.google.com/maps/embed/v1/place?q=${selectedOffer.latitude},${selectedOffer.longitude}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
							frameBorder="0"
							title="Maps with jobs coordinates"
							allowFullScreen
						/>
					)}
				</div>
			</div>
		</section>
	)
}

export default OfferDetailsView
