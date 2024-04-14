import { Component } from '@angular/core';
import * as Papa from 'papaparse';
import { Role } from 'src/app/public/enum/Role';
import {AssuranceObligatoire} from "../../../public/models/Assurance-obligatoire.model";
import {AssuranceSante} from "../../../public/models/assurance-sante.model";
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {DataService} from "../../../core/services/data.service";
import {SanteGroupeService} from "../../../core/services/sante-groupe.service";
import {SantePersonneService} from "../../../core/services/sante-personne.service";
import {AssuranceService} from "../../../core/services/assurance.service";
@Component({
  selector: 'app-rapport-sante',
  templateUrl: './rapport-sante.component.html',
  styleUrls: ['./rapport-sante.component.css']
})
export class RapportSanteComponent {

  csvData: any[] = [
    ['Name', 'Age', 'Email'],
    ['John Doe', 30, 'john@example.com'],
    ['Jane Smith', 25, 'jane@example.com']
    // Add more data as needed
  ];

  downloadCSV() {
    const csv = Papa.unparse(this.csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }}



  bureauId = -1;
  userId = -1
  type = ""
  startDate = ""
  endDate = ""
  numero_passport = ""
  nom = ""
  total = 0
  show: boolean = false
  actualUser = this.tokenStorageService.getUser()
  assurances: AssuranceSante[] = []


  protected readonly Role = Role;
  //user:any="مالي"
  //user:any="مدير مكتب"
  constructor (private assuranceService:AssuranceService,private tokenStorageService:TokenStorageService,protected data:DataService,private assuranceSanteGroupe:SanteGroupeService,private assuranceSantePersonne:SantePersonneService) {}

  ngOnInit() {
    if (this.actualUser.role == Role.Director) {
      this.data.fetchUsersByBureau()
    }
    if (this.actualUser.role == Role.Admin || this.actualUser.role == Role.Finance) {
      this.data.fetchBureaux()
    }
  }
  search(){
    let request = {
      bureauId: this.actualUser.role===Role.Director && this.bureauId === -1 ? this.actualUser.bureauId : this.bureauId === -1 ? null : this.bureauId,
      userId: this.actualUser.role === Role.User && this.userId === -1 ? this.actualUser.id : this.userId === -1 ? null : this.userId,
      type: this.type === "" ? null : this.type,
      numero_passport: this.numero_passport === "" ? null : this.numero_passport,
      nom:this.nom==="" ? null : this.nom,
      startDate: this.startDate === "" ? null : this.startDate,
      endDate: this.endDate === "" ? null : this.endDate
    }
    this.assurances=[]
    if(this.type!=""){
      if(this.type==="صحي مجموعات"){
        this.assuranceSanteGroupe.RapportSanteGroupe(request).subscribe((Response) => {
          this.assurances = Response
          this.total = this.assurances.reduce((a, b) => a + b.total, 0)
          this.show = true
        })
      }
      else{
        this.assuranceSantePersonne.RapportSantePersonne(request).subscribe((Response) => {
          this.assurances = Response
          this.total = this.assurances.reduce((a, b) => a + b.total, 0)
          this.show = true
        })
      }
    }
    else{
      this.assuranceSanteGroupe.RapportSanteGroupe(request).subscribe((Response1) => {
        this.assuranceSantePersonne.RapportSantePersonne(request).subscribe((Response2) => {
          this.assurances.push(...Response1,...Response2)
          this.assuranceService.sortTable(this.assurances)
          this.total = this.assurances.reduce((a, b) => a + b.total, 0)
          this.show = true
        })
      })
    }
    this.show=true
  }
}
