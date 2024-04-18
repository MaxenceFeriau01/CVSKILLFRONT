import Offer from "../models/offer"
import GeneralService from "./generalService"

class OfferService extends GeneralService<Offer> {}

const offerService = new OfferService("offers")

export default offerService
