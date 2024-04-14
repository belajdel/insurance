import { Component } from '@angular/core';
import {SanteGroupe} from "../../../../public/models/sante-groupe.model";
import {TokenStorageService} from "../../../../core/services/token-storage.service";
import {SantePersonneService} from "../../../../core/services/sante-personne.service";
import {SanteGroupeService} from "../../../../core/services/sante-groupe.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SanteComponent} from "../sante.component";

@Component({
  selector: 'app-add-assurance-sante-groupe',
  templateUrl: './add-assurance-sante-groupe.component.html',
  styleUrls: ['./add-assurance-sante-groupe.component.css']
})
export class AddAssuranceSanteGroupeComponent {
  verife:boolean=false
  protected assuranceGroupe=new SanteGroupe()
  protected periode='سنة'
  protected info:string='معلومات عن الجهة'
  protected non_info:string='إسم الجهة'
  pays:any;
  protected startDate:string="";
  protected endDate:string="";

  constructor(protected santeComponent:SanteComponent,private tokenStorageService:TokenStorageService,private assuranceGroupeService:SanteGroupeService,private router: Router,private http: HttpClient ) {
  }

  getFormattedDate1(i:number,i1:number,i3:number) {
    const today = new Date(this.startDate);
    const newDate = new Date(
      today.getFullYear() + i3,
      today.getMonth() + i1,
      today.getDate() + i
    );

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.startDate = this.santeComponent.getFormattedDate();
    this.endDate=this.getFormattedDate1(0,0,1);
  }
  CalculTaxeSociete(){
    //console.log(Number(this.ValueAssurance))
    this.assuranceGroupe.tranche= (this.assuranceGroupe.capital_societe/100)*5
    this.assuranceGroupe.initial=(this.assuranceGroupe.capital_societe/100)*3
    this.assuranceGroupe.taxe1= (this.assuranceGroupe.tranche/100)
    this.assuranceGroupe.taxe2= (this.assuranceGroupe.tranche/100)*0.5
    this.assuranceGroupe.taxe4=20
    this.assuranceGroupe.total=this.assuranceGroupe.initial+this.assuranceGroupe.taxe1+this.assuranceGroupe.taxe2+this.assuranceGroupe.taxe4
  }


  changeroption1(){

    if(this.periode=="Five Days"){
      this.endDate=this.getFormattedDate1(5,0,0);

    }
    if(this.periode=="One Week"){
      this.endDate=this.getFormattedDate1(7,0,0);
    }
    if(this.periode=="Ten Days"){
      this.endDate=this.getFormattedDate1(7,0,0);
    }

    if(this.periode=="Two Weeks"){
      this.endDate=this.getFormattedDate1(14,0,0);
    }
    if(this.periode=="Three Weeks"){
      this.endDate=this.getFormattedDate1(21,0,0);
    }
    if(this.periode=="One Months"){
      this.endDate=this.getFormattedDate1(0,1,0);
    }
    if(this.periode=="Two Months"){
      this.endDate=this.getFormattedDate1(0,2,0);
    }
    if(this.periode=="Three Months"){
      this.endDate=this.getFormattedDate1(0,3,0);
    }
    if(this.periode=="Six Months"){
      this.endDate=this.getFormattedDate1(0,6,0);
    }
    if(this.periode=="سنة"){
      this.endDate=this.getFormattedDate1(0,0,1);
    }

    if(this.periode=="Two Year"){
      this.endDate=this.getFormattedDate1(0,0,2);
    }
  }


  OnRecuper(){
    this.verife=true


      this.assuranceGroupe.startDate=new Date(this.startDate)
      this.assuranceGroupe.endDate=new Date(this.endDate)
      this.assuranceGroupe.periode_assurance=this.periode
      this.assuranceGroupe.userId=this.tokenStorageService.getUser().id
      this.assuranceGroupeService.createSanteGroupe(this.assuranceGroupe).subscribe((Response)=>{
        this.router.navigate(['/dashboard']);
      })
    }

}
