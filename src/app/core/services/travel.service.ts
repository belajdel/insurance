import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {Travel} from "../../public/models/travel.model";
@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(private http :HttpClient) { }
  prefix = 'travel';

  createTravel(data: Travel): Observable<Travel>{
    return this.http.post(`${environment.baseUrl}/${this.prefix}/add`, data) as Observable<Travel>;
  }

  getTravels(): Observable<Travel[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getall`).pipe() as Observable<Travel[]>;
  }

  getTravelsByBureau(bureauiId:number):Observable<Travel[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getallbybureau/${bureauiId}`) as Observable<Travel[]>;
  }

  getTravelsByUser(useriId:number):Observable<Travel[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getallbyuser/${useriId}`) as Observable<Travel[]>;
  }

  getTravelById(id: number):Observable<Travel>{
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getone/${id}`) as Observable<Travel>;
  }

  UpdateTravel(data: Travel):Observable<Travel> {
    return this.http.put(`${environment.baseUrl}/${this.prefix}/update/${data.id}`, data) as Observable<Travel>;
  }

  DeletTravel(id: number) {
    return this.http.delete(`${environment.baseUrl}/${this.prefix}/delete/${id}`)
  }

  SearchTravels(query:any):Observable<Travel[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/search/${query}`) as Observable<Travel[]>;
  }

  RapportTravel(body:any):Observable<Travel[]> {
    return this.http.post(`${environment.baseUrl}/${this.prefix}/rapport`, body) as Observable<Travel[]>;
  }

  PDFTravel(id:number):Observable<Blob> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/pdf/${id}`, { responseType: 'blob' }) as Observable<Blob>;
  }
}
