import GeneralService from "./generalService"
import CvSkillDto from "../models/cvskill"

class CvSkillService extends GeneralService<CvSkillDto> {
	constructor() {
		super("cvskills")
	}

	createCvSkill(cvSkillDto: CvSkillDto, userId: number): Promise<CvSkillDto> {
		return this.post(cvSkillDto, `/user/${userId}`)
	}

	getAllCvSkills(): Promise<CvSkillDto[]> {
		return this.getAllWithFilters()
	}

	getCvSkillById(id: number): Promise<CvSkillDto> {
		return this.getById(id)
	}

	getCvSkillsByUserId(userId: number): Promise<CvSkillDto> {
		return this.get(`/user/${userId}`)
	}

	updateCvSkill(
		id: number,
		cvSkillDto: CvSkillDto,
		userId: number
	): Promise<CvSkillDto> {
		return this.put(cvSkillDto, `${id}?userId=${userId}`)
	}

	deleteCvSkill(id: number): Promise<CvSkillDto> {
		return this.delete(id)
	}

	async getPhoto(cvSkillId: number): Promise<ArrayBuffer | null> {
		try {
			const response = await this.http.get(
				`${this.url}/${cvSkillId}/photo`,
				{
					responseType: "arraybuffer",
					headers: { Accept: "image/jpeg, image/png" },
				}
			)
			return response.data
		} catch (error) {
			// Aucun message d'erreur, retourne simplement null en cas de problème
			return null
		}
	}

	async uploadPhoto(cvSkillId: number, photo: File): Promise<void> {
		try {
			await this.uploadFile(photo, `/${cvSkillId}/photo`, {
				cvSkillId: cvSkillId.toString(),
			})
		} catch (error) {
			console.error("Erreur lors de l'upload de la photo:", error)
			throw error
		}
	}
}

const cvSkillService = new CvSkillService()
export default cvSkillService
