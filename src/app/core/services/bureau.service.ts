import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Bureau} from "../../public/models/bureau.model";

@Injectable({
  providedIn: 'root'
})
export class BureauService {

  constructor(private http :HttpClient) { }
  prefix = 'bureau';

  createBureau(data: any): Observable<any>{
    return this.http.post(`${environment.baseUrl}/${this.prefix}/add`, data) as Observable<any>;
  }

  getBureaux(): Observable<Bureau[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getall`) as Observable<Bureau[]>;
  }

  getBureauById(id: number):Observable<Bureau>{
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getone/${id}`) as Observable<Bureau>;
  }

  UpdateBureau(data: Bureau):Observable<Bureau> {
    return this.http.put(`${environment.baseUrl}/${this.prefix}/update/${data.id}`, data) as Observable<Bureau>;
  }

  DeletBureau(id: number) {
    return this.http.delete(`${environment.baseUrl}/${this.prefix}/delete/${id}`)
  }

  SearchBureaux(query:any):Observable<Bureau[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/search/${query}`) as Observable<Bureau[]>;
  }
}
