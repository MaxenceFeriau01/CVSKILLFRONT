/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

 import Activity from "../models/activity"
 import GeneralService from "./generalService"
 
 class StatusesService extends GeneralService<Activity> {
     // Variables
 }
 
 const statusesService = new StatusesService("/intern-status")
 
 export default statusesService
 