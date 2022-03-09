/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

 import Activity from "../models/activity"
 import GeneralService from "./generalService"
 
 class InternStatusService extends GeneralService<Activity> {
     // Variables
 }
 
 const internStatusService = new InternStatusService("/intern-status")
 
 export default internStatusService
 