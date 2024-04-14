import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {AssuranceObligatoireService} from "../../../core/services/assurance-obligatoire.service";
import {AssuranceObligatoire} from "../../../public/models/Assurance-obligatoire.model";
import {TokenStorageService} from "../../../core/services/token-storage.service";

@Component({
  selector: 'app-oblig-update',
  templateUrl: './oblig-update.component.html',
  styleUrls: ['./oblig-update.component.css']
})
export class ObligUpdateComponent {
  verife: boolean = true
  startDate = ""
  endDate = ""
  assuranceObligatoire = new AssuranceObligatoire()
  anneefabrication=""

  fillData(){
    this.assuranceObligatoireService.getObligById(this.activatedRoute.snapshot.params['id']).subscribe((Response)=>{
      this.assuranceObligatoire=Response;
      this.anneefabrication=String(this.assuranceObligatoire.annee_de_fabrication)
      this.startDate=String(this.assuranceObligatoire.startDate)
      this.endDate=String(this.assuranceObligatoire.endDate)
    })
  }

  changeroption1() {
    if (this.assuranceObligatoire.insurance_type == "سنتان") {
      this.endDate = this.getFormattedDate1(2);
    }
    if (this.assuranceObligatoire.insurance_type == "إجباري لمدة سنة") {
      this.endDate = this.getFormattedDate1(1);
    }
    if (this.assuranceObligatoire.insurance_type == "ثلاثة سنوات") {
      this.endDate = this.getFormattedDate1(3);
    }
  }


  taxecalcule() {
    if (this.assuranceObligatoire.assurance_specifications == "من 0 إلى 16 حصان") {
      this.assuranceObligatoire.initial = 69;
    }
    if (this.assuranceObligatoire.assurance_specifications == "من 17 إلى 30 حصان") {
      this.assuranceObligatoire.initial = 75;

    }
    if (this.assuranceObligatoire.assurance_specifications == "أكثر من 30 حصان") {
      this.assuranceObligatoire.initial = 95;
    }
    this.assuranceObligatoire.total = this.assuranceObligatoire.initial + 2


  }

  ngOnInit(): void {
    this.fillData()
  }

  getFormattedDate1(i: number) {
    const today = new Date();
    const year = today.getFullYear() + i;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getFormattedDate(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**for year list  */
      //selectedYear: string = '';

  years: string[] = [];

  constructor(private assuranceObligatoireService: AssuranceObligatoireService,private tokenStorageService:TokenStorageService,private activatedRoute:ActivatedRoute, private router: Router) {
    const currentYear = new Date().getFullYear();
    for (let year = 1990; year <= currentYear; year++) {
      this.years.push(year.toString());
    }
  }


  //selectedState: string = '';
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

  //data:any;

  OnUpdate() {
    //this.verife = true
    this.assuranceObligatoire.startDate = new Date(this.startDate)
    this.assuranceObligatoire.endDate = new Date(this.endDate)
    this.assuranceObligatoire.annee_de_fabrication= parseInt(this.anneefabrication)
    this.assuranceObligatoire.userId=this.tokenStorageService.getUser().id
    let condition:boolean=true;
    const inputs_selects=document.querySelectorAll('input,select')
    for (let i=0;i<inputs_selects.length;i++) {
      if(inputs_selects[i].classList.contains('error-border')){
        condition=false;
        break;
      }
    }

    if(condition){
      this.assuranceObligatoireService.UpdateOblig(this.assuranceObligatoire).subscribe((Response) => {
            //alert('product add')
            this.router.navigate(['/dashboard']);
          }, (error) => {
            console.log("eroor is ", error)
          }
      )
    }

  }
}
