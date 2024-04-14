import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
   return (inject(AuthService).isLoggedIn()) ? true : inject(Router).navigate(['/login'])
};

export const loginGuard:CanActivateFn = (route,state) => {
  return (!inject(AuthService).isLoggedIn()) ? true : inject(Router).navigate(['/dashboard/home'])
}
