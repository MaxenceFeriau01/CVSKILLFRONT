import GeneralStatistics from "../../containers/statistics/statisticsGeneralPage/statisticsGeneral.type"
import GeneralService from "./generalService"

class StatisticService extends GeneralService<GeneralStatistics | any> {
	getStatistics(filters?: Object): Promise<any> {
		return this.getAllWithFilters(filters)
	}
}

const statisticService = new StatisticService("statistics")

export default statisticService
