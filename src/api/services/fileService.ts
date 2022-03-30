/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import FileDb from "../models/fileDb"
import GeneralService from "./generalService"

class FileService extends GeneralService<FileDb> {
	// Variables
}

const fileService = new FileService("files")

export default fileService
