import {Component} from '@angular/core';
import * as Papa from 'papaparse';
import {Role} from 'src/app/public/enum/Role';
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {DataService} from "../../../core/services/data.service";
import {TravelService} from "../../../core/services/travel.service";
import {HttpClient} from "@angular/common/http";
import {Travel} from "../../../public/models/travel.model";

@Component({
  selector: 'app-rapport-travel',
  templateUrl: './rapport-travel.component.html',
  styleUrls: ['./rapport-travel.component.css']
})
export class RapportTravelComponent {

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


  bureauId = -1;
  userId = -1
  numero_passport = ""
  startDate = ""
  endDate = ""
  direction = ""
  //numero_card = ""
  total = 0
  show: boolean = false
  protected readonly Role = Role;
  actualUser = this.tokenStorageService.getUser()
  travels: Travel[] = []
  //user:any="مالي"
  //user:any="مدير مكتب"
  constructor(private tokenStorageService: TokenStorageService, protected data: DataService,private travelService:TravelService,private http:HttpClient) {
  }

  ngOnInit() {
    this.getcountry()
    if (this.actualUser.role == Role.Director) {
      this.data.fetchUsersByBureau()
    }
    if (this.actualUser.role == Role.Admin || this.actualUser.role == Role.Finance) {
      this.data.fetchBureaux()
    }
  }

  pays:any;
  getcountry(){
    this.http.get('https://restcountries.com/v3.1/all?lang=ar')
      .subscribe(
        (data: any) => {
          this.pays = [];
          for (let index = 0; index < data.length; index++) {
            this.pays.push( data[index].translations.ara.common);
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  search() {
    let request = {
      bureauId: this.actualUser.role===Role.Director && this.bureauId === -1 ? this.actualUser.bureauId : this.bureauId === -1 ? null : this.bureauId,
      userId: this.actualUser.role === Role.User && this.userId === -1 ? this.actualUser.id : this.userId === -1 ? null : this.userId,
      numero_passport: this.numero_passport === "" ? null : this.numero_passport,
      direction: this.direction === "إختر الوجهة" || this.direction === "" ? null : this.direction,
      startDate: this.startDate === "" ? null : this.startDate,
      endDate: this.endDate === "" ? null : this.endDate
    }
    this.travelService.RapportTravel(request).subscribe((Response) => {
      this.travels = Response
      this.total = this.travels.reduce((a, b) => a + b.total, 0)
      this.show = true
    })
  }
}
