import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SantePersonne} from "../../public/models/sante-personne.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SantePersonneService {

  constructor(private http :HttpClient) { }
  prefix = 'sante-personne';

  createSantePersonne(data: SantePersonne): Observable<SantePersonne>{
    return this.http.post(`${environment.baseUrl}/${this.prefix}/add`, data) as Observable<SantePersonne>;
  }

  getSantePersonnes(): Observable<SantePersonne[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getall`).pipe() as Observable<SantePersonne[]>;
  }

  getSantePersonnesByBureau(bureauiId:number):Observable<SantePersonne[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getallbybureau/${bureauiId}`) as Observable<SantePersonne[]>;
  }

  getSantePersonnesByUser(useriId:number):Observable<SantePersonne[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getallbyuser/${useriId}`) as Observable<SantePersonne[]>;
  }

  getSantePersonneById(id: number):Observable<SantePersonne>{
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getone/${id}`) as Observable<SantePersonne>;
  }

  UpdateSantePersonne(data: SantePersonne):Observable<SantePersonne> {
    return this.http.put(`${environment.baseUrl}/${this.prefix}/update/${data.id}`, data) as Observable<SantePersonne>;
  }

  DeletSantePersonne(id: number) {
    return this.http.delete(`${environment.baseUrl}/${this.prefix}/delete/${id}`)
  }

  SearchSantesPersonne(query:any):Observable<SantePersonne[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/search/${query}`) as Observable<SantePersonne[]>;
  }

  RapportSantePersonne(body:any):Observable<SantePersonne[]> {
    return this.http.post(`${environment.baseUrl}/${this.prefix}/rapport`, body) as Observable<SantePersonne[]>;
  }

  PDFSantePersonne(id:number):Observable<Blob> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/pdf/${id}`, { responseType: 'blob' }) as Observable<Blob>;
  }
}
