import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {TravelService} from "../../../core/services/travel.service";
@Component({
  selector: 'app-payment-tab',
  templateUrl: './payment-tab.component.html',
  styleUrls: ['./payment-tab.component.css']
})
export class PaymentTabComponent {
  constructor(private travelService:TravelService,private router: Router ){
  }
  public data:any
  public data1:any
  totalEntries: number=0; // Le nombre total d'entrées
  pageSize: number = 5; // Nombre d'éléments par page
  currentPage: number = 1; // Page actuelle
  pages: number[]=[]; // Tableau de pages

  ngOnInit()  {
      this.getdata();
  }
  getdata(){
    this.travelService.getTravels().subscribe((Response)=>{
      this.data=Response;
      console.log(this.data)
    }
    ,(error)=>{console.log("eroor is ",error)}
    );

    this.totalEntries = this.data.length;

    // Calculez le nombre total de pages
    const totalPages = Math.ceil(this.totalEntries / this.pageSize);

    // Générez le tableau de pages [1, 2, ..., totalPages]
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  setPage(page: number) {
    // Définissez la page actuelle
    this.currentPage = page;

    // Vous pouvez également effectuer des opérations supplémentaires ici, comme obtenir les données pour la nouvelle page
}

  delete(id:any){
      this.data={
        id:id
      }
      this.travelService.DeletTravel(this.data).subscribe((Response)=>{
      },(error)=>{console.log("eroor is ",error)}
      )
      window.location.reload()
  }
}
