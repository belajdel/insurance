import {User} from "./user.model";
import {Assurance} from "./assurance.model";

export class AssuranceSante extends Assurance{
    periode_assurance!:string
    methode_paiement!:string
}
