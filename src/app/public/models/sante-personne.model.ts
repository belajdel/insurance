import {AssuranceSante} from "./assurance-sante.model";

export class SantePersonne extends AssuranceSante{


  numero_passport!:string
  date_naissance!:Date
  job!:string
  m_f!:string
  nationalite!:string
  taxe3!:number

}
