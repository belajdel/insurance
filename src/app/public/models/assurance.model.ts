import {User} from "./user.model";

export class Assurance {
  id!:number
  type!:string
  name!:string
  address!:string
  phone_number!:number
  numero_tele!:number
  startDate!:Date
  endDate!:Date
  initial!:number
  taxe1!:number
  taxe2!:number
  taxe4!:number
  total!:number
  userId!:number
  createdAt!:Date
  updatedAt!:Date
  user!:User
}
