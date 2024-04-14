
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AssuranceObligatoireService} from "../../../core/services/assurance-obligatoire.service";
import {ThirdInsurance} from "../../../public/models/third-insurance.model";
import {ThirdInsuranceService} from "../../../core/services/third-insurance.service";
import {TokenStorageService} from "../../../core/services/token-storage.service";
@Component({
  selector: 'app-troisme',
  templateUrl: './troisme.component.html',
  styleUrls: ['./troisme.component.css']
})
export class TroismeComponent {
  verife:boolean=false
  thirdInsurance=new ThirdInsurance()
  startDate=""
  endDate=""
  annee_de_fabrication=""


  changeroption1(){
    if(this.thirdInsurance.insurance_type=="سنتان"){
      this.endDate=this.getFormattedDate1(0,0,2);
    }
    if(this.thirdInsurance.insurance_type=="إجباري لمدة سنة"){
      this.endDate=this.getFormattedDate1(0,0,1);
    }
    if(this.thirdInsurance.insurance_type=="ثلاثة سنوات"){
    this.endDate=this.getFormattedDate1(0,0,3);
  }
  }


  taxecalcule(){
    if(this.thirdInsurance.insurance_specifications=="من 0 إلى 16 حصان"){
      this.thirdInsurance.initial=69;


    }
    if(this.thirdInsurance.insurance_specifications=="من 17 إلى 30 حصان"){
      this.thirdInsurance.initial=75;

    }
    if(this.thirdInsurance.insurance_specifications=="أكثر من 30 حصان"){
      this.thirdInsurance.initial=95;
  }
  this.thirdInsurance.total=this.thirdInsurance.initial+2

  }

  ngOnInit(): void {
    this.startDate = this.getFormattedDate();
    this.endDate=this.getFormattedDate1(0,0,1);
    this.thirdInsurance.initial=0;
    this.thirdInsurance.taxe1=0.5;
    this.thirdInsurance.taxe2=0.5;
    this.thirdInsurance.taxe3=0.35;
    this.thirdInsurance.taxe4=2;
    this.thirdInsurance.total=0;
    // date
    this.thirdInsurance.insurance_type= 'إجباري لمدة سنة';
    this.thirdInsurance.license_type='خاصة';
    this.thirdInsurance.insurance_specifications='اختر مواصفاته';
    this.thirdInsurance.type_car='اختر ماركة السيارة';
    this.thirdInsurance.couleur='اختر لون السيارة';
    this.thirdInsurance.Pays_de_fabrication='اختر بلد الصنع';

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

  getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**for year list  */
  //selectedYear: string = '';

  years: string[] = [];
  constructor(private thirdInsuranceService:ThirdInsuranceService,private tokenStorageService:TokenStorageService,private router: Router ) {
    const currentYear = new Date().getFullYear();
    for (let year = 1990; year <= currentYear; year++) {
      this.years.push(year.toString());
    }
  }


  selectedState: string = '';
  /* libya sate */
  libyanStates: string[] = [
    'طرابلس',
    'بنغازي',
    'مصراتة',
    'درنة',
    'زوارة',
    'المرج',
    'سبها',
    'سرت',
    'ترهونة',
    'مرزق',
    'غات',
    'البيضاء',
    'زليتن',
    'توبروق',
    'الزاوية',
    'الخمس',
    'الأجدابيا',
    'الخفرة',
    'أوباري',
    'الزنتان',
    'وادي الشاطئ',
    'سوكنة',
    'سوسة',
    'أوجلة',
    'البريقة',
    'بني وليد',
    'تاورغاء',
    'البيضاء',
    'مزدة',
    'زلة',
    'سرمان',
    'الحرشة',
    'البقرات',
    'العبيار',
    'البطنان',
    'المغر',
    'وادي أحدي',
    'الجبل الأخضر',
    'مرج',
    'العيش',
    'تازربو',
    'أوباري',
    'الزنتان',
    'تولمس',
    'الجميل',
    // You can continue adding more Libyan states as needed
  ];
  data:any;

  OnRecuper(){
    this.verife=true
    this.thirdInsurance.startDate=new Date(this.startDate)
    this.thirdInsurance.endDate=new Date(this.endDate)
    this.thirdInsurance.annee_de_fabrication=parseInt(this.annee_de_fabrication)
    this.thirdInsurance.userId=this.tokenStorageService.getUser().id
    this.thirdInsuranceService.createThirdInsurance(this.thirdInsurance).subscribe((Response)=>{
      this.router.navigate(['/dashboard']);
    })
  }

}
