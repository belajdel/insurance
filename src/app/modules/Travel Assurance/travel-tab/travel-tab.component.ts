import {Component} from '@angular/core';

import {RouterLink} from '@angular/router';
import {Router} from '@angular/router';
import {TravelService} from "../../../core/services/travel.service";
import {Travel} from "../../../public/models/travel.model";
import {Role} from "../../../public/enum/Role";
import {TokenStorageService} from "../../../core/services/token-storage.service";

@Component({
  selector: 'app-travel-tab',
  templateUrl: './travel-tab.component.html',
  styleUrls: ['./travel-tab.component.css']
})
export class TravelTabComponent {
  constructor(private travelService: TravelService, private router: Router,private tokenStorageService:TokenStorageService) {
  }

  protected data: Travel[] = []
  protected actualUser=this.tokenStorageService.getUser()
  protected readonly Role = Role
  totalEntries: number = 0; // Le nombre total d'entrées
  pageSize: number = 5; // Nombre d'éléments par page
  currentPage: number = 1; // Page actuelle
  pages: number[] = []; // Tableau de pages

  fetchTravels() {
    if(this.actualUser.role==Role.User){
      this.travelService.getTravelsByUser(this.actualUser.id).subscribe((Response) => {
          this.data = Response;
        }, (error) => {
          console.log("error is ", error)
        }
      );
    }
    else if(this.actualUser.role==Role.Director){
      this.travelService.getTravelsByBureau(this.actualUser.bureauId).subscribe((Response) => {
          this.data = Response;
        }, (error) => {
          console.log("error is ", error)
        }
      );
    }
    else{
      this.travelService.getTravels().subscribe((Response) => {
          this.data = Response;
        }, (error) => {
          console.log("error is ", error)
        }
      );
    }
    this.totalEntries = this.data.length;

    // Calculez le nombre total de pages
    const totalPages = Math.ceil(this.totalEntries / this.pageSize);

    // Générez le tableau de pages [1, 2, ..., totalPages]
    this.pages = Array.from({length: totalPages}, (_, i) => i + 1);
  }

  setPage(page: number) {
    // Définissez la page actuelle
    this.currentPage = page;

    // Vous pouvez également effectuer des opérations supplémentaires ici, comme obtenir les données pour la nouvelle page
  }

  query:string="";

  search() {
    if(this.query!=""){
      this.travelService.SearchTravels(this.query).subscribe((Response) => {
          this.data = Response;
        }
        , (error) => {
          console.log("error is ", error)
        }
      );
    }
    else{
      this.fetchTravels()
    }
  }

  ngOnInit() {
    this.fetchTravels()

  }

  delete(id: any) {
    this.travelService.DeletTravel(id).subscribe((Response) => {
        this.fetchTravels()
      }, (error) => {
        console.log("eroor is ", error)
      }
    )
  }

  generatePDF(id:number){
      this.travelService.PDFTravel(id).subscribe((Response)=>{
          const blob = new Blob([Response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        },(error)=>{console.log("eroor is ",error)}
      )
  }
}
