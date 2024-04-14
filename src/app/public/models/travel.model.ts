import {User} from "./user.model";
import {Assurance} from "./assurance.model";

export class Travel extends Assurance{
  zone_couver!:string
  periode!:string
  nationalite!:string
  m_f!:string
  numero_passport!:string
  methode_paiement!:string
  taxe3!:number
  direction!:string
  birthDate!:Date
}
