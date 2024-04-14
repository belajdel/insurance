import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Role} from 'src/app/public/enum/Role';
import * as Papa from "papaparse"
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {DataService} from "../../../core/services/data.service";
import {Bureau} from "../../../public/models/bureau.model";
import {User} from "../../../public/models/user.model";
import {AssuranceObligatoireService} from "../../../core/services/assurance-obligatoire.service";
import {AssuranceObligatoire} from "../../../public/models/Assurance-obligatoire.model";


@Component({
  selector: 'app-rapport-oblig',
  templateUrl: './rapport-oblig.component.html',
  styleUrls: ['./rapport-oblig.component.css']
})
export class RapportObligComponent implements OnInit {

  csvData: any[] = [
    ['Name', 'Age', 'Email'],
    ['John Doe', 30, 'john@example.com'],
    ['Jane Smith', 25, 'jane@example.com']
  ]

  // Add more data as needed]


  downloadCSV() {
    const csv = Papa.unparse(this.assurances);
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


  bureauId = -1;
  userId = -1
  numero_strcture = ""
  startDate = ""
  endDate = ""
  numero_serie = ""
  //numero_card = ""
  total = 0
  show: boolean = false
  //user:any="موظف"

  //user:any="مالي"
  actualUser = this.tokenStorageService.getUser()
  assurances: AssuranceObligatoire[] = []
  protected readonly Role = Role;

  constructor(private tokenStorageService: TokenStorageService, protected data: DataService, private assuranceObliatoireService: AssuranceObligatoireService) {
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
      userId: this.actualUser.role === Role.User && this.userId === -1  ? this.actualUser.id : this.userId === -1 ? null : this.userId,
      numero_structure: this.numero_strcture === "" ? null : this.numero_strcture,
      numero_serie: this.numero_serie === "" ? null : this.numero_serie,
      //numero_card:this.numero_card==="" ? null : this.numero_card,
      startDate: this.startDate === "" ? null : this.startDate,
      endDate: this.endDate === "" ? null : this.endDate
    }
    console.log(request)
    this.assuranceObliatoireService.RapportOblig(request).subscribe((Response) => {
      this.assurances = Response
      this.total = this.assurances.reduce((a, b) => a + b.total, 0)
      this.show = true
    })
  }


}
