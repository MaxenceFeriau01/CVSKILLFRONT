/* eslint-disable no-shadow */
import UserCvSkillDto from "./usercvskill"
import { PhotoDto } from "./Photo"

interface poleAtout {
	id?: number
	atout: string
}

interface poleInteret {
	id?: number
	interet: string
}

export enum PoleLoisirInteretType {
	SPORT = "SPORT",
	INTERET = "INTERET",
}

interface PoleLoisirInteret {
	id?: number
	name: string // Changé de 'any' à 'string'
	type: PoleLoisirInteretType
	// Supprimé les champs 'sports' et 'interets'
}
interface polePersonnaliteType {
	id?: number
	personnaliteType: string
	associatedTraits: string[]
}

interface polePersonnaliteTrait {
	id?: number
	personnaliteTrait: string
}

export interface LocationState {
	editMode?: boolean
	cvSkillId?: number
	userId?: number
	polePersonnaliteTraits?: string[]
	polePersonnalitesTypes?: polePersonnaliteType[]
	poleAtouts?: poleAtout[]
	poleInterets?: poleInteret[]
	diploma?: string
	// Ajoutez ici d'autres propriétés que vous passez dans le state
}

class CvSkillDto {
	id?: number

	user: UserCvSkillDto | undefined

	poleAtouts: poleAtout[] | undefined

	poleInterets: poleInteret[] | undefined

	diploma: string | undefined

	polePersonnalitesTypes: polePersonnaliteType[] | undefined

	polePersonnaliteTraits: polePersonnaliteTrait[] | undefined

	poleLoisirInterets: PoleLoisirInteret[] | undefined

	photo?: PhotoDto

	photoUrl: string | undefined

	constructor(data?: Partial<CvSkillDto>) {
		Object.assign(this, data)
	}
}

export default CvSkillDto
