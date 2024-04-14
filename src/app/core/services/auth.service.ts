import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {Token} from "../../public/models/token.model";
import {LoginUser} from "../../public/models/login-user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private tokenStorageService:TokenStorageService) { }

  prefix = 'auth';
  login(data:LoginUser) : Observable<Token>{
    return this.http.post(`${environment.baseUrl}/${this.prefix}/login`,data, {withCredentials: true}) as Observable<Token>;
  }

  isLoggedIn() :boolean {
    return this.tokenStorageService.getToken().accessToken != null
  }

  refreshToken(){
    return this.http.get(`${environment.baseUrl}/${this.prefix}/refresh`)
  }
  logout() {
    return this.http.get(`${environment.baseUrl}/${this.prefix}/logout`)
  }
}
