import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AssuranceObligatoire} from "../../public/models/Assurance-obligatoire.model";


@Injectable({
  providedIn: 'root'
})
export class AssuranceObligatoireService {

  constructor(private http: HttpClient) {
  }

  prefix = 'assurance-obligatoire';

  createOblig(data: AssuranceObligatoire): Observable<AssuranceObligatoire> {
    return this.http.post(`${environment.baseUrl}/${this.prefix}/add`, data) as Observable<AssuranceObligatoire>;
  }

  getObligs():Observable<AssuranceObligatoire[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getall`) as Observable<AssuranceObligatoire[]>;
  }

  getObligsByBureau(bureauiId:number):Observable<AssuranceObligatoire[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getallbybureau/${bureauiId}`) as Observable<AssuranceObligatoire[]>;
  }

  getObligsByUser(useriId:number):Observable<AssuranceObligatoire[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getallbyuser/${useriId}`) as Observable<AssuranceObligatoire[]>;
  }

  getObligById(id: number): Observable<AssuranceObligatoire> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getone/${id}`) as Observable<AssuranceObligatoire>;
  }

  UpdateOblig(data: AssuranceObligatoire):Observable<AssuranceObligatoire> {
    return this.http.put(`${environment.baseUrl}/${this.prefix}/update/${data.id}`, data) as Observable<AssuranceObligatoire>;
  }

  DeletOblig(id: number) {
    return this.http.delete(`${environment.baseUrl}/${this.prefix}/delete/${id}`)
  }

  SearchOblig(query:any):Observable<AssuranceObligatoire[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/search/${query}`) as Observable<AssuranceObligatoire[]>;
  }

  RapportOblig(body:any):Observable<AssuranceObligatoire[]> {
    return this.http.post(`${environment.baseUrl}/${this.prefix}/rapport`, body) as Observable<AssuranceObligatoire[]>;
  }
}
