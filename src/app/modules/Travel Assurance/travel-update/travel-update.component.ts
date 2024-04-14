import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {TravelService} from "../../../core/services/travel.service";
import {Travel} from "../../../public/models/travel.model";
import {TokenStorageService} from "../../../core/services/token-storage.service";

@Component({
  selector: 'app-travel-update',
  templateUrl: './travel-update.component.html',
  styleUrls: ['./travel-update.component.css']
})
export class TravelUpdateComponent {
  verife:boolean=false
  travel=new Travel()
  protected endDate:string="";
  protected startDate:string="";
  protected birthDate:string="";
  age:number=0;

  fillData(){
    this.travelService.getTravelById(this.activatedRoute.snapshot.params['id']).subscribe((Response)=>{
      this.travel=Response;
      this.startDate=String(this.travel.startDate)
      this.endDate=String(this.travel.endDate)
      this.birthDate=String(this.travel.birthDate)
    })
  }



  // les taxtes
  initalValue1:number=0;

  // date


  changeroption1(){

    if(this.travel.periode=="Five Days"){
      this.endDate=this.getFormattedDate1(5,0,0);
    }
    if(this.travel.periode=="One Week"){
      this.endDate=this.getFormattedDate1(7,0,0);
    }
    if(this.travel.periode=="Ten Days"){
      this.endDate=this.getFormattedDate1(10,0,0);
    }

    if(this.travel.periode=="Two Weeks"){
      this.endDate=this.getFormattedDate1(14,0,0);
    }
    if(this.travel.periode=="Three Weeks"){
      this.endDate=this.getFormattedDate1(21,0,0);
    }
    if(this.travel.periode=="One Month"){
      this.endDate=this.getFormattedDate1(0,1,0);
    }
    if(this.travel.periode=="Two Months"){
      this.endDate=this.getFormattedDate1(0,2,0);
    }
    if(this.travel.periode=="Three Months"){
      this.endDate=this.getFormattedDate1(0,3,0);
    }
    if(this.travel.periode=="Six Months"){
      this.endDate=this.getFormattedDate1(0,6,0);
    }
    if(this.travel.periode=="One Year"){
      this.endDate=this.getFormattedDate1(0,0,1);
    }

    if(this.travel.periode=="Two Years"){
      this.endDate=this.getFormattedDate1(0,0,2);

    }

  this.CalculTaxe()
  }



