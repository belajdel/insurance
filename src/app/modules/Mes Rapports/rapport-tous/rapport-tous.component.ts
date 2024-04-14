import {Component} from '@angular/core';
import * as Papa from 'papaparse';
import {Role} from 'src/app/public/enum/Role';
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {DataService} from "../../../core/services/data.service";
import {SantePersonneService} from "../../../core/services/sante-personne.service";
import {SanteGroupeService} from "../../../core/services/sante-groupe.service";
import {AssuranceObligatoireService} from "../../../core/services/assurance-obligatoire.service";
import {TravelService} from "../../../core/services/travel.service";
import {ThirdInsuranceService} from "../../../core/services/third-insurance.service";
import {Assurance} from "../../../public/models/assurance.model";
import {AssuranceService} from "../../../core/services/assurance.service";

@Component({
  selector: 'app-rapport-tous',
  templateUrl: './rapport-tous.component.html',
  styleUrls: ['./rapport-tous.component.css']
})
export class RapportTousComponent {
  csvData: any[] = [
    ['Name', 'Age', 'Email'],
    ['John Doe', 30, 'john@example.com'],
    ['Jane Smith', 25, 'jane@example.com']
    // Add more data as needed
  ];

  downloadCSV() {
    const csv = Papa.unparse(this.csvData);
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }


  bureauId: number = -1
  userId: number = -1
  numero_strcture: any
  startDate: any
  endDate: any
  total = 0
  actualUser = this.tokenStorageService.getUser()
  assurances: Assurance[] = []
  protected readonly Role = Role;
  show: boolean = false

  constructor(private tokenStorageService: TokenStorageService, protected data: DataService,private assuranceObligatoireService: AssuranceObligatoireService,
              private assuranceSantePersonneService: SantePersonneService, private assuranceSanteGroupeService: SanteGroupeService,private assuranceService:AssuranceService,
              private assuranceTravelService:TravelService,private thirdInsuranceService:ThirdInsuranceService
              ) {
  }

  ngOnInit() {
    if (this.actualUser.role == Role.Director) {
      this.data.fetchUsersByBureau()
    }
    if (this.actualUser.role == Role.Admin || this.actualUser.role == Role.Finance) {
      this.data.fetchBureaux()
    }
  }

  search() {
    let request = {
      bureauId: this.actualUser.role===Role.Director && this.bureauId === -1 ? this.actualUser.bureauId : this.bureauId === -1 ? null : this.bureauId,
      userId: this.actualUser.role === Role.User && this.userId === -1 ? this.actualUser.id : this.userId === -1 ? null : this.userId,
      startDate: this.startDate === "" ? null : this.startDate,
      endDate: this.endDate === "" ? null : this.endDate
    }
    this.assurances = []
    this.assuranceObligatoireService.RapportOblig(request).subscribe((Response1) => {
      this.assuranceTravelService.RapportTravel(request).subscribe((Response2) => {
        this.thirdInsuranceService.RapportThirdInsurance(request).subscribe((Response3) => {
          this.assuranceSantePersonneService.RapportSantePersonne(request).subscribe((Response4) => {
            this.assuranceSanteGroupeService.RapportSanteGroupe(request).subscribe((Response5) => {
              this.assurances.push(...Response1, ...Response2, ...Response3, ...Response4, ...Response5)
              this.assuranceService.sortTable(this.assurances)
              this.total = this.assurances.reduce((a, b) => a + b.total, 0)
              this.show = true
            })
          })
        })
      })
    })
  }
}
