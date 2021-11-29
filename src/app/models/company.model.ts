import { Activity } from "./activity.model";

export class Company {

    id	: number ;
    name: string;
    contact: string;
    siret: string;
    description: string;
    activities: Activity[];
    logo: string;

    constructor(id:number, name:string, contact: string, siret:string, description:string, activities:Activity[], logo:string){
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.siret = siret;
        this.description = description;
        this.activities = activities;
        this.logo = logo;
    }
}