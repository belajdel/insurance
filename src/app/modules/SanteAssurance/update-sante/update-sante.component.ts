import { Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-update-sante',
  templateUrl: './update-sante.component.html',
  styleUrls: ['./update-sante.component.css']
})
export class UpdateSanteComponent {

  assurance_type:string=history.state?.assurance?.type
  constructor(public activatedRoute: ActivatedRoute,private router:Router) {

  }
  ngOnInit(): void {
    //this.assurance=
    console.log(history.state)
    //console.log(this.activatedRoute.paramMap)
    //console.log(this.assurance)
    /*this.todayDate = this.getFormattedDate();
    this.age=this.getFormattedDate();
    this.afterDate=this.getFormattedDate1(0,0,1);
    this.getcountry();*/


  }
  /*assurance_type:string='فرد'
  verife:boolean=false
  job:any;
  persone_type:any
  info:string='معلومات عن المؤمن '
  non_info:any='إسم المؤمن '
  tranche:any;
  ValueAssurance:any;


  adresse:any;
  date_creation:any;
  id_user:any;
  zone_couver:any;
  peroide :any='سنة';
  startDate:any;
  endDate:any;
  nom :any;
  nationalite:any;
  m_f :any;
  numero_tele:any;
  numero_passport:any;
  direction:any="selecte a country";
  methode_paiment:any;
  initaile:any;
  taxe1:any;
  taxe2:any;
  taxe3:any;
  taxe4:any;
  total:any;
  ageProprety:any;
  age:any;


  todayDate: string="";
  afterDate:string="";




  // les taxtes


  // date

  changerInfo(){
    if(this.assurance_type=='فرد'){
      this.info='معلومات عن المؤمن '
      this.non_info='إسم المؤمن '
    }
    if(this.assurance_type=='مجموعات'){
      this.info=' معلومات عن الجهة '
      this.non_info=' إسم الجهة '
    }
  }


  CalculTaxe(){

    if(this.assurance_type=='صحي فرد'){
       if(this.persone_type == 'أطباء و مستشارين'){
        this.initaile=190

      }
      if(this.persone_type == 'شبه طبي'){
        this.initaile=130
      }
        this.taxe1=2
        this.taxe3=(this.initaile/100)*1
        this.taxe4=20
        this.taxe2=(this.initaile/100)*0.5
        this.total=Math.round(this.taxe1+this.taxe3+this.taxe4+this.taxe2+this.initaile)
    }

    }
    CalculTaxeSociete(){
      console.log(Number(this.ValueAssurance))
      this.tranche= (this.ValueAssurance/100)*5
      this.initaile=(this.ValueAssurance/100)*3
      this.taxe1= (this.tranche/100)
      this.taxe2= (this.tranche/100)*0.5
      this.taxe4=20
      this.total=this.initaile+this.taxe1+this.taxe2+this.taxe4

    }


  changeroption1(){

    if(this.peroide=="Five Days"){
      this.afterDate=this.getFormattedDate1(5,0,0);

    }
    if(this.peroide=="One Week"){
      this.afterDate=this.getFormattedDate1(7,0,0);
    }
    if(this.peroide=="Ten Days"){
      this.afterDate=this.getFormattedDate1(7,0,0);
    }

    if(this.peroide=="Two Weeks"){
    this.afterDate=this.getFormattedDate1(14,0,0);
  }
  if(this.peroide=="Three Weeks"){
    this.afterDate=this.getFormattedDate1(21,0,0);
  }
  if(this.peroide=="One Months"){
    this.afterDate=this.getFormattedDate1(0,1,0);
  }
  if(this.peroide=="Two Months"){
    this.afterDate=this.getFormattedDate1(0,2,0);
  }
  if(this.peroide=="Three Months"){
    this.afterDate=this.getFormattedDate1(0,3,0);
  }
  if(this.peroide=="Six Months"){
    this.afterDate=this.getFormattedDate1(0,6,0);
  }
  if(this.peroide=="One Year"){
    this.afterDate=this.getFormattedDate1(0,0,1);
  }

  if(this.peroide=="Two Year"){
    this.afterDate=this.getFormattedDate1(0,0,2);

  }

  this.CalculTaxe()
  }






  pays:any;
      getcountry(){
        this.http.get('https://restcountries.com/v3.1/all?lang=ar')
    .subscribe(
      (data: any) => {
        console.log(data); // Log the received data to the console to see its structure
        this.pays = data;

      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    }
    data1:any;
    /!*getcountry() {
      const apiUrl = 'https://restcountries.com/v3.1/all?lang=ar'; // Add "?lang=ar" to specify Arabic language
      this.data1 = ''; // Initialize data1 to an empty string

      this.http.get(apiUrl)
        .subscribe(
          (data: any) => {
            for (let index = 0; index < data.length; index++) {
              this.data1.push (data[index].translations.ara.official);
            this.pays = this.data1; // Assign the concatenated data to your 'pays' property
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
    }}*!/





  getFormattedDate1(i:number,i1:number,i3:number) {
    const today = new Date(this.todayDate);
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

  getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /!**for year list  *!/
  selectedYear: string = '';

  years: string[] = [];
  constructor(private travelService:TravelService,private router: Router,private http: HttpClient ) {
    const currentYear = new Date().getFullYear();
    for (let year = 1990; year <= currentYear; year++) {
      this.years.push(year.toString());
    }
  }


calculeAge(){
    // Calcul de l'âge à partir de la date de naissance
    const dateNaissance = new Date(this.ageProprety);
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





  data:any;

  OnRecuper(){

    /!*const currentDate = new Date();
    this.data ={
      date_creation:currentDate,
      id_user:1,
      zone_couver:this.zone_couver,
      peroide :this.peroide,
      startDate:this.todayDate,
      endDate:this.afterDate,
      nom:this.nom,
      nationalite:this.nationalite,
      m_f :this.m_f,
      numero_tele:this.numero_tele,
      numero_passport:this.numero_passport,
      methode_paiment:this.methode_paiment,
      initaile:this.initaile,
      taxe1:this.taxe1,
      taxe2:this.taxe2,
      taxe3:this.taxe3,
      taxe4:this.taxe4,
      total:this.total,
      direction:this.direction,
      age:this.ageProprety,
      adresse:this.adresse,

    }
    console.log(this.data)
    this.travelService.createTravel(this.data).subscribe((Response)=>{
    },(error)=>{console.log("eroor is ",error)}
    )
    alert('Travel add')
    this.router.navigate(['/dashboard']);*!/
    this.verife=true

  }*/
}
