import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Debt} from "../../public/models/debt.model";

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  constructor(private http :HttpClient) { }
  prefix = 'debt';

  createDebt(data: Debt): Observable<Debt>{
    return this.http.post(`${environment.baseUrl}/${this.prefix}/add`, data) as Observable<Debt>;
  }

  getDebts(): Observable<Debt[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getall`).pipe() as Observable<Debt[]>;
  }

  getDebtById(id: number):Observable<Debt>{
    return this.http.get(`${environment.baseUrl}/${this.prefix}/getone/${id}`) as Observable<Debt>;
  }

  UpdateDebt(data: Debt):Observable<Debt> {
    return this.http.put(`${environment.baseUrl}/${this.prefix}/update/${data.id}`, data) as Observable<Debt>;
  }

  DeletDebt(id: number) {
    return this.http.delete(`${environment.baseUrl}/${this.prefix}/delete/${id}`)
  }

  SearchDebts(query:any):Observable<Debt[]> {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/search/${query}`) as Observable<Debt[]>;
  }

  SearchPaidDebtsBetween(data:any):Observable<number> {
    return this.http.post(`${environment.baseUrl}/${this.prefix}/searchpaiddebtsbetween`,data) as Observable<number>;
  }
}
