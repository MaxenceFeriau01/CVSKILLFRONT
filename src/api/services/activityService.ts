/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import Activity from "../models/activity"
import GeneralService from "./generalService"

class ActivityService extends GeneralService<Activity> {
	// Variables
}

const activityService = new ActivityService("activities")

export default activityService
