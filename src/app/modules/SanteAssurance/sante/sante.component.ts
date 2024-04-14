import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {SanteGroupeService} from "../../../core/services/sante-groupe.service";
import {SantePersonneService} from "../../../core/services/sante-personne.service";
import {TokenStorageService} from "../../../core/services/token-storage.service";

@Component({
  selector: 'app-sante',
  templateUrl: './sante.component.html',
  styleUrls: ['./sante.component.css']
})
export class SanteComponent {
  assurance_type:string='صحي فرد'

  ngOnInit(): void {
  }











  getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  constructor(private tokenStorageService:TokenStorageService,private assurancePersonneService:SantePersonneService,private assuranceGroupeService:SanteGroupeService,private router: Router,private http: HttpClient ) {
  }
}
