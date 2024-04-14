import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../services/token-storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService:TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=this.tokenStorageService.getToken().accessToken;
    const req=request.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      },withCredentials:true
    })
    return next.handle(req);
  }
}
