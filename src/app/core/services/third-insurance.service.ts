import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ThirdInsurance} from "../../public/models/third-insurance.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ThirdInsuranceService {

  constructor(private http :HttpClient) { }
  prefix = 'third-insurance';

  createThirdInsurance(data: ThirdInsurance): Observable<ThirdInsurance>{
    return this.http.post(`${environment.baseUrl}/${this.prefix}/add`, data) as Observable<ThirdInsurance>;
  }

  getThirdInsurances(): Observable<ThirdInsurance[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getall`).pipe() as Observable<ThirdInsurance[]>;
  }

  getThirdInsurancesByBureau(bureauiId:number):Observable<ThirdInsurance[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getallbybureau/${bureauiId}`) as Observable<ThirdInsurance[]>;
  }

  getThirdInsurancesByUser(useriId:number):Observable<ThirdInsurance[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getallbyuser/${useriId}`) as Observable<ThirdInsurance[]>;
  }

  getThirdInsuranceById(id: number):Observable<ThirdInsurance>{
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getone/${id}`) as Observable<ThirdInsurance>;
  }

  UpdateThirdInsurance(data: ThirdInsurance):Observable<ThirdInsurance> {
    return this.http.put(`${environment.baseUrl}/${this.prefix}/update/${data.id}`, data) as Observable<ThirdInsurance>;
  }

  DeletThirdInsurance(id: number) {
    return this.http.delete(`${environment.baseUrl}/${this.prefix}/delete/${id}`)
  }

  SearchThirdInsurances(query:any):Observable<ThirdInsurance[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/search/${query}`) as Observable<ThirdInsurance[]>;
  }

  RapportThirdInsurance(body:any):Observable<ThirdInsurance[]> {
    return this.http.post(`${environment.baseUrl}/${this.prefix}/rapport`, body) as Observable<ThirdInsurance[]>;
  }

  PDFThirdInsurance(id:number):Observable<Blob> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/pdf/${id}`, { responseType: 'blob' }) as Observable<Blob>;
  }
}
