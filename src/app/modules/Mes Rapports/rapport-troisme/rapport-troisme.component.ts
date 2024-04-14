import { Component } from '@angular/core';
import * as Papa from 'papaparse';
import { Role } from 'src/app/public/enum/Role';
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {ThirdInsuranceService} from "../../../core/services/third-insurance.service";
import {DataService} from "../../../core/services/data.service";
import {ThirdInsurance} from "../../../public/models/third-insurance.model";
@Component({
  selector: 'app-rapport-troisme',
  templateUrl: './rapport-troisme.component.html',
  styleUrls: ['./rapport-troisme.component.css']
})
export class RapportTroismeComponent {
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
  numero_strcture = ""
  startDate = ""
  endDate = ""
  numero_serie = ""
  numero_card = ""
  total = 0
  show: boolean = false
  protected readonly Role = Role;
  //user:any="مالي"
  //user:any="مدير مكتب"

  actualUser = this.tokenStorageService.getUser()
  assurances: ThirdInsurance[] = []
  constructor (private tokenStorageService:TokenStorageService,private thirdInsuranceService:ThirdInsuranceService,protected data:DataService) {}

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
      bureauId: this.actualUser.role === Role.Director && this.bureauId === -1 ? this.actualUser.bureauId : this.bureauId === -1 ? null : this.bureauId,
      userId: this.actualUser.role === Role.User && this.userId === -1 ? this.actualUser.id : this.userId === -1 ? null : this.userId,
      numero_structure: this.numero_strcture === "" ? null : this.numero_strcture,
      numero_serie: this.numero_serie === "" ? null : this.numero_serie,
      //numero_card:this.numero_card==="" ? null : this.numero_card,
      startDate: this.startDate === "" ? null : this.startDate,
      endDate: this.endDate === "" ? null : this.endDate
    }
    this.thirdInsuranceService.RapportThirdInsurance(request).subscribe((Response) => {
      this.assurances = Response
      this.total = this.assurances.reduce((a, b) => a + b.total, 0)
      this.show = true
    })
  }
}
