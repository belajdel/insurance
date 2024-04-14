import { Injectable } from '@angular/core';
import {AssuranceSante} from "../../public/models/assurance-sante.model";
import {Assurance} from "../../public/models/assurance.model";

@Injectable({
  providedIn: 'root'
})
export class AssuranceService {

  constructor() { }

  sortTable(table:Assurance[]){
    table.sort((a,b)=> {
      if(a.createdAt > b.createdAt)
        return -1
      else if (a.createdAt < b.createdAt)
        return 1
      else
        return 0
    });
  }
}
