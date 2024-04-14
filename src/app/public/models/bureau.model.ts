import {User} from "./user.model";

export class Bureau{
  id!:number
  name!:string
  address!:string
  phone!:number
  gain_precentage_oblig!:number
  gain_precentage_travel!:number
  gain_precentage_third!:number
  gain_precentage_sante!:number
  createdAt!:Date
  updatedAt!:Date
  directorId!:number
  debtId!:number
  director!:User
}
