import {Component} from '@angular/core';
import {SantePersonne} from "../../../../public/models/sante-personne.model";
import {SanteGroupe} from "../../../../public/models/sante-groupe.model";
import {SanteComponent} from "../sante.component";
import {TokenStorageService} from "../../../../core/services/token-storage.service";
import {SantePersonneService} from "../../../../core/services/sante-personne.service";
import {SanteGroupeService} from "../../../../core/services/sante-groupe.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-add-assurance-sante-personne',
    templateUrl: './add-assurance-sante-personne.component.html',
    styleUrls: ['./add-assurance-sante-personne.component.css']
})
export class AddAssuranceSantePersonneComponent {

    verife: boolean = false
    protected assurancePersonne = new SantePersonne()
    protected periode = 'سنة'
    pays: any;
    age: any;
    protected info: string = 'معلومات عن المؤمن '
    protected non_info: string = 'إسم المؤمن '
    protected ageInput: string = "";
    protected startDate: string = "";
    protected endDate: string = "";


    constructor(protected santeComponent: SanteComponent, private tokenStorageService: TokenStorageService, private assurancePersonneService: SantePersonneService, private router: Router, private http: HttpClient) {
    }

    getFormattedDate1(i: number, i1: number, i3: number) {
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

    getcountry() {
        this.http.get('https://restcountries.com/v3.1/all?lang=ar')
            .subscribe(
                (data: any) => {
                    //console.log(data[1].translations.ara); // Log the received data to the console to see its structure
                    //this.pays = data;
                    this.pays = [];
                    for (let index = 0; index < data.length; index++) {
                        this.pays.push(data[index].translations.ara.common);
                    }
                    //console.log(this.pays[5])

                },
                (error) => {
                    console.error('Error fetching data:', error);
                }
            );
    }

    ngOnInit(): void {
        this.startDate = this.santeComponent.getFormattedDate();
        this.ageInput = this.santeComponent.getFormattedDate();
        this.endDate = this.getFormattedDate1(0, 0, 1);
        this.assurancePersonne.nationalite = "إختر جنسية المؤمن"
        this.assurancePersonne.m_f = "إختر الجنس"
        this.assurancePersonne.job= "إختر المهنة"
        this.getcountry();
    }


    CalculTaxe() {

        if (this.santeComponent.assurance_type == 'صحي فرد') {
            if (this.assurancePersonne.job == 'أطباء و مستشارين') {
                this.assurancePersonne.initial = 190

            }
            if (this.assurancePersonne.job == 'شبه طبي') {
                this.assurancePersonne.initial = 130
            }
            this.assurancePersonne.taxe1 = 2
            this.assurancePersonne.taxe3 = (this.assurancePersonne.initial / 100) * 1
            this.assurancePersonne.taxe4 = 20
            this.assurancePersonne.taxe2 = (this.assurancePersonne.initial / 100) * 0.5
            this.assurancePersonne.total = Math.round(this.assurancePersonne.taxe1 + this.assurancePersonne.taxe3 + this.assurancePersonne.taxe4 + this.assurancePersonne.taxe2 + this.assurancePersonne.initial)
        }

    }

    changeroption1() {

        if (this.periode == "Five Days") {
            this.endDate = this.getFormattedDate1(5, 0, 0);

        }
        if (this.periode == "One Week") {
            this.endDate = this.getFormattedDate1(7, 0, 0);
        }
        if (this.periode == "Ten Days") {
            this.endDate = this.getFormattedDate1(7, 0, 0);
        }

        if (this.periode == "Two Weeks") {
            this.endDate = this.getFormattedDate1(14, 0, 0);
        }
        if (this.periode == "Three Weeks") {
            this.endDate = this.getFormattedDate1(21, 0, 0);
        }
        if (this.periode == "One Months") {
            this.endDate = this.getFormattedDate1(0, 1, 0);
        }
        if (this.periode == "Two Months") {
            this.endDate = this.getFormattedDate1(0, 2, 0);
        }
        if (this.periode == "Three Months") {
            this.endDate = this.getFormattedDate1(0, 3, 0);
        }
        if (this.periode == "Six Months") {
            this.endDate = this.getFormattedDate1(0, 6, 0);
        }
        if (this.periode == "سنة") {
            this.endDate = this.getFormattedDate1(0, 0, 1);
        }

        if (this.periode == "Two Year") {
            this.endDate = this.getFormattedDate1(0, 0, 2);
        }
        this.CalculTaxe()
    }

    calculeAge() {
        // Calcul de l'âge à partir de la date de naissance
        const dateNaissance = new Date(this.ageInput);
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

    OnRecuper() {
        this.verife = true
        this.assurancePersonne.startDate = new Date(this.startDate)
        this.assurancePersonne.endDate = new Date(this.endDate)
        this.assurancePersonne.date_naissance = new Date(this.ageInput)
        this.assurancePersonne.periode_assurance = this.periode
        this.assurancePersonne.userId = this.tokenStorageService.getUser().id
        this.assurancePersonneService.createSantePersonne(this.assurancePersonne).subscribe((Response) => {
            this.router.navigate(['/dashboard']);
        })


    }
}
