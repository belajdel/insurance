import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SantePersonneService} from "../../../core/services/sante-personne.service";
import {SanteGroupeService} from "../../../core/services/sante-groupe.service";
import {AssuranceSante} from "../../../public/models/assurance-sante.model";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {AssuranceService} from "../../../core/services/assurance.service";
import {Role} from 'src/app/public/enum/Role';
import {TokenStorageService} from "../../../core/services/token-storage.service";

@Component({
  selector: 'app-sante-tab',
  templateUrl: './sante-tab.component.html',
  styleUrls: ['./sante-tab.component.css']
})
export class SanteTabComponent {
  constructor(private assuranceSantePersonneService: SantePersonneService, private tokenStorageService: TokenStorageService, private assuranceSanteGroupeService: SanteGroupeService, private sanitizer: DomSanitizer, private assuranceService: AssuranceService) {
  }

  protected assurancesSante: AssuranceSante[] = [];
  protected readonly Role = Role
  protected actualUser = this.tokenStorageService.getUser()


  fetchAssurancesSante() {
    if (this.actualUser.role == Role.User) {
      this.assurancesSante = [];
      this.assuranceSantePersonneService.getSantePersonnesByUser(this.actualUser.id).subscribe((Response1) => {
        this.assuranceSanteGroupeService.getSanteGroupesByUser(this.actualUser.id).subscribe((Response2) => {
          this.assurancesSante.push(...Response1, ...Response2);
          this.assuranceService.sortTable(this.assurancesSante)
        })
      })
    }
    else if (this.actualUser.role == Role.Director) {
      this.assurancesSante = [];
      this.assuranceSantePersonneService.getSantePersonnesByBureau(this.actualUser.bureauId).subscribe((Response1) => {
        this.assuranceSanteGroupeService.getSanteGroupesByBureau(this.actualUser.bureauId).subscribe((Response2) => {
          this.assurancesSante.push(...Response1, ...Response2);
          this.assuranceService.sortTable(this.assurancesSante)
        })
      })
    }
    else {
      this.assurancesSante = [];
      this.assuranceSantePersonneService.getSantePersonnes().subscribe((Response1) => {
        this.assuranceSanteGroupeService.getSanteGroupes().subscribe((Response2) => {
          this.assurancesSante.push(...Response1, ...Response2);
          this.assuranceService.sortTable(this.assurancesSante)
        })
      })
    }
  }

  query: string = "";

  search() {
    if (this.query != "") {
      this.assuranceSantePersonneService.SearchSantesPersonne(this.query).subscribe((Response) => {
          this.assuranceSanteGroupeService.SearchSantesGroupe(this.query).subscribe((Response2) => {
            this.assurancesSante = [];
            this.assurancesSante.push(...Response, ...Response2);
            this.assuranceService.sortTable(this.assurancesSante)
          })
        }
        , (error) => {
          console.log("error is ", error)
        }
      );
    } else {
      this.fetchAssurancesSante()
    }
  }

  ngOnInit() {
    this.fetchAssurancesSante();
    console.log("assurances sante", this.assurancesSante)
  }


  delete(assurance: AssuranceSante) {
    if (assurance.type === 'صحي فرد') {
      this.assuranceSantePersonneService.DeletSantePersonne(assurance.id).subscribe((Response) => {
          this.fetchAssurancesSante()
        }, (error) => {
          console.log("eroor is ", error)
        }
      )
    } else {
      this.assuranceSanteGroupeService.DeletSanteGroupe(assurance.id).subscribe((Response) => {
          this.fetchAssurancesSante()
        }, (error) => {
          console.log("eroor is ", error)
        }
      )
    }
  }

  generatePDF(assurance: AssuranceSante) {
    if (assurance.type === 'صحي فرد') {
      this.assuranceSantePersonneService.PDFSantePersonne(assurance.id).subscribe((Response) => {
          const blob = new Blob([Response], {type: 'application/pdf'});
          const fileURL = URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        }, (error) => {
          console.log("eroor is ", error)
        }
      )
    } else {
      this.assuranceSanteGroupeService.PDFSanteGroupe(assurance.id).subscribe((Response) => {
          const blob = new Blob([Response], {type: 'application/pdf'});
          const fileURL = URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        }, (error) => {
          console.log("eroor is ", error)
        }
      )
    }
  }
}
