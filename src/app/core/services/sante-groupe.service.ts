import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SanteGroupe} from "../../public/models/sante-groupe.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SanteGroupeService {

  constructor(private http :HttpClient) { }
  prefix = 'sante-groupe';

  createSanteGroupe(data: SanteGroupe): Observable<SanteGroupe>{
    return this.http.post(`${environment.baseUrl}/${this.prefix}/add`, data) as Observable<SanteGroupe>;
  }

  getSanteGroupes(): Observable<SanteGroupe[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getall`).pipe() as Observable<SanteGroupe[]>;
  }

  getSanteGroupesByBureau(bureauiId:number):Observable<SanteGroupe[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getallbybureau/${bureauiId}`) as Observable<SanteGroupe[]>;
  }

  getSanteGroupesByUser(useriId:number):Observable<SanteGroupe[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getallbyuser/${useriId}`) as Observable<SanteGroupe[]>;
  }

  getSanteGroupeById(id: number):Observable<SanteGroupe>{
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getone/${id}`) as Observable<SanteGroupe>;
  }

  UpdateSanteGroupe(data: SanteGroupe):Observable<SanteGroupe> {
    return this.http.put(`${environment.baseUrl}/${this.prefix}/update/${data.id}`, data) as Observable<SanteGroupe>;
  }

  DeletSanteGroupe(id: number) {
    return this.http.delete(`${environment.baseUrl}/${this.prefix}/delete/${id}`)
  }

  SearchSantesGroupe(query:any):Observable<SanteGroupe[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/search/${query}`) as Observable<SanteGroupe[]>;
  }

  RapportSanteGroupe(body:any):Observable<SanteGroupe[]> {
    return this.http.post(`${environment.baseUrl}/${this.prefix}/rapport`, body) as Observable<SanteGroupe[]>;
  }

  PDFSanteGroupe(id:number):Observable<Blob> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/pdf/${id}`, { responseType: 'blob' }) as Observable<Blob>;
  }
}
