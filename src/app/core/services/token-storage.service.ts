import { Injectable } from '@angular/core';
import * as jwt from "jwt-decode"
import {User} from "../../public/models/user.model";
import {Token} from "../../public/models/token.model";

const JWT="accessToken"
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public getToken(): Token {
    let token=new Token()
    token.accessToken=sessionStorage.getItem(JWT) as string
    return token;
  }

  public setToken(token: Token): void {
    sessionStorage.setItem(JWT, token.accessToken);
  }

  public deleteToken(): void {
    sessionStorage.removeItem(JWT);
  }

  public getUser():User{
    const decode = jwt.jwtDecode(this.getToken().accessToken as string) as any;
    return decode.UserInfo as User
  }
}