 id:any;
  ngOnInit(): void {
    this.fillData()
    this.getcountry();
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


  getFormattedDate1(i:number,i1:number,i3:number) {
    const today = new Date(this.startDate);
    const newDate = new Date(
      today.getFullYear() + i3,
      today.getMonth() + i1,
      today.getDate() + i);

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
  }


  /**for year list  */

  years: string[] = [];
  constructor(private travelService:TravelService,private router: Router,private tokenStorageService:TokenStorageService,private http: HttpClient,private activatedRoute:ActivatedRoute ) {
    const currentYear = new Date().getFullYear();
    for (let year = 1990; year <= currentYear; year++) {
      this.years.push(year.toString());
    }
  }


calculeAge(){
    // Calcul de l'âge à partir de la date de naissance
    const dateNaissance = new Date(this.age);
    const aujourdHui = new Date();
    const diffAnnees = aujourdHui.getFullYear() - dateNaissance.getFullYear();

    // Vérifier si l'anniversaire de l'utilisateur n'a pas encore eu lieu cette année
    if (aujourdHui < new Date(aujourdHui.getFullYear(), dateNaissance.getMonth(), dateNaissance.getDate())) {
      this.age = diffAnnees - 1;
    } else {
      this.age = diffAnnees;
    }
    this.CalculTaxe();
  }


  CalculTaxe(){
    if(this.travel.zone_couver=="European Countries"){
      if(this.age>=0 && this.age<=15){
        if(this.travel.periode=="Five Days"){
          this.travel.initial=7
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="One Week"){
          this.travel.initial=8
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Ten Days"){
          this.travel.initial=12
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Two Weeks"){
          this.travel.initial=14
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Three Weeks"){
          this.travel.initial=19
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }

        if(this.travel.periode=="One Month"){
          this.travel.initial=21
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Two Months"){
          this.travel.initial=24
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Three Months"){
          this.travel.initial=47
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Six Months"){
          this.travel.initial=68
          this.travel.taxe1=1
          this.travel.taxe2=0.5
          this.travel.taxe3=0.5
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="One Year"){
          this.travel.initial=90
          this.travel.taxe1=1
          this.travel.taxe2=0.5
          this.travel.taxe3=0.5
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Two Years"){
          this.travel.initial=180
          this.travel.taxe1=2
          this.travel.taxe2=0.5
          this.travel.taxe3=1
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
      }
      if(this.age>=16){
        if(this.travel.periode=="Five Days"){
          this.travel.initial=11
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4          }
        if(this.travel.periode=="One Week"){
          this.travel.initial=13
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Ten Days"){
          this.travel.initial=18
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Two Weeks"){
          this.travel.initial=24
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Three Weeks"){
          this.travel.initial=25
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }

        if(this.travel.periode=="One Month"){
          this.travel.initial=29
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Two Months"){
          this.travel.initial=51
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Three Months"){
          this.travel.initial=72
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Six Months"){
          this.travel.initial=100
          this.travel.taxe1=1
          this.travel.taxe2=0.5
          this.travel.taxe3=0.5
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="One Year"){
          this.travel.initial=157
          this.travel.taxe1=2
          this.travel.taxe2=0.5
          this.travel.taxe3=1
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Two Years"){
          this.travel.initial=270
          this.travel.taxe1=3
          this.travel.taxe2=0.5
          this.travel.taxe3=1.5
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
      }
    }
    // word wide
    if(this.travel.zone_couver=="Word Wide Except USA & Canada"){
      if(this.age>=0 && this.age<=15){
        if(this.travel.periode=="Five Days"){
          this.travel.initial=-0.75
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="One Week"){
          this.travel.initial=8
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Ten Days"){
          this.travel.initial=12
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Two Weeks"){
          this.travel.initial=18
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Three Weeks"){
          this.travel.initial=25
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }

        if(this.travel.periode=="One Month"){
          this.travel.initial=30
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Two Months"){
          this.travel.initial=45
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Three Months"){
          this.travel.initial=55
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Six Months"){
          this.travel.initial=90
          this.travel.taxe1=1
          this.travel.taxe2=0.5
          this.travel.taxe3=0.5
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="One Year"){
          this.travel.initial=140
          this.travel.taxe1=1.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.750
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Two Years"){
          this.travel.initial=200
          this.travel.taxe1=2
          this.travel.taxe2=0.5
          this.travel.taxe3=1
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
      }
      if(this.age>=16){
        if(this.travel.periode=="Five Days"){
          this.travel.initial=-0.75
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4          }
        if(this.travel.periode=="One Week"){
          this.travel.initial=11
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Ten Days"){
          this.travel.initial=17
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Two Weeks"){
          this.travel.initial=24
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Three Weeks"){
          this.travel.initial=34
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }

        if(this.travel.periode=="One Month"){
          this.travel.initial=39
          this.travel.taxe1=0.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.250
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Two Months"){
          this.travel.initial=59
          this.travel.taxe1=1
          this.travel.taxe2=0.5
          this.travel.taxe3=0.5
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Three Months"){
          this.travel.initial=63
          this.travel.taxe1=1
          this.travel.taxe2=0.5
          this.travel.taxe3=0.5
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Six Months"){
          this.travel.initial=115
          this.travel.taxe1=1.5
          this.travel.taxe2=0.5
          this.travel.taxe3=0.750
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="One Year"){
          this.travel.initial=174
          this.travel.taxe1=2
          this.travel.taxe2=0.5
          this.travel.taxe3=1
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
        if(this.travel.periode=="Two Years"){
          this.travel.initial=295
          this.travel.taxe1=3
          this.travel.taxe2=0.5
          this.travel.taxe3=1.5
          this.travel.taxe4=5
          this.travel.total=this.travel.initial+this.travel.taxe1+this.travel.taxe2+this.travel.taxe3+this.travel.taxe4
        }
      }
    }
  }



  data:any;

  OnRecuper(){
    this.verife=true
    this.travel.endDate=new Date(this.endDate)
    this.travel.startDate=new Date(this.startDate)
    this.travel.birthDate=new Date(this.birthDate)
    //this.travel.userId=this.tokenStorageService.getUser().id
    this.travelService.UpdateTravel(this.travel).subscribe((Response)=>{
        this.router.navigate(['/dashboard']);
      },(error)=>{console.log("eroor is ",error)}
    )
  }
}
