import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AssuranceObligatoireService} from "../../../core/services/assurance-obligatoire.service";
import {AssuranceObligatoire} from "../../../public/models/Assurance-obligatoire.model";
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {Card} from "../../../public/shared/card";
import {MyForm} from "../../../public/shared/my-form";
import data from '../../../public/data/obligatory-insurances.json';

@Component({
  selector: 'app-oblig',
  templateUrl: './oblig.component.html',
  styleUrls: ['./oblig.component.scss']
})
export class ObligComponent implements OnInit {

  actualUser = this.tokenStorageService.getUser()
  isLoading = false;
  cards: Card[] = [
    {
      title: "معلومات عن التأمين",
      fields: [
        {
          type: "text",
          label: "إسم المأمن",
          hidden:false,
          readonly:false,
          formControlName: "name",
        },
        {
          type: "text",
          label: "عنوان المأمن",
          hidden:false,
          readonly:false,
          formControlName: "address",
        },
        {
          type: "tel",
          label: "رقم هاتف المأمن",
          hidden:false,
          readonly:false,
          errorsMessages: {
            minLength: 'يجب أن يتكون رقم هاتف المستخدم من 8 أرقام',
            maxLength: 'يجب أن يتكون رقم هاتف المستخدم من 8 أرقام'
          },
          formControlName: "phone",
        },
        {
          type: "select",
          label: "نوع التأمين",
          hidden:false,
          readonly:false,
          formControlName: "insurance_type",
          select: {
            selectOptions: data.insurances,
            isObject: false
          },
        },
        {
          type: "select",
          label: "نوع الترخيص",
          hidden:false,
          readonly:false,
          formControlName: "permission_type",
          select: {
            selectOptions: data.permissions,
            isObject: false
          },
        },
        {
          type: "select",
          label: "مواصفاته",
          hidden:false,
          readonly:false,
          formControlName: "description",
          select: {
            selectOptions: data.descriptions,
            isObject: false
          },
        }
      ]
    },
    {
      title: "معلومات عن السيارة",
      fields: [
        {
          type: "select",
          label: "نوع السيارة",
          hidden:false,
          readonly:false,
          formControlName: "car_type",
          select: {
            selectOptions: data.carModels,
            isObject: false
          },
        },
      ]
    }
  ]

  myForm: MyForm = {
    formGroup: new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      insurance_type: new FormControl('', Validators.required),
      permission_type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    }),
    cards: this.cards
  }
  verife: boolean = false
  startDate = ""
  endDate = ""
  assuranceObligatoire = new AssuranceObligatoire()
  anneefabrication = ""


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
    this.startDate = this.getFormattedDate();
    this.endDate = this.getFormattedDate1(1);
    this.assuranceObligatoire.insurance_type = 'إجباري لمدة سنة';
    this.assuranceObligatoire.license_type = 'خاصة';
    this.assuranceObligatoire.assurance_specifications = 'اختر مواصفاته';
    this.assuranceObligatoire.type_car = 'اختر ماركة السيارة';
    this.assuranceObligatoire.couleur = 'اختر لون السيارة';
    this.anneefabrication = 'اختر سنة الصنع'
    this.assuranceObligatoire.Pays_de_fabrication = 'اختر بلد الصنع';
    this.assuranceObligatoire.Orga_de_delivr = 'اختر ولاية ليبيا';
    this.assuranceObligatoire.initial = 0;
    this.assuranceObligatoire.taxe1 = 0.5;
    this.assuranceObligatoire.taxe2 = 0.5;
    this.assuranceObligatoire.taxe3 = 0.35;
    this.assuranceObligatoire.taxe4 = 2;
    this.assuranceObligatoire.total = 0;
    //this.taxecalcule();

  }

  getFormattedDate1(i: number) {
    const today = new Date();
    const year = today.getFullYear() + i;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
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

  constructor(private assuranceObligatoireService: AssuranceObligatoireService, private tokenStorageService: TokenStorageService, private router: Router) {
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

  OnRecuper() {
    this.verife = true
    this.assuranceObligatoire.startDate = new Date(this.startDate)
    this.assuranceObligatoire.endDate = new Date(this.endDate)
    this.assuranceObligatoire.annee_de_fabrication = parseInt(this.anneefabrication)
    this.assuranceObligatoire.userId = this.tokenStorageService.getUser().id
    this.assuranceObligatoireService.createOblig(this.assuranceObligatoire).subscribe((Response) => {
        //alert('product add')
        this.router.navigate(['/dashboard']);
      }, (error) => {
        console.log("eroor is ", error)
      }
    )

  }


}
