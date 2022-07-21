import City from "../models/city"
import GeneralService from "./generalService"

class CityService extends GeneralService<City> {}

const internStatusService = new CityService("cities")

export default internStatusService
